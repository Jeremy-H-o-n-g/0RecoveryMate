# RecoverMate Performance & Media Budget (S24)

**Status: v1, measured against the real production build (2026-08-17,
Next.js 16.3 / Turbopack, node v24.18.0).** Lighthouse scores are NOT the
primary target (S24 do-not-do) — measured bytes and behaviors are.

## 1. Measured baseline (current build)

All JS: **901.7 KB raw / 259.0 KB gzip** across 12 chunks. CSS: 22.1 KB /
5.1 KB gzip. Largest chunks (gzip):

| chunk (gzip) | contents (identified) |
|---|---|
| 69.9 KB | react-dom (framework) |
| **69.4 KB** | **zod + all content JSON — see exception E1** |
| 42.4 KB | app code (client components) |
| 38.7 KB | app code |
| 8.5 KB / 7.0 KB / 6.2 KB | app code + fonts |
| 4.1 KB | canvas-confetti (async-only; fetched at fire time, never first screen) |

Third-party runtime requests: **zero** (fonts self-hosted via `next/font`;
no CDN/analytics — privacy: 分析工具不得收集健康选择 → none exist).

## 2. Budget (target / ceiling)

| item | target | ceiling | status |
|---|---|---|---|
| First-screen JS (home route, gzip) | ≤ 150 KB | 200 KB | ~180 KB incl. E1 — see exception |
| Total JS (all chunks, gzip) | ≤ 260 KB | 300 KB | 259.0 KB ✓ |
| CSS (gzip) | ≤ 8 KB | 12 KB | 5.1 KB ✓ |
| Media in first screen | 0 bytes video | 0 | ✓ (see §3) |
| Per-exercise video (when media exists) | ≤ 4 MB | 6 MB | n/a (no media yet) |
| Preview clip | ≤ 300 KB | 500 KB | n/a |
| Poster JPEG | ≤ 80 KB | 120 KB | n/a |

## 3. First-screen media policy (enforced in code)

- `VideoPlayer` uses `preload="metadata"` (S24 change from `"auto"`): first
  screen fetches only metadata, **never the full video** — a full download
  starts solely on user play (S24 acceptance: 首屏不下载完整视频).
- Poster renders whenever provided → stable layout before video bytes (CLS).
- Preview clips are lazy by contract: referenced via `data-preview` +
  `data-preview-policy="after-interaction"` only; nothing is fetched on load
  (no real previews exist yet; wiring is contract-first).
- canvas-confetti: dynamic-import-only (S18), own async chunk — verified again
  in this build: absent from first-screen graph.
- `next.config.ts`: immutable long-cache headers for `/videos/*` and map
  artwork (filename-addressed).

## 4. Exceptions (性能预算和例外有记录 — S24 acceptance)

**E1 — Zod + content JSON in a client chunk (69.4 KB gzip). FIXED 2026-09-01
(backlog session).**
Cause: `app/page.tsx` was a client component importing `lib/content` (module-
loads Zod + parses `body-parts.json` + `exercises.json`);
`components/SportQuickEntry.tsx` imported `data/sports.json` + `SportSchema`.
Fix as prescribed here:
  1. `app/page.tsx` is now a SERVER component; it derives the
     `{hotspotId: regionId}` map + region names and hands them to a thin
     client boundary `components/HomeExplorer.tsx`.
  2. `lib/content.ts` pre-validates `sports.json` at module load (build gate)
     and the parsed array reaches the client as props; `SportQuickEntry` is
     now fully props-driven (no data/Zod import).
Measured after fix (`node scripts/chunk-report.mjs`, the new §6 tool): no
client chunk embeds Zod; total JS 195.9 KB gzip (was 259.0), 196.4 KB after
the same session's adjustable-timer control; largest chunks
69.9 (react-dom) / 43.6 / 38.7 (app code).

**E2 — First-screen JS ≈ 180 KB gzip incl. E1.** Re-measured 2026-09-01 after
the E1 fix + home wiring of SportQuickEntry/flow links: **175.0 KB gzip** on
the home route (8 chunks). Within the 200 KB ceiling, above the 150 KB target
because home now ships the sport-entry + flow-link client UI. To close the gap
later: split the body-map and sport-entry client islands further or lazy-mount
the flow section. Not a release blocker (ceiling respected, zero third-party
requests, no first-screen video).

## 5. Core Web Vitals posture (design-level, honest)

- LCP element: body-map image on home (local webp, `muscle-chart-v4-front.webp`, ~83 KB) — no remote candidates.
- CLS: poster slot reserved; fonts self-hosted with `next/font` (swap
  controlled); step cards use fixed aspect skeletons (S14).
- INP: interactions are simple state updates; timers use timestamps, not tick
  counts (S16). Real-device measurement = student manual work (S24 manual
  items), not claimed here.

## 6. Measurement commands (repeatable)

```bash
npm run build
node scripts/chunk-report.mjs   # per-chunk raw/gzip sizes + Zod-presence (E1) guard
npm run test:e2e   # includes 375px no-overflow + production-build path checks
```

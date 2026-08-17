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

**E1 — Zod + content JSON in a client chunk (69.4 KB gzip).**
Cause: `app/page.tsx` is a client component and imports `lib/content`, which
module-loads Zod schemas and parses `body-parts.json` + `exercises.json`;
`components/SportQuickEntry.tsx` similarly imports `data/sports.json` +
`SportSchema`. The chunk loads on the home route (first screen).
Fix (2-line changes, blocked by this session's file allowlist —
`next.config.ts`/`VideoPlayer` only):
  1. Move hotspot→region mapping into a server component boundary or a tiny
     client-side lookup map (`{hotspotId: regionId}` generated from data).
  2. Pre-validate `sports.json` at build time (lib/content-style module load)
     and hand the parsed array to the client as props.
Owners: next code unit with page-file access (S25+ integration or a dedicated
chore). Not a release blocker; recorded here per the S24 mandate.

**E2 — First-screen JS ≈ 180 KB gzip incl. E1.** Within the 200 KB ceiling;
revisit to target once E1 lands (projected ≈ 110–120 KB).

## 5. Core Web Vitals posture (design-level, honest)

- LCP element: body-map SVG on home (local, ~40 KB) — no remote candidates.
- CLS: poster slot reserved; fonts self-hosted with `next/font` (swap
  controlled); step cards use fixed aspect skeletons (S14).
- INP: interactions are simple state updates; timers use timestamps, not tick
  counts (S16). Real-device measurement = student manual work (S24 manual
  items), not claimed here.

## 6. Measurement commands (repeatable)

```bash
npm run build
node -e "/* size report: read .next/static/chunks, gzip each */"  # see performance-S24.html for this run's output
npm run test:e2e   # includes 375px no-overflow + production-build path checks
```

# RecoverMate Offline Demo (S24)

**Status: procedure + checklist READY; manual rehearsal pending (student).**
The automated offline smoke (network fully blocked, service-worker-free) is
part of `npm run test:e2e` — the demo loop below is the human version for the
competition demo, where venue Wi-Fi cannot be trusted.

## Why it works offline (today, zero media)

The app is static-first and same-origin: all JS/CSS/SVG are local, fonts are
self-hosted by `next/font` (no Google Fonts runtime requests — verified in the
S24 build), no analytics, no CDN, no database. The only network-dependent
surfaces are real exercise videos/posters/captions (none exist yet) — and the
UI is built to degrade: text steps, timers, flows all work without media
(S15 fallback + S17 session no-video mode, both tested).

## Demo checklist — 脚踝闭环 (ankle loop, offline)

Run `npm run build && npx next start -p 3100`, then BEFORE loading the app:
turn the machine's network off (or DevTools → Network → Offline after first
load; both paths rehearsed below).

1. ☐ `http://127.0.0.1:3100/` loads — body map renders (local SVG), no console
   network errors blocking the UI.
2. ☐ Front/back view toggle works (pure client state).
3. ☐ Tap/keyboard-select an ankle hotspot → `/body/ankle` renders cards.
4. ☐ Open 踝内翻拉伸 detail: safety notice, steps, session timer all usable
   (video area shows the pending notice — expected offline AND online today).
5. ☐ Start the step timer, pause it, verify pause freezes the countdown,
   reset works. (`Stop / Reset` is always available.)
6. ☐ Mark exercise complete → completion feedback renders (reduced-motion
   systems show the static cue; confetti is decorative-only either way).
7. ☐ Direct `/flow/basketball` → queue renders; step through 2–3 items;
   verify nothing auto-advances; exit returns home.
8. ☐ Browser refresh offline: SSG routes still render (they are static HTML);
   `/exercise/[id]` renders (dynamic route, served by the local server).
9. ☐ No page ever dead-ends: Home/back controls reachable on every screen.

## Media checklist (placeholder until S11→S13)

- ☐ `public/demo-media/` contains only licensed, reviewed files (see its
  README); budget per `docs/PerformanceBudget.md` §media.
- ☐ Offline pack covers the ankle loop first — do NOT bundle all videos
  (S24 do-not-do: 不要把所有视频打包进首屏/离线包).

## Automated smoke

`tests/browser/core-path.spec.ts` runs against the production build with
network access but asserts zero horizontal overflow + full path operability;
the offline-specific smoke is: load the app, then block ALL network in the
browser and complete steps 2–7 above. `offline-demo-S24.mp4` (screen recording
of exactly that) is student manual evidence — pending, not fabricated.

## Known limits (honest)

- The demo requires the local `next start` server running (it is not a
  file:// bundle). A fully offline static export remains deferred with the
  `?done=` dynamic-route decision (S09 note; revisit at S27 deployment).
- No service worker is installed by design (no background updates, no cache
  spoofing of content); "offline" = server reachable on localhost, browser
  network blocked. State this plainly in the demo.

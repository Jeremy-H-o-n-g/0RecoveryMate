# Offline demo media (`public/demo-media/`)

**Status: directory is intentionally EMPTY except this README.** No real
exercise media exists yet (S12 capture passed via placeholder strategy;
S13 editing deferred; S11 reviewer authorization pending). Nothing is
fabricated here — the offline demo currently runs entirely on the app's
text/SVG/timer surfaces, which need zero media files.

When real reviewed media arrives (S11→S13 unblocked):

1. Place ONLY media we have the right to distribute (reviewed + licensed).
   离线包只含有权分发的媒体 — every file needs a matching license/source in
   `docs/SourceLedger.md` before it may ship in an offline pack.
2. Naming: `<exercise-id>.mp4`, `<exercise-id>-poster.jpg`,
   `<exercise-id>-preview.mp4` (mirrors `docs/VideoPostProductionProtocol.md`).
3. Budget: respect `docs/PerformanceBudget.md` §media. The offline pack should
   cover the ankle loop first (see `docs/OfflineDemo.md`), not all 18 entries.
4. Update `docs/OfflineDemo.md` step 3 (media checklist) when files land.

Suggested first additions (once licensed):
- `ankle-inversion-stretch.mp4` + poster + preview
- `ankle-eversion-stretch.mp4` + poster + preview
- `ankle-circles.mp4` + poster + preview

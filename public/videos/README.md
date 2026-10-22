# public/videos — web video files

Served statically. Holds the edited web MP4s, previews, and posters per the
[Video Post-Production Protocol](../../docs/VideoPostProductionProtocol.md):
`<id>.mp4`, `<id>-preview.mp4`, `<id>-poster.jpg`.

No files yet (S12 capture + S13 editing pending). Media hosting is local-first
(DC-5) until the performance budget is measured (S24); large binaries may move
to object storage / Git-LFS later.

**2026-10-22 — Blob overlay supersedes local-first for ADMIN-UPLOADED media:**
the `/admin/upload` surface stores files in Vercel Blob under the SAME naming
convention (`videos/<id>.mp4`, `videos/<id>-preview.mp4`,
`videos/<id>-poster.jpg`, `captions/<id>.vtt`, `transcripts/<id>.md`) and
records their URLs in the store's `media-manifest.json`, which
`/exercise/[id]` merges at request time. Local files in this directory remain
the fallback for anything committed via Git; when both exist, the uploaded
overlay URL wins on the exercise page.

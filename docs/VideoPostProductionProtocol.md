# RecoverMate Video Post-Production Protocol (S13)

**Status (S13): SPEC DRAFTED — EDITING PENDING.** No footage exists yet (S12
capture pending), so no real MP4/preview/poster/captions/transcript are produced
here. This is the repeatable pipeline spec + file conventions for when footage
is available. Nothing is fabricated as produced media.

## 1. Objective
Turn a selected take into: a web MP4, a ~3s preview, a poster frame, WebVTT
captions, and a descriptive transcript — with metadata stripped and within the
media budget.

## 2. Prior requirements
- S12 selected take + consent/rights recorded (currently pending).
- Reviewer-approved on-screen text + voiced narration (S11/S13 review; reviewer `<<REVIEWER_NAME_TBD>>`).

## 3. Encoding (web MP4)
- Container/codec: MP4 / H.264 (yuv420p) + AAC; broadly compatible.
- Resolution: 720p (1280x720) target; keep aspect; never upscale.
- Bitrate: target per the S24 media budget (start ~1–1.5 Mbps; tune to budget).
- No unauthorized music; clear narrated audio (or a silent alternative take).
- Strip metadata that could expose location/identity (EXIF/GPS).

## 4. Preview + poster
- Preview: ~3s loopable clip, same codec, low bitrate, muted.
- Poster: a representative still frame (JPEG) for the `<video>` element.

## 5. Captions (WebVTT)
- File: `public/captions/<id>.vtt` (WebVTT).
- Cue timing aligned to narration; **manual proofread required** (S13 do-not-do:
  no auto-generated captions without proofreading).
- Reviewer re-checks on-screen text + voiced content (S13 student manual work).

## 6. Descriptive transcript
- File: `public/transcripts/<id>.md` — includes speech, relevant non-speech audio,
  and important visual info (W3C descriptive-transcript guidance).
- Captions are NOT the only step explanation (pair with the steps list).

## 7. File conventions (data/exercises.json fields)
- `videoUrl`: `/videos/<id>.mp4`
- `previewUrl`: `/videos/<id>-preview.mp4`
- `posterUrl`: `/videos/<id>-poster.jpg`
- `captionUrl`: `/captions/<id>.vtt`
- `transcriptUrl`: `/transcripts/<id>.md`
- Set ONLY when the files exist + are reviewed. The build gate (`validate:content`)
  checks local media existence for `approved` exercises.

## 8. Media budget + fallback
- Per-exercise and total budgets are finalized in S24; S13 sets the targets above.
- Always provide a poster + transcript so the experience degrades gracefully if a
  video fails to load (offline/slow network).

## 9. Accessibility + safety
- Captions + descriptive transcript are required for approved content (content
  policy; enforced by the build gate).
- Strip identifying metadata; no real-injury footage; no unauthorized people.

## 10. Pipeline (repeatable, one video at a time)
1. Ingest the selected take from `media/raw/`.
2. Edit to the web cut; export MP4 + preview + poster.
3. Author + proofread VTT; write the descriptive transcript.
4. Strip metadata; check the file-size budget.
5. Reviewer sign-off on captions/text; set URLs in `data/exercises.json`; only
   then mark `approved` (build gate enforces the accessibility fields).

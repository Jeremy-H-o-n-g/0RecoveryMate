# S15 Accessible Video Player (a11y decisions)

## Player
- Native `<video controls>` — **no custom controls** (S15 do-not-do). Keyboard-operable
  and screen-reader supported via the browser.
- **No autoplay** (safety: do not auto-start movement content).
- `preload="metadata"` to limit data use.
- `poster` from `posterUrl` (when present).

## Captions
- `<track default kind="subtitles" srcLang="en" src={captionUrl} label="English">`
  when `captionUrl` exists → captions are present and ON by default (enableable).
- Captions are manually proofread + reviewer-checked before an exercise is
  approved (S13); the build gate requires `captionUrl` for approved content.

## Transcript
- A "Read transcript" link to `transcriptUrl` is shown with the player and in the
  no-video fallback, so the content is reachable without audio/video.

## Graceful degradation
- When `videoUrl` is empty (media pending), the player shows a "Video pending"
  notice + transcript link. Steps + the safety notice remain fully readable, so
  the page is usable without any video.

## Safety information hierarchy (before the action)
- `SafetyNotice` (stop signals + the non-diagnostic boundary) is rendered BEFORE
  the video/action — never after, and never hidden behind it. A `[Placeholder]`
  alert is also shown for non-approved content.

## No tracking
- The player collects no viewing behavior (no playback analytics).

## Validation
- `tests/exercise-page.test.tsx`: `<video>` has `controls` + no `autoplay`;
  `<track>` kind/src present; transcript link; no-video fallback; `SafetyNotice`
  renders stop signals; valid page renders steps + safety; invalid id →
  `notFound` (throws).
- Deferred: `exercise-page-S15.png` (no headless browser); real captions/transcript
  arrive with S13 footage; on-device fullscreen + keyboard walk-through are
  student manual work.

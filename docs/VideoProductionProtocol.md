# RecoverMate Video Production Protocol (S12)

**Status (S12): SPEC DRAFTED — CAPTURE PENDING.** No footage exists yet. Actual
capture is student manual work and requires the prior-state (locked exercise
list from S11 + performer consent + venue safety), which is not yet satisfied.
Nothing here is fabricated as captured media.

## 1. Objective
Capture a reviewable, dual-angle exercise video per approved exercise using a
phone + tripod, while preserving consent and shot records.

## 2. Prior requirements (must be true before filming)
- Exercise list locked + professionally reviewed (S11) — currently BLOCKED
  (reviewer placeholder `<<REVIEWER_NAME_TBD>>`).
- Performer consent form signed (on file; referenced by take id).
- Venue safety: clear floor, fall-risk assessed, clean background.

## 3. Setup
- Clean, uncluttered background; no unauthorized people in frame.
- Stable, even lighting (avoid strong backlight).
- Tripod-mounted phone; two angles — front and side.
- Frame so the full movement and key postures stay in view (no cropping of joints).

## 4. Shot list (per exercise)
- Take A (front, voiced explanation): performer narrates the movement.
- Take B (front, silent): clean performance.
- Take C (side, silent): clean performance.
- Record each take id in `media/production-log.csv` with its consent reference.

## 5. Take selection + rejection
- Select the clearest take per angle.
- REJECT takes where: a key posture/joint is cropped; the background contains
  non-consenting people or sensitive content; the performer appears distressed or
  in pain; exposure/shake makes the movement unclear.
- Never film real injury. The performer may stop at any time without penalty.

## 6. Rights + consent
- Performer: a consenting student or adult volunteer with a signed release.
- Each take references a consent id in the production log.
- Raw footage stays in `media/raw/` (gitignored); only reviewed/edited, licensed
  assets ship.

## 7. Evidence (S12)
- `media/production-log.csv` — the live take log (template; no real takes yet).
- `pilot-raw-contact-sheet-S12.jpg` — PENDING (requires real footage).
- `production-log-S12.csv` — the production-log template snapshot (no real takes yet).

## 8. To unblock capture (next safe actions — require the student/mentor)
1. Lock + review the exercise list (S11 — replace `<<REVIEWER_NAME_TBD>>`).
2. Obtain performer consent; confirm venue safety.
3. Film per §3–§5; log every take; select/reject per §5.
4. Produce the contact sheet from the selected pilot takes.

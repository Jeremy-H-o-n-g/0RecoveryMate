# S20 Reviewer Sampling Checklist

**Status: TEMPLATE — reviewer authorization pending (S11).** No professional
review has occurred; nothing below is checked. Per the content policy, every
entry stays `draft` (publish-blocked by the build gate) until the reviewer
signs off. This file defines WHAT to spot-check when the reviewer is available
so the pass is systematic, not ad hoc.

Suggested sample (7 of 18 entries — one per region + the two risk-flagged
items; the reviewer may substitute freely):

| # | id | region | Why sampled |
|---|---|---|---|
| 1 | `shoulder-overhead-triceps-rear-stretch` | 肩 | Region sample; behind-back arm position |
| 2 | `arm-wrist-rotations` | 手臂 | Dynamic entry; rep count (8–10) vs 30 s set default |
| 3 | `lower-back-childs-pose` | 腰背 | Widest hold range (20–60 s) defaulted to 30 s; most modification props |
| 4 | `knee-seated-hamstring-stretch` | 膝 | Knee-caveat wording (膝盖后侧不应有刺痛) |
| 5 | `calf-wall-soleus-stretch` | 小腿 | Flagged 进阶 (advanced) in the source manual |
| 6 | `ankle-inversion-stretch` | 脚踝 | **RISK FLAG**: moves toward the 崴脚 (sprain) direction — needs explicit reviewer ruling (user direction 2026-08-14: sign-off deferred to reviewer) |
| 7 | `ankle-pilot-placeholder` | 脚踝 | Original placeholder retained for the vertical slice |

Per-entry checks for the reviewer:
- [ ] Movement description is safe and accurate for general warm-up use.
- [ ] 要点/tips do not push through pain.
- [ ] stopSignals match the entry's real risk profile (currently generic draft text).
- [ ] 30 s per set / 15 s rest is appropriate for this movement.
- [ ] difficulty assessment (currently `not-set` by user decision — reviewer may override).
- [ ] Bilingual wording carries no diagnostic or treatment claims.

Cross-checks:
- [ ] Left/right (换边) instructions are present for all two-sided stretches.
- [ ] Front/back view mapping (`body-parts.json` `view` fields) matches each entry.
- [ ] Sources/licenses are attached or the entry remains honestly `[pending]`.

Reviewer: `<<REVIEWER_NAME_TBD>>` — sign-off pending (S11).

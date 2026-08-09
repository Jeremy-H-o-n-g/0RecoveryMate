# Content Policy v1 (S02)

**Status:** v1, defined in S02. Draft wording, pending confirmation of the review process with a qualified sports/rehabilitation professional (S11). Companions: [`config/content-policy.json`](../config/content-policy.json), [`ContentSafetyPolicy.md`](ContentSafetyPolicy.md), [`SourceLedger.md`](SourceLedger.md), [`unsafe-copy-test.md`](unsafe-copy-test.md).

## What v1 adds over v0
v0 (pre-S02) had: `productBoundary`, `publishableReviewStatuses:["approved"]`, 8 `requiredExerciseFields`, `productionAnalytics:false`, `publicUploads:false`.

v1 adds:
- `reviewStatus` state machine: `draft / in-review / approved / rejected / blocked`.
- `requiredExerciseFields` now includes `reviewStatus` (9 fields).
- `buildGate`: non-approved or missing-field exercises fail the build (wired S10/S11).
- `unsafeContent.categories` + `refusal.templates` (refuse/redirect, no disclaimers to excuse unreliable content).
- `redFlags` (stop signals) + `escalation`.
- `pageLevelSafetyPrompt` visibility rule (implemented S15).
- `endorsements` rule (no fabricated ACSM/AAOS endorsements).
- `dataMinimization`.

## Acceptance mapping (S02)
- **Unreviewed actions cannot enter the release build** — MET: `publishableReviewStatuses:["approved"]` + `buildGate`; sample is `draft` (blocked). Enforcement wired in S10/S11.
- **Every action has source, license, and review status** — MET: `requiredExerciseFields` includes `sourceTitle/sourceUrl/licenseId/reviewStatus`; sample carries all; `SourceLedger.md` defines fields + states.
- **Red-flag prompts not obscured by visuals** — MET (rule): `pageLevelSafetyPrompt` requirements (DOM order, contrast, no overlay, reduced-motion, keyboard/screen-reader). Implemented in S15.

## Verification results (exact, run in S02)
- JSON structure: **valid** (parsed).
- `publishableReviewStatuses == ["approved"]`: OK.
- `requiredExerciseFields` includes all 9: OK.
- `reviewStatuses` has 5 states: OK.
- `buildGate` excludes non-approved from release: OK.
- `refusal` ≥ 2 templates: OK.
- `pageLevelSafetyPrompt` requirements present: OK.
- `endorsements` rule present: OK.
- Refusal coverage — TC-1 diagnosis/treatment, TC-2 guaranteed outcomes, TC-3 soreness-as-injury: all OK.
- Sample `exercises.json` carries all required fields; `reviewStatus="draft"` (not approved → blocked): OK.
- **RESULT: ALL CHECKS PASS.**
- `node scripts/check-environment.mjs` → exit 0.

## Honest scope note
The 3-wording refusal test ([`unsafe-copy-test.md`](unsafe-copy-test.md)) is a **defined contract**, not a live run (no app until S05). Professional review-process confirmation is pending (S11). No organizational endorsements fabricated; sample content stays `draft`/placeholder.

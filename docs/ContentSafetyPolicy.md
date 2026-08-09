# RecoverMate Content Safety Policy (v1)

**Status:** v1, defined in S02. General educational recovery/warm-up guidance only — non-diagnostic. Wording here is **draft**, pending confirmation of the review process with a qualified sports/rehabilitation professional (S11). No organizational endorsement is claimed.

Machine-readable companion: [`config/content-policy.json`](../config/content-policy.json). Source ledger: [`SourceLedger.md`](SourceLedger.md).

## 1. Product boundary
RecoverMate provides **general educational recovery/warm-up guidance only**. It does **not** diagnose, treat, grade injuries, give individualized advice, or guarantee outcomes. Soreness is **not** automatically interpreted as a specific injury.

## 2. Acceptable vs unacceptable wording
**Acceptable (general, non-clinical):**
- Describe an exercise and its general purpose (e.g., "general mobility for the calf and ankle").
- Offer general warm-up/recovery pointers.
- Show stop signals and recommend seeking qualified assessment when red flags appear.

**Unacceptable (refuse or redirect — see `unsafeContent.categories`):**
- Diagnosis or injury grading (e.g., "this is a Grade II sprain").
- Treatment prescriptions or medication/dosage guidance.
- Interpreting soreness as a specific injury (e.g., "the soreness means a torn ligament").
- Guaranteed outcomes or recovery promises (e.g., "guaranteed to heal in two weeks").
- Facilitating self-harm, substance misuse, or unsafe exertion.
- Individualized medical advice.

**Refusal style:** brief and non-judgmental; state the boundary; redirect to general guidance or professional assessment. Disclaimers must **not** be used to excuse unreliable content.

## 3. Review and publish gate
- Only `approved` content may appear in a release build (`publishableReviewStatuses: ["approved"]`).
- Every exercise must carry all `requiredExerciseFields`: source, license, reviewer, review date, captions, transcript, stop signals, and review status.
- **Build gate:** any exercise whose `reviewStatus` is not `approved`, or that is missing a required field, must fail content validation and be excluded from release. Enforced by build-time validation (wired in S10/S11).
- Current sample content is `draft`/placeholder and must **not** be published.

## 4. Red-flag stop signals and escalation
Stop and seek qualified assessment for: **severe pain, noticeable swelling, inability to move or bear weight, numbness, or symptoms that persist or affect performance.**
- On any red flag: show the stop-signal prompt prominently; **do not diagnose**; recommend stopping and seeking qualified professional assessment.
- Source to adapt: AAOS public warning-sign guidance — a **reference to consult**, not an endorsement of RecoverMate.

## 5. Page-level safety prompt (visibility rule)
Every exercise detail **must** show the red-flag/stop-signal prompt, and it must **not be obscured by visuals**:
- present in the DOM before media/animation;
- high-contrast, legible text (WCAG 2.2 AA);
- not hidden behind overlays, particles, or autoplay media;
- remains visible and readable with `prefers-reduced-motion`;
- reachable and operable by keyboard and screen readers.
(Implemented in the exercise-detail route, S15.)

## 6. Privacy and data minimization
Collect no health history, diagnoses, or production body-part selections. Research data is anonymized and offline. Production analytics off; public uploads off.

## 7. No fabricated endorsements
Do not claim that ACSM, AAOS, or any organization endorses RecoverMate. Public references (AAOS warning signs, W3C captions/transcripts) are sources to consult, not endorsements.

## 8. Open items (not fabricated)
- Qualified reviewer not yet named; review process confirmation is pending (S11).
- Build-time enforcement and the live refusal test are **defined** here and wired in S10/S11/S15; not yet runnable (no app/build until S05).

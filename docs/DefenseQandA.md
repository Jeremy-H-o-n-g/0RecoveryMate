# RecoverMate — Defense Q&A Prep (S28)

Anticipated questions + evidence-backed answers. Rule: every claim points to
an artifact in this repo; when something is pending, SAY so (不要隐瞒限制).

## A. Boundary & safety (most likely opening attack)

**Q: Is this a medical product? How do you prevent it becoming one?**
A: It is general educational warm-up guidance only — by design and by
enforcement. `docs/ContentSafetyPolicy.md` defines acceptable wording; the
exercise schema REFUSES to mark content `approved` without source, license,
reviewer, captions, transcript, and stop signals (schemas/exercise.ts);
`npm run check:safety` is a release-blocking contract test that fails if
safety copy drifts or diagnostic phrasing appears. Evidence:
content-policy-v1, check-safety output in test-summary-S23.html.

**Q: What if a user follows an exercise and gets hurt?**
A: Stop-signal notices render before every action (DOM order asserted by
e2e); the timer is a follow-along tool with an immediate Stop/Reset; nothing
pushes continuation (no autoplay, no countdown pressure — fake-time tested);
and the completion message explicitly says progress doesn't require pushing
through pain.

## B. Content credibility

**Q: Who reviewed your 18 exercises?**
A: No one yet — and we say so on every page. All content is clearly-marked
DRAFT (S11 professional review pending; the reviewer checklist and a 7-entry
sampling plan incl. the ankle-inversion risk flag are ready in
docs/review-sampling-S20.md). The build gate structurally prevents unreviewed
content from publishing as approved.

**Q: Why no videos?**
A: Real capture was deliberately passed via a placeholder strategy (owner
decision, recorded) — media fields stay empty, the player degrades to text
steps + transcript link, and reviewed videos swap in later without pipeline
changes. We did not fabricate footage.

## C. Research

**Q: What did your usability study find?**
A: It hasn't run — protocol, consent script, and recording infrastructure are
complete (S03/S25), and the 10 sessions are scheduled. We claim zero results
today; S26 analysis follows the real study. (Formative, n=10, AB/BA; no
significance claims even after it runs — limitations pre-written.)

**Q: Is the body map actually better than a list?**
A: That is exactly the study's question; we pre-registered the honest answer:
"the data will tell us." Meanwhile accessibility is not waiting on the study:
axe scans show zero WCAG A/AA violations.

## D. Technical

**Q: Stack and why?** Next.js App Router, static-first (SSG where possible),
TypeScript strict, Zod build-time content gate, zero database/accounts. Pages:
`/`, `/body/[part]` ×6 SSG, `/exercise/[id]`, `/flow/[sport]` ×8 SSG.

**Q: Performance?** Measured, not guessed: 259 KB gzip total JS (budget 300),
5.1 KB CSS, zero third-party runtime requests, zero first-screen video bytes
(preload=metadata). Known exception E1 (zod+data in a client chunk, 69.4 KB
gzip) is documented with a fix plan — within ceiling (PerformanceBudget.md).

**Q: How do you know it works on phones?** The real-browser e2e suite tests
375px (no horizontal scroll) — which caught a genuine 41px overflow defect
from the fixed-width body map; fixed same-session with %-positioned hotspots
(defect-log-S23.csv S23-01).

**Q: Users with motion sensitivity?** prefers-reduced-motion kills the
bounce AND confetti at three levels (component gate, effect self-check, CSS);
the success cue is text+shape+color, never motion alone.

**Q: Data privacy?** No accounts, no analytics, zero fetch in app code;
production URLs carry no health data (only `?done=1`); network smoke asserts
zero third-party requests; research raw data is gitignored + access-restricted.

**Q: Deployment/rollback?** Vercel, zero env vars, one-click Promote rollback
with a rehearsal script (RecoveryGuide.md); local offline demo runs
independently (OfflineDemo.md) — the demo never depends on one network path.

## E. Process (judges love this)

**Q: How was this built?** 28 bounded sessions (S01–S28), each with a written
prompt, file allowlist, acceptance criteria, recorded evidence, and TASKS.md
history — 32 commits, every session's test evidence preserved. Failed
evidence is kept, not hidden (e.g., docs/timer-tests-S16.txt … release-S27.txt).

**Q: What would you do next?** 1) Professional content review (S11) + real
media; 2) run the usability study + iterate on findings (S25/S26); 3) the
recorded backlog: adjustable timer + rest presets, in-app sport/flow entry
links, perf exception E1, VideoPlayer unification.

## Hard rules for the room

- Never present the prototype as a medical device; never show research raw
  data or consent forms.
- If asked something unknown: "I don't have that measured — here's how I
  would find out" (then point at the relevant doc).
- Every factual sentence should be traceable via `docs/EvidenceIndex.md`.

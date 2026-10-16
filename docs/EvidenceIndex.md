# RecoverMate — Evidence Index (S28)

Every claim in the report/demo/defense maps to an artifact below. Live items
(student manual, honestly pending) are marked ⏳. Print as
`final-evidence-index.pdf`.

## A. Requirements & governance

| Claim | Evidence |
|---|---|
| Authoritative requirements (BR-01…15) | `docs/baseline-ledger.md` · `docs/Traceability.md` |
| Health/safety boundary policy | `docs/ContentSafetyPolicy.md` · `config/content-policy.json` |
| Session-by-session history, decisions, evidence | `TASKS.md` (32 commits) |
| Content sources/review status | `docs/SourceLedger.md` · `docs/ContentReviewLog.md` (review pending S11) |

## B. Design & UX

| Claim | Evidence |
|---|---|
| IA / state model / flow | `docs/UXBlueprint.md` · `docs/StateModel.md` · `ux-flow-S04.png` |
| Original body-map artwork | `docs/svg-license-S06.md` · `docs/body-front-S06.png` / `body-back-S07.png` |
| Current body-map artwork (2026-09-05 swap, AI-generated) | `public/anatomy/muscle-chart-v4-front.webp` + `muscle-chart-v4-back.webp` (transparent-background encodings of the v3 crops for the dark theme) · `docs/SourceLedger.md` §4a (owner-supplied AI-generated; rights recorded, no TBD) · hotspot alignment evidence: `docs/bodymap-v3-hotspot-check-front.png` / `-back.png` (geometry unchanged by the re-encode) |
| Multi-device adaptation (TV/desktop/tablet/mobile, 2026-09-05) | `docs/preview-responsive-home-{375,768,1440,1920,2560}.png` + `preview-responsive-body-ankle-{375,1440,1920}.png` + `preview-responsive-flow-basketball-{1440,1920}.png` + `preview-responsive-exercise-ankle-pilot-placeholder-1440.png` (measured: no horizontal overflow; home fits viewport height at ≥768px-tall windows; root font 18/20px at 1920/2560; two-column layouts ≥1024) · sizing contract in `app/globals.css` (`.body-map-frame` + TV root-font steps) |
| Sport mapping (user-confirmed) | `docs/mapping-review-S21.md` · `data/sports.json` |

## C. Content truthfulness

| Claim | Evidence |
|---|---|
| 18 draft exercises, six regions, validated | `docs/validation-S20.txt` · `docs/content-manifest-S20.csv` · `npm run validate:content` |
| Approved-only publishing gate | `schemas/exercise.ts` refine · `tests/content-schema.test.ts` |
| Reviewer sampling plan (risk flag incl.) | `docs/review-sampling-S20.md` |
| Video placeholder strategy (owner decision) | `docs/VideoProductionProtocol.md` · `public/demo-media/README.md` |

## D. Test & quality (per session, chronological)

| Session | Evidence |
|---|---|
| S05–S07 tokens/maps | `test-report-S05.txt` · `test-report-S06.txt` · `test-report-S07.txt` |
| S08 schema | `schema-report-S08.txt` |
| S09 ankle slice | `e2e-report-S09.txt` |
| S10 content gate | `content-validation-S10.txt` |
| S14 cards | `test-report-S14.txt` |
| S16 timer math/FSM | `timer-tests-S16.txt` |
| S17 session sync | `test-report-S17.txt` |
| S18 completion feedback | `test-report-S18.txt` |
| S19 integration + regression | `e2e-report-S19.txt` |
| S20 content fill | `validation-S20.txt` + manifest CSV |
| S22 flow queue | `queue-tests-S22.txt` |
| S23 release suite + a11y + defects | `test-summary-S23.html` · `a11y-report-S23.html` (axe, zero violations) · `defect-log-S23.csv` |
| Current live counts | `npm run test` → 14 files / 114 tests; e2e 4; a11y 7 |

## E. Performance & privacy

| Claim | Evidence |
|---|---|
| 259 KB gzip JS total; zero 3rd-party requests; zero first-screen video | `docs/performance-S24.html` · `docs/PerformanceBudget.md` |
| Exception E1 recorded honestly | `PerformanceBudget.md` §4 |
| No analytics / logs w/o health data | code grep (zero fetch/console) + smoke test `production-smoke.spec.ts` |

## F. Deployment & resilience

| Claim | Evidence |
|---|---|
| Deploy procedure (no env/secrets) | `docs/DeploymentGuide.md` |
| Rollback + rehearsal script | `docs/RecoveryGuide.md` |
| Release gates + sign-offs | `docs/ReleaseChecklist.md` · `docs/release-S27.txt` |
| Offline demo (ankle loop) | `docs/OfflineDemo.md` |
| ⏳ Live smoke/rollback/PDF/mp4 | student manual work |

## G. Research (status: not yet run — nothing claimed)

| Item | Evidence |
|---|---|
| Protocol v1 (AB/BA, n=10, formative) | `docs/ResearchProtocol.md` · `ConsentScript.md` |
| Demo rehearsal tracker | `docs/rehearsals-S28.md` (⏳ template, student fills) |
| Run log + raw templates | `docs/ResearchRunLog.md` · `data/research/raw/` (gitignored by design) |
| ⏳ Study execution + analysis (S25/S26) | parked per owner decision 2026-08-17 |

## H. Demo & defense

| Item | Evidence |
|---|---|
| ≤5-min demo script w/ fallbacks | `docs/DemoScript.md` |
| Q&A prep | `docs/DefenseQandA.md` |
| ⏳ `final-demo-S28.mp4`, `final-evidence-index.pdf`, `rehearsals-S28.md` | student manual work |

**Integrity rule:** if a claim has no row above, either add the evidence or
drop the claim — never present unevidenced statements as fact.

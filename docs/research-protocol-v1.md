# Research Protocol v1 (S03)

**Status:** v1, designed in S03. Formative, descriptive; no significance claimed; pilot pending. Companions: [`ResearchProtocol.md`](ResearchProtocol.md), [`ConsentScript.md`](ConsentScript.md), [`data/templates/usability-observations.csv`](../data/templates/usability-observations.csv), [`data/templates/pilot-observation.csv`](../data/templates/pilot-observation.csv).

## Deliverables
- `docs/ResearchProtocol.md` (protocol), `docs/ConsentScript.md` (consent), `data/templates/usability-observations.csv` (record table), `data/templates/pilot-observation.csv` (pilot template).

## Acceptance mapping (S03)
- **Research question, metrics, exclusion rules clear** — MET (protocol §1–§4; RQ from proposal §5; metrics SM-1…SM-3; eligibility-based exclusion, not health screening).
- **Small-sample limitations written into plan** — MET (protocol §6).
- **Any participant can stop at any time** — MET (protocol §5 stop rules; ConsentScript "Your rights").

## Verification results (run in S03)
- Record table `usability-observations.csv` has **no name/health/diagnosis columns** (`participant_id` only): OK.
- Protocol specifies AB/BA counterbalanced with **5 per order**: OK.
- Every standard task (T1–T3) has explicit **start + end conditions**: OK.
- Protocol states **no statistical significance** and **no medical-effectiveness claim**: OK.
- Protocol states **no health-history collection** and **do not induce pain**: OK.
- **RESULT: ALL CHECKS PASS.**
- `node scripts/check-environment.mjs` → exit 0.

## Honest scope note
Selecting 10 volunteers with consent, finalising the no-health-history task wording with the mentor, and the pilot timing run are **student manual work — pending, not fabricated.** `pilot-observation.csv` is a template (steps/conditions predefined; `result`/`notes` left blank for the actual pilot), not real pilot data.

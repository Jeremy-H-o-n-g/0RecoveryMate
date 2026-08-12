# RecoverMate Content Review Log

**Status (S11): IN PROGRESS — BLOCKED on a human decision.** No content is
approved. The qualified reviewer is **not yet named (DC-3)**, so professional
sign-off cannot be performed or recorded here. Forging review signatures is
forbidden (S11 do-not-do; Global Engineering Contract). Companion:
[`SourceLedger.md`](SourceLedger.md), [`schema-decisions-S10.md`](schema-decisions-S10.md).

## 1. Purpose
Record the per-item professional review (approve / modify / reject) for each
candidate exercise, with reviewer identity, date, and notes. Rows are added ONLY
when a real review occurs — never fabricated.

## 2. Reviewer
- Qualified reviewer: **`<<REVIEWER_NAME_TBD>>`** — *placeholder for future update
  (DC-3, to be named)*. Must hold an appropriate sports/rehabilitation
  qualification. Replace this token everywhere (see `docs/SourceLedger.md`,
  `data/exercises.json` `reviewedBy`) once a real reviewer is named.
- Reviewer identity may NOT be fabricated. Until the placeholder above is
  replaced with a real, named reviewer, every item stays `pending` and no content
  may become `approved`.

## 3. Decision vocabulary
- `approved` — publishable (the build gate then requires full provenance +
  captions/transcript/stop-signals, per `schemas/exercise.ts`).
- `modify` — needs changes; stays `draft`/`in-review`.
- `rejected` — not publishable.
- Conflicting reviewer opinions are recorded here and surfaced as known issues
  (never hidden / self-corrected by the implementer).

## 4. Review log
| Exercise ID | Region | Source | Reviewer | Decision | Date | Notes |
|---|---|---|---|---|---|---|
| ankle-pilot-placeholder | ankle | [pending] | [pending] | pending | — | draft placeholder; not shootable; not approved |

## 5. Blocked acceptance (cannot pass without a human decision)
- **六部位各至少 2 个可拍摄动作 (≥2 shootable candidates per region):** BLOCKED —
  candidate selection requires real, licensable sources chosen with the reviewer
  (student manual work). Currently 1 draft placeholder (ankle) only; 0 approved.
- **所有文本由审核者签核 (all text signed off by reviewer):** BLOCKED — no
  qualified reviewer named.
- **许可路径清楚 (license path clear):** BLOCKED — performer + asset licenses
  must be confirmed by the student for each candidate.

## 6. To unblock S11 (next safe actions — require a human)
1. Name a qualified reviewer (DC-3).
2. Student selects 2–3 candidate exercises per region from real, licensable
   sources and records them in [`SourceLedger.md`](SourceLedger.md) and
   `source-ledger-S11.csv`.
3. Reviewer records `approve`/`modify`/`reject` per item in the log (§4).
4. Capture signed sign-off as `docs/review-signoff-S11.pdf` (no forgery); only
   then set `reviewStatus: "approved"` in `data/exercises.json` (the build gate
   enforces full provenance + accessibility on approved rows).

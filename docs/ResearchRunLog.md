# RecoverMate Usability Study — Run Log (S25)

**Status: SCAFFOLDING READY — EXECUTION PENDING.** The study itself is student
manual work (moderating 10 in-person sessions); nothing below is fabricated.
Prior-state gates that must be ticked BEFORE the first session:

- [ ] **Mentor approval to execute** (S25 prior-state requirement) — record date + name here: `_______________`
- [ ] **Pilot timing run** completed on `data/templates/pilot-observation.csv` (S03 §8) — date: `_______`
- [ ] Consent/assent process rehearsed from `docs/ConsentScript.md`
- [ ] ONE frozen build under test — commit: `_______` (rule: 不要边测试边改版本)

## Study parameters (from `docs/ResearchProtocol.md` v1 — do not modify mid-study)

- Within-subjects AB/BA, 10 participants (5 × AB, 5 × BA), tasks T1 calf /
  T2 knee / T3 shoulder on BOTH prototypes (A = body map, B = simplified list).
- Record per task: `completed` (yes/no/gave-up), `time_seconds` (first
  interaction → detail opened; cap 90 s), `wrong_selections`, notes.
- Participants never perform movements and are never asked about pain.
- Withdrawal: stop any time, keep/discard partial data per their choice.

## Counterbalancing assignments (fill as participants are recruited, in random order)

| slot | participant_id | sequence | session_date | consent (verbal/script) | status |
|---|---|---|---|---|---|
| 1  | P__ | AB | ____ | ☐ | pending |
| 2  | P__ | BA | ____ | ☐ | pending |
| 3  | P__ | AB | ____ | ☐ | pending |
| 4  | P__ | BA | ____ | ☐ | pending |
| 5  | P__ | AB | ____ | ☐ | pending |
| 6  | P__ | BA | ____ | ☐ | pending |
| 7  | P__ | AB | ____ | ☐ | pending |
| 8  | P__ | BA | ____ | ☐ | pending |
| 9  | P__ | AB | ____ | ☐ | pending |
| 10 | P__ | BA | ____ | ☐ | pending |

(Assign AB/BA in this fixed alternating pattern to randomized participant IDs;
log any deviation below. 5/5 split is an acceptance check.)

## Per-session quick log (append one block per session)

```
### P__ — <date> — <AB|BA>
- Start/end time: ____ / ____
- Moderator consistency: same script, no extra hints?  yes/no → deviation #__
- Task results: T1 A __s ✓/✗ (__ wrong) · T2 A __s ✓/✗ (__ wrong) · T3 A __s ✓/✗ (__ wrong)
                T1 B __s ✓/✗ (__ wrong) · T2 B __s ✓/✗ (__ wrong) · T3 B __s ✓/✗ (__ wrong)
- Qualitative notes (verbatim where possible; no leading questions):
- Discomfort/concern observed: none / stopped early (reason logged, no health details)
```

## Deviation log (登记偏差 — every departure from protocol, including hints given by accident)

| # | participant | what happened | effect on data | action |
|---|---|---|---|---|
| 1 | | | | |

## Post-study checks (acceptance)

- [ ] 10 rows complete OR withdrawals explicitly recorded (退出有记录)
- [ ] Group sizes 5 AB / 5 BA (两组人数检查)
- [ ] Missing values flagged in `notes`/`protocol_deviation` (缺失值标记)
- [ ] **De-anonymization sweep**: no names/contacts/health data anywhere in
      `data/research/raw/` (安全去敏检查) — checked by: _______ date: _______
- [ ] Failures/negative feedback preserved verbatim (未篡改)
- [ ] Anonymized export created for S26: `data/research/anonymized-observations-S25.csv`
- [ ] Evidence exports: `research-run-log-S25.pdf` (print of this file, filled),
      `anonymized-observations-S25.csv` — both stored OUTSIDE git (raw is
      access-restricted; aggregates go to `docs/` in S26).

## What the implementation partner may NOT do

Fabricate participants, times, results, mentor approval, or the pilot run
(global rule + S25 do-not-do). When real data exists, S26 analyzes it and
records aggregates (never raw rows) into the repository.

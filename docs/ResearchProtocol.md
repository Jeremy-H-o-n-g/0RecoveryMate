# RecoverMate Formative Usability Study Protocol (v1)

**Status:** v1, designed in S03. This is **formative, descriptive usability research — not medical-effectiveness research.** No statistical significance is claimed; the 10-participant sample informs design only. The pilot timing run is pending (student manual work).

**Research question** (from proposal §5): When completing the task "find an executable guidance for a specified body part," is the interactive body-map navigation easier for high-school students to understand and use than a simplified list navigation?

**Interpretation rule:** report task completion rate, median time, misselection/return rate, and feedback themes. Do **not** extrapolate to population effectiveness or treatment effect.

## 1. Design
- **Type:** within-subjects, formative, comparative.
- **Conditions:** A = interactive body-map navigation; B = simplified list navigation.
- **Order:** AB/BA counterbalanced — 10 participants: **5 complete A-then-B, 5 complete B-then-A**.
- **Setting:** in-person, quiet space, supervised; exercise desktop and mobile where possible.
- **Data:** anonymized only (`participant_id`). No names, no health/injury history, no diagnoses.

## 2. Participants and exclusion (eligibility, not health screening)
- Recruit 10 high-school student volunteers with appropriate consent/assent ([ConsentScript.md](ConsentScript.md)). *[student manual work — pending]*
- Exclude only on study-eligibility grounds: does not/cannot consent; is the researcher or otherwise conflicted; cannot attend. We do **not** screen for, ask about, or record health conditions.
- Withdrawal: any participant may stop at any time, for any reason, without penalty (§5).

## 3. Tasks and script (clear start/end conditions)
Each participant performs the same tasks on **both** prototypes. Tasks are non-health (e.g., "find a general warm-up for the calf"). Participants do **not** need to perform any movement that could cause discomfort; we never ask them to report pain.

Task template (repeat per task):
- **Task ID:** T##
- **Prompt (read aloud):** "Find a general warm-up/recovery action for the <region>."
- **Start condition:** participant confirms readiness; timer starts on first interaction.
- **End condition:** participant opens an action detail (success) OR gives up / 90 s elapsed (not completed).
- **Record:** `completed`, `time_seconds`, `wrong_selections`.

Standard task set (wording finalised with the mentor; no health questions):
- **T1** calf — general warm-up.
- **T2** knee — general warm-up.
- **T3** shoulder — general warm-up.
(Mirror T1–T3 across A and B.)

## 4. Metrics (proposal SM-1…SM-3)
- **Task completion rate** = completed tasks / started tasks (per prototype).
- **Median time to find an action** (per prototype; compare with explanation — not superiority testing).
- **Misselection/return rate** = wrong/invalid selections / total attempts; check for systematic hotspot mis-mapping.
- **Qualitative:** observer notes + optional general feedback themes.

Descriptive analysis only. No significance tests; no medical-effectiveness claims.

## 5. Stop rules
- A participant may stop at any time, for any reason, without penalty; partial data is kept or discarded per their choice.
- The researcher stops the session if the participant is distressed or uncomfortable.
- Participants are never asked to report pain or to perform painful movements.

## 6. Small-sample limitations (written into the plan)
- 10 participants is formative only — results inform design, not generalisation.
- No statistical significance; no population or medical-effectiveness inference.
- Order effects are mitigated by AB/BA but not eliminated at n = 10.
- A convenience sample of high-school students is not representative.

## 7. Privacy and data handling
- Anonymized (`participant_id` only). No names, contacts, health, or diagnosis data.
- Raw data stored offline and read-only after collection; analysis reproducible; consent forms stored separately.
- Production analytics off; no public uploads.

## 8. Pilot
- One pilot run of the timing flow is required before the study *(student manual work — pending)*. Instrument: [`data/templates/pilot-observation.csv`](../data/templates/pilot-observation.csv). It confirms timer start/stop and task start/end conditions.

## 9. Roles and oversight
- Student researcher (Jeremy Hong) conducts; mentor oversees.
- **Open:** 10 volunteers + consent (pending); pilot timing run (pending).

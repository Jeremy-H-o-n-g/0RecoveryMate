# media/raw — raw production footage (gitignored)

This directory holds original, unedited video footage. Its contents are
**gitignored** (see `.gitignore`: `media/raw/*`, except this `README.md`),
because raw media is large and may contain identifiable people.

## Rules
- Do NOT commit raw footage to git.
- Every file must map to a `take_id` in [`../production-log.csv`](../production-log.csv),
  including a consent reference.
- Raw footage is retained (never delete review records); only reviewed/edited,
  licensed assets are published.
- No real footage exists yet — S12 capture is pending (see
  [`docs/VideoProductionProtocol.md`](../../docs/VideoProductionProtocol.md)).

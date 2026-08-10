# S10 Schema Decisions

## Exercise fields (`schemas/exercise.ts`)
- Identity/content: `id`, `nameZh`, `nameEn`, `durationSeconds` (int > 0), `difficulty`, `muscles[]`
- Media: `videoUrl`, `previewUrl`, `posterUrl`, `captionUrl`, `transcriptUrl` — each `""` | http(s) URL | local `/path`
- Guidance: `steps[]`, `tips[]`, `stopSignals[]`
- Provenance: `sourceTitle`, `sourceUrl`, `licenseId`
- Review: `reviewedBy`, `reviewedAt`, `reviewStatus`

## Difficulty is NON-medical
`difficulty ∈ {not-set, beginner, intermediate, advanced}` describes **movement
complexity**, not injury severity (S10 safety rule). `not-set` is allowed for
unreviewed placeholders.

## `reviewStatus` never defaults to approved
`reviewStatus` is a required enum `{draft, in-review, approved, rejected, blocked}`.
There is no default; the data must state it. (S10 do-not-do: never default to approved.)

## Published (approved) requirements
Only `reviewStatus === "approved"` may publish. A `.refine` rule requires, for
approved exercises, non-empty `sourceTitle`, `sourceUrl`, `licenseId`,
`reviewedBy`, `reviewedAt`, `captionUrl`, `transcriptUrl`, and at least one
`stopSignals` and one `steps`. This meets the acceptance: *every published action
has source, review, license, captions/transcript, and stop signals.*

## Build gate (bad references block the build)
`lib/content.ts` parses both data files with Zod at module load AND checks
body→exercise referential integrity (throws if a body part references an unknown
exercise). Because the routes import `lib/content`, a bad schema value or a
dangling reference throws during `next build` SSG → **the build fails**.
`scripts/validate-content.ts` (`npm run validate:content`) additionally checks
duplicate ids and media-file existence for approved exercises and prints a report.

## Open (student manual work — not fabricated)
- Confirm the field set with the qualified reviewer (S11).
- Define the non-medical meaning of each difficulty label with the reviewer.
- List the per-region target exercise counts (12–18 total across 6 regions).
- `data/sample/exercises.json` is superseded by `data/exercises.json` (canonical);
  it is left in place as a sample and may be removed in a later cleanup.

# RecoverMate Source Ledger

**Status:** defined in S02. Provenance and review tracking for every exercise. All current entries are `draft`/placeholder — **none are approved** for release. Companion policy: [`ContentSafetyPolicy.md`](ContentSafetyPolicy.md), [`config/content-policy.json`](../config/content-policy.json).

## 1. Purpose
Make every action's source, license, review status, and accessibility assets traceable so that only `approved`, fully-attributed content can ship.

## 2. Required fields per exercise (approval gate)
| Field | Description | Required for `approved` |
|---|---|---|
| `sourceTitle` | Title of the source/reference | yes |
| `sourceUrl` | Canonical link to the source | yes |
| `licenseId` | License/rights identifier (see registry) | yes |
| `reviewedBy` | Qualified reviewer name/role | yes |
| `reviewedAt` | ISO date of review | yes |
| `captionUrl` | Synchronized captions file | yes |
| `transcriptUrl` | Descriptive transcript file | yes |
| `stopSignals` | Red-flag stop-signal text | yes |
| `reviewStatus` | State from the machine below | must be `approved` |

Missing any field, or `reviewStatus != approved` ⇒ build gate fails (excluded from release).

## 3. `reviewStatus` state machine
| State | Publishable? | Meaning |
|---|---|---|
| `draft` | no | created, not yet reviewed |
| `in-review` | no | under professional review |
| `approved` | **yes (only)** | reviewed and approved |
| `rejected` | no | reviewed and rejected |
| `blocked` | no | license/source/rights missing, or content unsafe |

## 4. License registry (placeholder — to be confirmed, not fabricated)
| `licenseId` | Meaning | Status |
|---|---|---|
| `self-authored` | Original work by the student, with signed talent release | to confirm (S12) |
| `cc-by-sa-4.0` | Adapted third-party media (e.g., OpenMoji) — attribution + share-alike | to confirm (S06) |
| `_unset` | No license yet | default for placeholders; **not publishable** |

Final `licenseId` values, reviewer identities, and consent records are confirmed in S06/S11/S12.

## 4a. Site artwork (redesign, 2026-08-17; swapped 2026-09-01; swapped 2026-09-05 to AI-generated v3)

| Asset | Source | License | Notes |
|---|---|---|---|
| `public/anatomy/muscle-chart-v4-front.webp` + `public/anatomy/muscle-chart-v4-back.webp` | AI-generated color-coded muscle chart (anterior + posterior), generated at the project owner's direction and supplied by the owner 2026-09-05 as `人体图3.png` (archived at `scripts/art-source/muscle-chart-v3-source.png`); shipped as two normalized 460×1310 crops, one centered per figure; the AI artwork carries no embedded text/labels, so no derivative cleaning was needed; v4 (same day) re-encodes the v3 crops with the flat studio background knocked out to transparent (border-connected flood fill, alpha ramp on outlines — figure pixels untouched) so the figures float on the dark theme | Owner-supplied AI-generated artwork: owner states it is AI-generated with no third-party rights claim (recorded 2026-09-05); generating tool/model not disclosed by owner — recorded as supplied, not invented | VP8 webp with alpha; rendered as the two body-map views; hotspots measured against a grid overlay of the crops (virtual 320×911 per view; unchanged by the v4 re-encode). Artwork rights resolved; anatomical accuracy of the illustration remains subject to the ordinary S11 content-review path. |
| ~~`public/anatomy/muscle-chart-v3-front.webp`~~ + ~~`-back.webp`~~ | Same AI-generated source as v4, opaque-background encoding | Superseded same-day by the transparent v4 encoding for the dark theme (historical record only) | Removed 2026-09-05 |
| ~~`public/anatomy/muscle-chart-v2.webp`~~ | `<<SOURCE_URL_TBD>>` — color-coded muscle chart (anterior + posterior in one image), supplied by the project owner 2026-09-01; v2 was a local derivative with the source's Chinese label text, pointer lines and guide lines removed (pixel inpainting, `scripts/clean-muscle-chart.mjs`; pre-cleaning original archived at `scripts/art-source/muscle-chart-original.webp`) | Superseded 2026-09-05 by the AI-generated v3 artwork before any release (historical record only; the never-resolved `<<LICENSE_TBD>>` is moot) | Removed 2026-09-05 (historical record only) |
| ~~`public/anatomy/muscles-anterior.png`~~ | "Muscles anterior labeled" — after Henry Gray, *Anatomy of the Human Body* (1918), via Wikimedia Commons ([file page](https://commons.wikimedia.org/wiki/File:Muscles_anterior_labeled.png)) | Public domain (US; published pre-1929) | Removed 2026-09-01 when the body map switched to `muscle-chart.webp` (historical record only) |
| ~~`public/anatomy/muscles-posterior.png`~~ | "Muscle posterior labeled" — after Henry Gray, *Anatomy of the Human Body* (1918), via Wikimedia Commons ([file page](https://commons.wikimedia.org/wiki/File:Muscle_posterior_labeled.png)) | Public domain (US; published pre-1929) | Removed 2026-09-01 (historical record only) |

Attribution appears on-site: home footer + map figure captions point at this
section ("provenance & license: docs/SourceLedger.md §4a") instead of naming a
license the ledger does not yet hold. The former self-authored stick-figure
SVGs (`public/body-front.svg`, `public/body-back.svg`, S06/S07) were removed
when the map switched to the Gray plates; S06 original-work proof requirement
(DC-2) no longer applies to site artwork. Font: Manrope only, self-hosted via
`next/font` (SIL OFL) — Fraunces dropped in the 2026-09-05 dark restyle.

## 5. Ledger template
| exerciseId | sourceTitle | sourceUrl | licenseId | reviewedBy | reviewedAt | captions | transcript | stopSignals | reviewStatus |
|---|---|---|---|---|---|---|---|---|---|

## 6. Current entries
| exerciseId | reviewStatus | Notes |
|---|---|---|
| `ankle-pilot-placeholder` | `draft` | Placeholder only; all source/license/review fields empty; `[professional-review-required]`. **Not publishable.** |

No exercise is `approved` yet. The build gate (S10/S11) will reject a release that contains anything but `approved` rows.

## 7. S11 status (source ledger + professional review) — BLOCKED
- Candidate selection (2–3 per region, 12–18 total) and real source/license
  entries are PENDING the student + a qualified reviewer. They are NOT
  fabricated here.
- No reviewer is named yet (DC-3) ⇒ no sign-off can be recorded (see
  [`ContentReviewLog.md`](ContentReviewLog.md)). No item is `approved`.
- Current entries: still only the `ankle-pilot-placeholder` draft (§6).
- To unblock: name a reviewer (DC-3); the student records real, licensable
  sources here and in `source-ledger-S11.csv`; the reviewer signs off per item;
  then `reviewStatus: "approved"` may be set (the build gate enforces full
  provenance + accessibility on approved rows).

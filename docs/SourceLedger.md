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

## 4a. Site artwork (redesign, 2026-08-17)

| Asset | Source | License | Notes |
|---|---|---|---|
| `public/anatomy/muscles-anterior.png` | "Muscles anterior labeled" — after Henry Gray, *Anatomy of the Human Body* (1918), via Wikimedia Commons ([file page](https://commons.wikimedia.org/wiki/File:Muscles_anterior_labeled.png)) | Public domain (US; published pre-1929) | 760px display version resized locally from the Commons original (1156×1342); labels intact |
| `public/anatomy/muscles-posterior.png` | "Muscle posterior labeled" — after Henry Gray, *Anatomy of the Human Body* (1918), via Wikimedia Commons ([file page](https://commons.wikimedia.org/wiki/File:Muscle_posterior_labeled.png)) | Public domain (US; published pre-1929) | 760px display version resized locally from the Commons original (1063×1297) |

Attribution appears on-site: home footer + map figure captions ("Gray's
Anatomy (1918), public domain"). The former self-authored stick-figure SVGs
(`public/body-front.svg`, `public/body-back.svg`, S06/S07) were removed when
the map switched to these plates; S06 original-work proof requirement (DC-2)
no longer applies to site artwork. Fonts (Fraunces, Manrope) are self-hosted
via `next/font` (SIL OFL).

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

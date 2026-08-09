# RecoverMate UX Blueprint (v1, S04)

**Status:** v1, designed in S04. This is a structural blueprint — **no large-scale visual polish yet** (deferred). No accounts, social, or diagnosis flows. Safety prompt appears **before** an action starts and must not reduce readability. Companion: [`StateModel.md`](StateModel.md), [`Architecture.md`](Architecture.md). Flow diagram: [`ux-flow-S04.png`](ux-flow-S04.png).

## 1. Seven-step experience → pages & states
| # | Experience | Page / Route | State(s) | Key rule |
|---|---|---|---|---|
| 1 | Land & orient | Home `/` | `bodyMap.view`, hover/focus | front + back selectable |
| 2 | Switch front/back | Home `/` | `bodyMap.view` toggle | **clear control**; not color-only |
| 3 | Select region (hotspot) | → `/body/[part]` | `selectedRegion` | tap / click / keyboard; **not hover-only** |
| 4 | Browse action cards | `/body/[part]` | region cards | preview, name, duration, difficulty, muscles |
| 5 | Open action detail | `/exercise/[id]` | detail + safety prompt | **safety prompt BEFORE action**; non-conflicting |
| 6 | Run timer | `/exercise/[id]` | `timer: running/paused/completed` | pause/resume; reduced-motion |
| 7 | Complete & return | `/exercise/[id]` → back | completion | explicit return path |

All seven steps map to a page and a state (acceptance). Routes: `/`, `/body/[part]`, `/exercise/[id]`, optional `/flow/[sport]` (enhancement).

## 2. Front/back view switch (clear control)
- A dedicated, labeled control (e.g., "Front / Back" toggle/segmented control) on Home, with an accessible name and visible focus.
- State is reflected in the URL (deep-linkable) and announced to assistive tech.
- The control's state is conveyed by **text/position/icon, not color alone**.

## 3. Responsive breakpoints (mobile-first, no horizontal scroll)
| Breakpoint | Width | Layout |
|---|---|---|
| base (mobile) | < 640px | single column; stacked body map + cards; full-width timer; **no horizontal scroll** |
| sm | ≥ 640px | 2-column cards |
| md | ≥ 768px | larger body map; side detail |
| lg | ≥ 1024px | desktop multi-column |

Rules: use relative/fluid widths and `max-width: 100vw` guards; no fixed pixel widths that exceed the viewport; the SVG body map scales to its container. The mobile path requires **no horizontal scrolling**.

## 4. Loading / empty / error states
- **loading:** skeletons for body map tiles, cards, and media (not spinners-only).
- **empty:** a region with no `approved` actions shows "No reviewed guidance yet" + a return path (draft content is never shown).
- **error:** missing exercise, bad route, or media failure shows a friendly message + retry / return-home.

## 5. Input parity (keyboard + touch)
- Every action reachable by keyboard and touch; **hover is an enhancement only** — no hover-dependent pathways (acceptance: confirm not hover-dependent).
- Visible focus rings; logical tab order; Esc returns/cancels.

## 6. Accessibility & visual rules
- **Color is never the sole state cue** (pair with icon/text/shape).
- Contrast meets WCAG 2.2 AA; cyber/neon visuals must not reduce readability.
- `prefers-reduced-motion` respected (ties to BR-03/BR-18).

## 7. Safety prompt placement
- The red-flag/stop-signal prompt is shown **before the action starts** (step 5), high-contrast, DOM-before-media, not obscured by overlays/particles, and **not conflicting with the primary action button** (ties to S02 `pageLevelSafetyPrompt`, implemented S15).

## 8. Optional flow mode (`/flow/[sport]`)
- Enhancement only; queue contains **only `approved`** content; user can exit at any time (ties to BR-10/OP-02).

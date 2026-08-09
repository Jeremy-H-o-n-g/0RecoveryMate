# RecoverMate State Model (v1, S04)

**Status:** v1, designed in S04. Client-side + URL state (deep-linkable); no backend. **Every state has an explicit return path.** Companion: [`UXBlueprint.md`](UXBlueprint.md), [`Architecture.md`](Architecture.md).

## 1. Core state shape (non-binding sketch)
```
view:            'front' | 'back'
selectedRegion:  RegionId | null
page:            'home' | 'region' | 'exercise' | 'flow'
cards:           Card[]            // for the selected region
detail:          Exercise | null
timer:           'idle' | 'running' | 'paused' | 'completed'
ui:              'ready' | 'loading' | 'empty' | 'error'
```

## 2. States and return paths
| State | Entry | Return path |
|---|---|---|
| home / bodyMap | app load, or "back to home" | root — header Home + logo always reachable |
| region `/body/[part]` | select a hotspot | back to `/` (header back + browser back) |
| exercise `/exercise/[id]` | open a card | back to `/body/[part]` |
| timer.running | start timer | cancel → exercise detail |
| timer.completed | timer ends | return to region or home |
| loading | navigation / media loading | cancel/back to previous |
| empty | region has no `approved` actions | back to region/home |
| error | route missing / media fail | retry, or back to home |

Acceptance: **every state has a return path** — verified above. The global header Home/back control and browser back are always available; safety prompts never block the return path.

## 3. Transition flow (mirrors `ux-flow-S04.png`)
```
home (/)  ──view toggle──►  home
   │ select region
   ▼
region (/body/[part])  ◄──back── exercise (/exercise/[id])
   │ open card                       │ start timer
   ▼                                 ▼
exercise ──► timer.running ──► timer.completed ──► return (region/home)
                                   │ cancel
                                   ▼
                              exercise detail
```

## 4. Auxiliary states
- **loading / empty / error** each carry their own return path (see table) and never trap the user.
- **safety prompt** is part of the exercise-detail view, rendered before the action; it does not conflict with the primary action or the return control.

## 5. Notes
- State persists in the URL so deep-link refresh works (ties to the vertical-slice completion definition).
- No accounts, no server-side session, no production analytics.

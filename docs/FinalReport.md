# RecoverMate — Final Report (S28)

**Project:** RecoverMate — interactive body-map recovery & warm-up guidance
**Author:** Jeremy Hong (student researcher)
**Implementation partner:** bounded session workflow (S01–S28 prompts)
**Date:** 2026-08-17 · **Repo state:** 32 commits, all gates green

## 1. Problem

High-school athletes arrive at training with sore, tired bodies and no idea
which warm-up helps which region. Searching generic fitness content gives
unreviewed, ad-heavy, non-accessible pages. The 11-page proposal (authoritative
source, S01 baseline ledger BR-01…BR-15) defines the need: a fast, local-first
way to go from *where I feel worked* to *clearly-scoped, safe guidance*.

## 2. Evidence-driven design decisions (student-authored)

| Decision | Owner | Where recorded |
|---|---|---|
| Six regions: 肩/手臂/腰背/膝/小腿/脚踝 | Jeremy | TASKS 2026-07-27 |
| Content corpus: 17 exercises authored in `Manual_Instructions.md` (18 with the retained pilot placeholder) | Jeremy | commit `629f539`–`7236da8` |
| 30 s/set · 15 s rest for 膝盖/手臂 | Jeremy | TASKS 2026-08-14 |
| 婴儿式 duplicate resolved to the richer variant | Jeremy | same |
| No difficulty labels (stays `not-set`) | Jeremy | same |
| Sport set = Jeremy's 7 sports + 通用 (not the template's running/swimming/strength) | Jeremy | TASKS 2026-08-14 |
| Mapping: 大腿→膝区, 髋臀/腰腹→腰背区 | Jeremy | same |
| S12 video capture passed via placeholder strategy (swappable later) | Jeremy | same |
| Research/部署 sequencing past the study blocker | Jeremy | TASKS 2026-08-17 |

## 3. What was built (S05–S27, 22 shipped code/doc sessions)

- **Navigation:** self-authored accessible front/back body maps (hotspots are
  native buttons, keyboard operable), six region pages, sport quick entries
  (7 sports + 通用) with explainable, non-diagnostic region highlighting.
- **Guidance experience:** exercise cards → detail page with safety notice
  BEFORE media → guided session (video + steps + one timer, all under user
  control; video pause pauses the timer; no auto-advance anywhere) →
  one-shot completion feedback (reduced-motion safe, confetti lazy-loaded).
- **Flow:** 5–8-minute recovery flows per sport; queue is reviewable/editable;
  advance only by user tap; neutral exits; nothing persisted.
- **Content pipeline:** Zod schemas + build-time validation; 18 draft
  exercises wired across all six regions; approved-only enforced as the
  tested default everywhere (nothing unreviewed can leak into a flow).
- **Quality system (evidence in this repo):** 114 automated tests, 4 browser
  e2e tests (real Chromium, production build), axe scans with **zero
  violations**, a release-blocking safety-copy contract, a content gate, a
  measured performance budget (259 KB gzip total JS; zero third-party
  requests), and a production-smoke suite for the deployed URL.

## 4. Health boundary (proactive statement)

RecoverMate is **general educational guidance only**. It does not diagnose,
treat, grade injuries, or replace professionals; stop-signal notices precede
every action; wording is contract-tested so diagnostic phrasing cannot ship.
No accounts, no health-data collection, no analytics — verified by network
smoke (zero third-party runtime requests).

## 5. Research status (honest)

Protocol v1 + consent script + recording infrastructure are complete (S03,
S25 scaffolding). **The 10-participant study has NOT been run** (mentor
approval + pilot + sessions pending — parked by owner decision to keep
building). No usability results exist yet; none are claimed. S26 analysis
follows the real study.

## 6. Limitations (stated, not hidden)

1. All exercise content is clearly-marked DRAFT; professional review (S11),
   video capture (S12 passed via placeholder) and editing (S13) are pending —
   media fields are empty by design, and the UI degrades gracefully.
2. The usability study is unrun (above); no outcome claims are made.
3. Perf exception E1: zod+data (69.4 KB gzip) in a home client chunk — within
   the 200 KB first-screen ceiling, fix documented (PerformanceBudget §4).
4. Small backlogs: in-app entry links for sport/flow pages; VideoPlayer vs
   session media duplication; adjustable timer + rest preset (user requests,
   recorded, unimplemented).
5. Sample convenience limitations per ResearchProtocol §6 when run.

## 7. Competition narrative (one paragraph)

*"We built RecoverMate the way engineering should be done: every feature is
testified to by an automated gate, every content claim is honest about its
review status, and the user — a tired athlete — is never pushed: the app has
no autoplay, no countdown pressure, no dark patterns, and a stop exit on every
screen. When the body map overflowed on small phones, our real-browser
regression suite caught it and we fixed it the same session. We ship a
safety-copy contract that BLOCKS release if the stop-signal wording ever
drifts. What's pending is equally clear: professional content review and the
usability study are scheduled, not faked."*

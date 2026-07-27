# RecoverMate Project Plan

**Authoritative baseline:** Jeremy Hong's RecoverMate proposal
(`resources/RecoverMate_Project_Plan_and_Feasibility.pdf`, 2026-07-27).
Full requirements ledger: [`baseline-ledger.md`](baseline-ledger.md).
Traceability matrix: [`Traceability.md`](Traceability.md).

## Problem (prop. p.2)
高中生运动后希望快速找到与酸痛部位相关的一般性恢复/热身指导。An interactive body
map connects a body region to reviewed guidance more intuitively than a menu.

## Scope layers (prop. §3, p.3–4)
**Core / Mandatory (M-01…M-06):** interactive front+back body SVG; six regions
(shoulder, arm, lower back, knee, calf, ankle); hover/focus/tap selection on
desktop + mobile; 2–3 reviewed exercises per region with cards (preview, name,
duration, difficulty, muscles); exercise detail (video, steps, timer,
pause/resume, completion); cyber-sport visual, glass cards, completion feedback,
responsive; pure-static data/media, Vercel deploy, 10-student formative study.

**Refinements — required engineering (RF-01…RF-05):** publish content with
source, license, review status, reviewer, review date, stop signals, captions,
transcript; keep Next.js App Router on a supported patched LTS (not locked to
v14); Zod build-time validation, automated tests, WCAG 2.2 AA checks,
prefers-reduced-motion; upgrade the 10-person test to a formative comparison
(body map vs simplified list, AB/BA); keep one offline ankle slice.

**Optional — non-blocking (OP-01…OP-03):** six sport quick-entries (running,
basketball, swimming, strength, soccer, general); 5–8 min recovery flow queue;
cloud object storage only after free-tier/CORS/license checks.

**Out of scope (XS-01…XS-04):** diagnosis, treatment prescriptions, pain
grading, individualized medical advice; accounts, social, comments, health
records, individual recommendation models, production database; unapproved
upload/CMS (use reviewed Git+JSON); claiming medical effectiveness or
statistical representativeness from the 10-person study.

## Smallest complete vertical slice (prop. §4, p.4)
Ankle hotspot → 1 reviewed action card → detail (video + steps) → timer
(pause/resume) → completion → return. Desktop + mobile usable; deep-link refresh
works; safety prompt, captions, transcript, and offline media included.
**No backend required** (static-first). Defined in S01; implemented in S09.

## Tech baseline (prop. §6, p.6)
Static-first Next.js App Router + TypeScript + Tailwind + Framer Motion + SVG +
Vercel. New repository uses Next.js 16.2.11 Active LTS + Node.js 24 LTS.
Versions pinned in S05. Environment check `scripts/check-environment.mjs` passes
on Node v24.18.0.

## Decisions to confirm (prop. §10)
Six regions (S01, confirmed); SVG self-drawn (S06); professional reviewer (S11);
video talent consent (S12); media hosting (S13/S24); production analytics off
(S25/S27). Detail in [`baseline-ledger.md`](baseline-ledger.md) §7.

## Release gates (prop. §11)
BR-01…BR-15 all have passing evidence; lint/typecheck/unit/E2E/a11y/
content-validation/prod-build pass; all published content reviewed with
license/consent; captions + transcripts; keyboard-complete core path + reduced
motion; anonymized reproducible research with stated limits; smoke + offline +
rollback rehearsed; demo leaks no raw data, consent forms, keys, or local paths.

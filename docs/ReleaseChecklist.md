# RecoverMate Release Checklist (S27)

**Status: v1. Sign-offs: implementation-partner gates verified below;
**student sign-offs are the ☐ boxes.** A release = every box checked or
explicitly waived with a reason (never silently).

## Release identity

- Release commit: `_______` (main branch)
- Production URL: `_______`
- Deployed at (date/time): `_______`
- Previous stable deployment (rollback target): `_______`

## Automated gates (partner-verified, re-run before promoting)

| gate | command | status |
|---|---|---|
| Content validation | `npm run validate:content` | ☐ exit 0 |
| Safety-copy contract | `npm run check:safety` | ☐ exit 0 (release-blocking) |
| Unit/integration | `npm run test` | ☐ 14 files / 114 tests pass |
| Browser e2e (local prod build) | `npm run test:e2e` | ☐ 4 pass |
| Accessibility (axe) | `npm run test:a11y` | ☐ 7 pass, zero violations |
| Build | `npm run build` | ☐ exit 0 |
| Lint / types | `npm run lint` / `typecheck` | ☐ exit 0 |
| Production smoke (live URL) | `PRODUCTION_SMOKE_URL=… npm run test:smoke` | ☐ 3 pass |

## Safety & content truthfulness

- ☐ All shipped exercise content is DRAFT and visibly marked (placeholder
  banners render in production — asserted by smoke).
- ☐ No content claims professional review (S11 reviewer auth still pending).
- ☐ Safety notice renders before media/session on exercise pages (e2e-asserted).
- ☐ Safety-copy contract green (`check:safety`) — stop signals cannot drift.

## Privacy & logs

- ☐ No analytics / no third-party runtime requests (smoke-asserted; grep: zero
  fetch/console in app code).
- ☐ Production URLs carry no health data (only `?done=1`) — 日志不记录部位选择.
- ☐ Raw research data / consent forms NOT uploaded (`data/research/raw/` is
  gitignored; nothing to deploy). 不上传原始同意书或研究原始数据.
- ☐ No secrets in repo/client (`.env.example` documents: none required).

## Manual student checks (cannot be fabricated)

- ☐ Production URL tested on real network + real phone (home → region →
  detail → done; flow) — record in `production-smoke-S27.pdf`.
- ☐ 404 / error states spot-checked on production.
- ☐ Rollback REHEARSED per `docs/RecoveryGuide.md` §D; `rollback-S27.mp4` saved.
- ☐ No sensitive logs visible in Vercel dashboard (functions/logs review).
- ☐ Local demo copy verified on the presentation machine (`docs/OfflineDemo.md`).

## Known limitations shipped (transparent, from TASKS.md)

- Content is placeholder-draft (S11/S12/S13/S25/S26 parked per user
  directions); media fields empty by design.
- Perf exception E1 (zod+data in a client chunk, 69.4 KB gzip) documented in
  `docs/PerformanceBudget.md` §4 — within ceiling, fix planned.
- No research results included (study not yet run).

## Incident log (append on any post-release issue)

| date | what | action taken | rollback needed? |
|---|---|---|---|
| | | | |

## Sign-off

- Implementation partner gates: verified this session (see `docs/release-S27.txt`).
- Student/owner release approval: _______________ (date: _______)
- Mentor (if required by the program): _______________ (date: _______)

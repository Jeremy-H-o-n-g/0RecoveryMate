# RecoverMate Test Plan

- Unit: schema, timer math/state, queue, content queries.
- Component: body hotspots, switcher, card, player, timer, feedback.
- Integration: body -> card -> detail; media -> timer -> completion.
- E2E: ankle vertical slice, invalid routes, sport flow, media failure.
- Accessibility: keyboard, focus, WCAG scan, reduced motion, captions/transcripts.
- Content: source, review, license, asset existence, captions/transcripts, file budget.
- Operations: production smoke, deep links, offline demo, rollback.

## S23 release-regression commands (established 2026-08-17)

| Gate | Command | What it enforces |
|---|---|---|
| Content | `npm run validate:content` | Zod schemas, unique ids, body→exercise referential integrity, media existence for approved entries |
| Safety copy | `npm run check:safety` | Contract test: stop signals/red-flag list present in components before media; non-diagnostic wording (banned-regex scan of shipped data + components); safety copy cannot silently disappear in a content update — **fails the release** |
| Unit/integration | `npm test` | vitest (jsdom + node); `tests/browser/**` excluded — Playwright owns those |
| Browser E2E | `npm run test:e2e` | Playwright vs production build: core path (home→region→detail→finish + back), keyboard-only body map, **no horizontal scroll at 375px**, 404s, flow never auto-advances |
| Accessibility | `npm run test:a11y` | axe (wcag2a/2aa/21a/21aa) on 6 core routes; serious/critical = failure; writes `docs/a11y-report-S23.html` |
| Build | `npm run build` | all routes; 8 `/flow/[sport]` SSG |

Playwright config: `playwright.config.ts` (port 3100, `next start` webServer, projects `e2e` + `a11y`).

Evidence from the establishing run: `docs/test-summary-S23.html`, `docs/a11y-report-S23.html`, `docs/defect-log-S23.csv` (includes the real defect the browser suite caught: fixed-width body map overflowed 375px — fixed + regression-tested).

Known non-automated (student manual work, pending): keyboard walkthrough, screen-reader sampling, color-blind/high-contrast simulation. Automated scans complement, never replace, human checks (S23 do-not-do).

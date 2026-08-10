# TASKS.md - RecoverMate

## Project Goal
Build a competition-ready static web app that uses an interactive body map to connect six body regions to professionally reviewed, accessible recovery/warm-up guidance while preserving Jeremy Hong's authoritative proposal.

## Global Rules
- General educational guidance only: no diagnosis, treatment, individualized medical advice, or outcome guarantees.
- Publish only `approved` content with source, license, reviewer, review date, captions, transcript, and stop signals.
- Keep the architecture static-first; no accounts, production health data, public uploads, or database in this release.
- Secrets stay in environment variables; samples are synthetic/anonymized.
- Preserve failed evidence, limitations, and student manual work; never fabricate approval, media, testing, or research.

## Current Unit
Unit code: S09
Unit title: 脚踝垂直切片验收
Unit focus: Connect BodyMap → part page → one action card → action detail → placeholder timer → completion into a no-backend end-to-end ankle loop.
Current prompt: `prompts/S09-Ankle-Vertical-Slice.md`
Prior-state requirement: S08 data and route contract passed; one usable reviewed placeholder content available.
Status: **Activated — not yet started.** Do not implement until S09 is opened. Note: prior-state "one reviewed placeholder content" conflicts with the current all-draft content (no `approved` content until S11) and the E2E test implies Playwright (not installed) — resolve when opening S09.

## Acceptance Criteria for Current Unit
- The five-step slice has no break points.
- All placeholders are clearly marked and cannot be mistaken for medical content.
- Refresh and direct (deep-link) URL both work.

## Completed Units
- [x] S01 - 基线台账与完整垂直切片
- [x] S02 - 健康边界与内容证据协议
- [x] S03 - 形成性研究设计与成功指标
- [x] S04 - 信息架构、用户旅程与界面蓝图
- [x] S05 - 仓库初始化、版本锁定与设计令牌
- [x] S06 - 前视人体 SVG 与语义热点
- [x] S07 - 后视人体图、切换与触控/键盘兼容
- [x] S08 - BodyMap 状态、数据契约与路由
- [ ] S09 - 脚踝垂直切片验收
- [ ] S10 - 动作内容 Schema 与构建时校验
- [ ] S11 - 来源台账、专业审核与内容锁定
- [ ] S12 - 拍摄规范、分镜与首条视频采集
- [ ] S13 - 视频编辑、字幕、转录与媒体优化
- [ ] S14 - 动作卡片、筛选与渐进呈现
- [ ] S15 - 动作详情路由与可访问视频播放器
- [ ] S16 - 环形计时器状态机与数学验证
- [ ] S17 - 分步指引、播放器与计时同步
- [ ] S18 - 完成反馈、粒子效果与减少动画
- [ ] S19 - 响应式集成、错误状态与第一轮回归
- [ ] S20 - 六部位与 12–18 条动作内容集成
- [ ] S21 - 运动类型快捷入口与部位高亮
- [ ] S22 - 运动恢复流程队列与用户控制
- [ ] S23 - 自动化、可访问性与安全回归
- [ ] S24 - 性能、媒体预算与离线演示回退
- [ ] S25 - 10 人可用性研究执行
- [ ] S26 - 研究分析、证据化迭代与限制
- [ ] S27 - Vercel 部署、烟雾测试与回滚
- [ ] S28 - 报告、演示、竞赛叙事与答辩

## Decisions
- 2026-07-27: Preserve the Next.js App Router architecture; use a currently supported patched LTS line for a new repository.
- 2026-07-27: Default six regions are shoulder, arm, lower back, knee, calf, and ankle.
- 2026-07-27: Public upload/CMS is outside the current baseline; content updates use reviewed Git/JSON changes.
- 2026-07-27 (S01): Requirements ledger at `docs/baseline-ledger.md`; BR-01..BR-15 verified; authoritative source = 11-page proposal PDF.
- 2026-07-27 (S02): Content policy v1 in `config/content-policy.json` (reviewStatus machine; only `approved` publishable) and `docs/ContentSafetyPolicy.md`; `docs/SourceLedger.md`; no fabricated endorsements.
- 2026-08-09 (S03): Formative usability protocol v1 in `docs/ResearchProtocol.md` (AB/BA, 5 per order; descriptive only; stop-at-any-time).
- 2026-08-09 (S04): UX blueprint `docs/UXBlueprint.md` (seven-step → pages/routes/states; mobile no-scroll; safety before action; not hover-dependent; color not sole cue); state model `docs/StateModel.md`; `docs/ux-flow-S04.png`.
- 2026-08-09 (S05): Next.js App Router project at repo root (genuine lockfile); versions in `setup-versions.txt`; four quality scripts pass; design tokens cover background/text/focus/accent/reduced-motion.
- 2026-08-10 (S06): Front body SVG + `BodyPart`/`BodyMapFront` (accessible `<button>` hotspots) + `tests/body-map-front.test.tsx`; component testing set up (jsdom + Testing Library + user-event).
- 2026-08-10 (S07): Back body SVG + `BodyMapBack` (incl. lower-back) + `BodyMapSwitcher` (front/back toggle, aria-pressed, aria-live, focus retention) + `tests/body-map-switcher.test.tsx`.
- 2026-08-10 (S08): Type-safe data contract — `schemas/body-part.ts` (Zod `BodyPartSchema`; `BodyPart = z.infer`, re-exported via `types/content.ts`), `data/body-parts.json` (6 regions; svgIds cross-checked against real hotspot ids), `lib/content.ts` (server-only query fns; excludes unreviewed exercises), `app/body/[part]/page.tsx` (static server route; `notFound()` on invalid → safe 404). Build generates `/body/[part]` SSG (6 pages).
- 2026-08-10 (S08): `tests/body-part-data.test.ts` added (schema parse, 6 unique ids, svgId integrity, valid/invalid query, unreviewed-exclusion) — scope addition justified by the required schema/route tests.

## Known Issues
- Exact qualified content reviewer is not yet named.
- SVG is self-authored (DC-2): student should save original-work proof + mentor confirmation (pending).
- Media hosting remains local-first until the performance budget is measured.
- Authoritative proposal PDF is 11 pages (canonical).
- S01 ledger review and S02 policy wording were performed by the implementation partner; student/mentor sign-off and professional review (S11) pending.
- S02 refusal test is a defined contract (not live); enforcement pending S10/S11; page-level safety prompt in S15.
- S03 study execution pending (10 volunteers + consent, mentor task-wording review, pilot run).
- S04 screens not yet hand-drawn/Figma'd; mentor info-priority review pending.
- S05 `homepage-S05.png` pending (no headless browser). Production analytics remain off.
- S06/S07 PNGs are SVG rasterizations (cairosvg), not interactive-component screenshots. S07 `mobile-touch-S07.mp4` pending (real device).
- S08: hotspot-click → `/body/[id]` navigation wiring is pending until the body map is mounted on a page (S09 mounts `app/page.tsx`). `route-evidence-S08.png` deferred (no browser). Exercises are still the draft sample (formal exercise schema + content gate is S10/S11).
- S09 prior-state wants "one usable reviewed placeholder content", but all content is currently `draft` (no `approved` content until S11) — a decision/blocker to resolve when opening S09. S09's E2E test implies Playwright (not yet installed).

## Last Test Evidence
- Automated: `node scripts/check-environment.mjs` → exit 0. **S08:** `npm run lint` exit 0; `npm run typecheck` exit 0; `npm run test` 4 files / 18 tests passed exit 0 (sanity 1 + body-map-front 5 + body-map-switcher 7 + body-part-data 5); `npm run build` Next 16.3.0, routes `/`, `/_not-found`, and `/body/[part]` SSG (6 pages), exit 0 → **all four PASS** (see `docs/schema-report-S08.txt`).
- Manual: S01–S05 drafted/executed by implementation partner (sign-offs/reviews pending). S06/S07/S08 components + tests written by implementation partner; student manual work pending (real-device tests, original-work proof, metadata/svgId verification on real data).
- Content/media: Not started.
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: ankle vertical slice to be implemented/verified in S09. App shell + body maps + switcher + data/route contract done with tests (S05–S08); homepage body-map mounting + exercise detail still pending (S09).

## S01 Completion Notes (completed 2026-07-27)
- Checkpoints: `dc9c0d6` → `3717579` → `d69336a`.

## S02 Completion Notes (completed 2026-08-09)
- Checkpoints: pre-S02 `d69336a`; complete `99b410d`.

## S03 Completion Notes (completed 2026-08-09)
- Checkpoints: pre-S03 `99b410d`; complete `7d51f58`.

## S04 Completion Notes (completed 2026-08-09)
- Checkpoints: pre-S04 `7d51f58`; complete `e44248d`.

## S05 Completion Notes (completed 2026-08-09)
- Checkpoints: pre-S05 `2deec09`; complete `c2e4431`.

## S06 Completion Notes (completed 2026-08-10)
- Checkpoints: pre-S06 `c2e4431`; WIP `682d828`; complete `42be299`.

## S07 Completion Notes (completed 2026-08-10)
- Checkpoints: pre-S07 `42be299`; complete `ca0b543`.

## S08 Completion Notes (completed 2026-08-10)
- **Deliverables:** `types/content.ts`, `schemas/body-part.ts`, `data/body-parts.json`, `lib/content.ts`, `app/body/[part]/page.tsx`, `tests/body-part-data.test.ts`; evidence `docs/schema-report-S08.txt`.
- **Acceptance:** (1) six region ids unique — MET; (2) invalid URL → safe error page — MET (`notFound()` → 404; verified via `getBodyPart(invalid) === null`); (3) routes do not depend on client-only state — MET (server component, params + server module).
- **Verification:** lint/typecheck/build exit 0; test 4 files / 18 tests passed → ALL CHECKS PASS (`docs/schema-report-S08.txt`).
- **Changed files (S08):** `types/content.ts`, `schemas/body-part.ts`, `data/body-parts.json`, `lib/content.ts`, `app/body/[part]/page.tsx`, `tests/body-part-data.test.ts`, `docs/schema-report-S08.txt`, `TASKS.md`.
- **Honest scope note:** data contract + route authored by implementation partner; `route-evidence-S08.png` deferred (no browser); exercises still draft sample; hotspot→route wiring pending S09. `tests/body-part-data.test.ts` was added beyond the literal scope list because the required schema/route tests need it.
- **Checkpoints:** pre-S08 `ca0b543`; S08 complete (this commit).

## Next Unit
- S10 - 动作内容 Schema 与构建时校验; exercise content schema and build-time validation only. (S09 is now the active unit; do not implement S09 or S10 until opened.)

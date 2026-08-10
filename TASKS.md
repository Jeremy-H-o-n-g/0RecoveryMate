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
Unit code: S07
Unit title: 后视人体图、切换与触控/键盘兼容
Unit focus: Build the back-view body map and implement front/back switching, clear L/R direction markers, and consistent pointer+keyboard interaction with focus retention.
Current prompt: `prompts/S07-Back-Body-and-Input-Compatibility.md`
Prior-state requirement: front-view hotspot tests pass; shared BodyPart API is stable.
Status: **Activated — not yet started.** Do not implement until S07 is opened.

## Acceptance Criteria for Current Unit
- The front/back state is recognizable by assistive technology.
- All regions are reachable in at least one view.
- Switching does not lose page context.

## Completed Units
- [x] S01 - 基线台账与完整垂直切片
- [x] S02 - 健康边界与内容证据协议
- [x] S03 - 形成性研究设计与成功指标
- [x] S04 - 信息架构、用户旅程与界面蓝图
- [x] S05 - 仓库初始化、版本锁定与设计令牌
- [x] S06 - 前视人体 SVG 与语义热点
- [ ] S07 - 后视人体图、切换与触控/键盘兼容
- [ ] S08 - BodyMap 状态、数据契约与路由
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
- 2026-07-27 (S02): Content policy v1 in `config/content-policy.json` (reviewStatus machine; only `approved` publishable) and `docs/ContentSafetyPolicy.md`; `docs/SourceLedger.md` created; no fabricated endorsements.
- 2026-08-09 (S03): Formative usability protocol v1 in `docs/ResearchProtocol.md` (AB/BA, 5 per order; descriptive only; stop-at-any-time); anonymized record table; `docs/ConsentScript.md`; pilot template.
- 2026-08-09 (S04): UX blueprint `docs/UXBlueprint.md` (seven-step → pages/routes/states; mobile no-scroll; safety before action; not hover-dependent; color not sole cue); state model `docs/StateModel.md`; `docs/Architecture.md` enhanced; `docs/ux-flow-S04.png`.
- 2026-08-09 (S05): Next.js App Router project at repo root (genuine lockfile). Versions (`setup-versions.txt`): next 16.3.0, react 19.2.8, typescript 5.9.3, tailwindcss 4.3.3, eslint 9.39.5, vitest 4.1.10, framer-motion 13.0.0, zod 4.4.3. Four quality scripts pass.
- 2026-08-09 (S05): Design tokens in `app/globals.css` cover background/surface/foreground/muted/focus/accent/accent-2/border/motion-scale + prefers-reduced-motion.
- 2026-08-10 (S06): Front-view body SVG at `public/body-front.svg` — original, self-authored, non-diagnostic (license self-authored; honors "no unknown-source SVG"). `components/BodyPart.tsx` = accessible `<button>` hotspot (Tab + Enter/Space, aria-label, 44x44 min touch). `components/BodyMapFront.tsx` = 10 front hotspots (shoulder/arm/knee/calf/ankle × L/R) + `rectsOverlap`.
- 2026-08-10 (S06): Component testing set up — `vitest.config.ts` includes `tests/**.tsx`; devDeps jsdom@^30, @testing-library/react@^16.3.2, @testing-library/dom@^10.4.1, @testing-library/user-event@^14.6.3. Tests verify 44x44 touch target, no overlap, aria-labels, and Enter/Space activation (with explicit `afterEach(cleanup)` since vitest globals are off).

## Known Issues
- Exact qualified content reviewer is not yet named.
- SVG is self-authored for S06 (DC-2): student should still save the Figma/original-work process as proof and confirm acceptability with the mentor (pending).
- Media hosting remains local-first until the performance budget is measured.
- Authoritative proposal PDF is 11 pages (canonical).
- S01 ledger review and S02 policy wording were performed by the implementation partner; student/mentor sign-off and professional review (S11) pending.
- S02 refusal test is a defined contract (not live); enforcement pending S10/S11; page-level safety prompt in S15.
- S03 study execution pending (10 volunteers + consent, mentor task-wording review, pilot run).
- S04 screens not yet hand-drawn/Figma'd; mentor info-priority review pending.
- S05 `homepage-S05.png` evidence pending (needs headless browser; not fabricated). Next telemetry is anonymous dev usage stats, not end-user tracking; production analytics remain off.
- S06 components are NOT yet mounted on a route (wiring is S08), so the production build still serves the S05 placeholder homepage. `docs/body-front-S06.png` is a rasterization of the SVG (not an interactive-component screenshot; that needs a browser).

## Last Test Evidence
- Automated: `node scripts/check-environment.mjs` → exit 0. **S06:** `npm run lint` exit 0; `npm run typecheck` exit 0; `npm run test` 2 files / 6 tests passed exit 0 (sanity + `tests/body-map-front.test.tsx`: touch-target 44x44, no overlap, unique ids/labels, aria-label per button, Enter/Space activation); `npm run build` Next 16.3.0, 2 static routes, exit 0 → **all four PASS** (see `docs/test-report-S06.txt`).
- Manual: S01–S05 drafted/executed by implementation partner (sign-offs/reviews pending as noted). S06 components + tests written by implementation partner; student manual work pending (verify hotspot positions, real-device test, original-work proof for the SVG).
- Content/media: Not started.
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: Vertical slice defined (`docs/baseline-ledger.md` §5); not implemented (S09). App shell builds (S05); front body map components + tests done (S06), not yet routed (S08).

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
- **Deliverables:** `public/body-front.svg` (original, self-authored), `components/BodyPart.tsx`, `components/BodyMapFront.tsx`, `tests/body-map-front.test.tsx`; `vitest.config.ts` (include `tests/**.tsx`); devDeps jsdom + Testing Library + user-event; evidence `docs/svg-license-S06.md`, `docs/test-report-S06.txt`, `docs/body-front-S06.png`.
- **Acceptance:** (1) all planned hotspots keyboard-activatable — MET (Enter/Space test); (2) no hotspot overlap — MET (geometry test); (3) license traceable — MET (`docs/svg-license-S06.md`, self-authored).
- **Verification:** lint/typecheck/build exit 0; test 2 files / 6 tests passed → ALL CHECKS PASS (`docs/test-report-S06.txt`).
- **Changed files (S06):** `public/body-front.svg`, `components/BodyPart.tsx`, `components/BodyMapFront.tsx`, `tests/body-map-front.test.tsx`, `vitest.config.ts`, `package.json`, `package-lock.json`, `docs/svg-license-S06.md`, `docs/test-report-S06.txt`, `docs/body-front-S06.png`, `TASKS.md`.
- **Honest scope note:** SVG + components + tests authored by the implementation partner; `body-front-S06.png` is the SVG rasterized via cairosvg (not the interactive component; no browser available). A test-isolation fix (`afterEach(cleanup)`) was applied. Components not mounted on a route yet (S08).
- **Checkpoints:** pre-S06 `c2e4431`; S06 WIP `682d828`; S06 complete (this commit).

## Next Unit
- S08 - BodyMap 状态、数据契约与路由; BodyMap state, data contract, and routes only. (S07 is now the active unit; do not implement S07 or S08 until opened.)

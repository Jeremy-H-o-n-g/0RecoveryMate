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
Unit code: S08
Unit title: BodyMap 状态、数据契约与路由
Unit focus: Connect selection/hover/focus/view/route params to a type-safe data contract; add the body-part route with empty/invalid states.
Current prompt: `prompts/S08-BodyMap-State-Data-and-Routes.md`
Prior-state requirement: S06–S07 visual hotspots and input compatibility passed.
Status: **Activated — not yet started.** Do not implement until S08 is opened.

## Acceptance Criteria for Current Unit
- The six body-region IDs are unique.
- An invalid URL shows a safe error page.
- Routes do not depend on client-only private state.

## Completed Units
- [x] S01 - 基线台账与完整垂直切片
- [x] S02 - 健康边界与内容证据协议
- [x] S03 - 形成性研究设计与成功指标
- [x] S04 - 信息架构、用户旅程与界面蓝图
- [x] S05 - 仓库初始化、版本锁定与设计令牌
- [x] S06 - 前视人体 SVG 与语义热点
- [x] S07 - 后视人体图、切换与触控/键盘兼容
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
- 2026-08-09 (S03): Formative usability protocol v1 in `docs/ResearchProtocol.md` (AB/BA, 5 per order; descriptive only; stop-at-any-time).
- 2026-08-09 (S04): UX blueprint `docs/UXBlueprint.md` (seven-step → pages/routes/states; mobile no-scroll; safety before action; not hover-dependent; color not sole cue); state model `docs/StateModel.md`; `docs/Architecture.md` enhanced; `docs/ux-flow-S04.png`.
- 2026-08-09 (S05): Next.js App Router project at repo root (genuine lockfile); versions in `setup-versions.txt` (next 16.3.0, react 19.2.8, etc.); four quality scripts pass; design tokens cover background/text/focus/accent/reduced-motion.
- 2026-08-10 (S06): Front-view body SVG `public/body-front.svg` (original, self-authored, non-diagnostic); `components/BodyPart.tsx` (accessible `<button>` hotspot, Tab+Enter/Space, aria-label, 44x44); `components/BodyMapFront.tsx` (10 front hotspots + `rectsOverlap`); component testing set up (jsdom + Testing Library + user-event).
- 2026-08-10 (S07): Back-view body SVG `public/body-back.svg` (original self-authored; violet outline distinguishes the back view from front's cyan — state still not color-only, conveyed by aria). `components/BodyMapBack.tsx` (11 back hotspots incl. lower-back, reusing `BodyPart`). `components/BodyMapSwitcher.tsx` (client component; front/back toggle with `aria-pressed`, `aria-live`, focus retention, L/R via hotspot labels).
- 2026-08-10 (S07): `tests/body-map-switcher.test.tsx` verifies switch regression, `aria-pressed` state, keyboard Space, focus retention, and all-six-regions-reachable. `mobile-touch-S07.mp4` deferred (real-device capture, not fabricated).

## Known Issues
- Exact qualified content reviewer is not yet named.
- SVG is self-authored (DC-2): student should still save the Figma/original-work process as proof and confirm acceptability with the mentor (pending).
- Media hosting remains local-first until the performance budget is measured.
- Authoritative proposal PDF is 11 pages (canonical).
- S01 ledger review and S02 policy wording were performed by the implementation partner; student/mentor sign-off and professional review (S11) pending.
- S02 refusal test is a defined contract (not live); enforcement pending S10/S11; page-level safety prompt in S15.
- S03 study execution pending (10 volunteers + consent, mentor task-wording review, pilot run).
- S04 screens not yet hand-drawn/Figma'd; mentor info-priority review pending.
- S05 `homepage-S05.png` pending (needs headless browser; not fabricated). Production analytics remain off.
- S06/S07 body-map components are NOT yet mounted on a route (wiring is S08); the production build still serves the S05 placeholder homepage. PNGs (`body-front-S06`, `body-back-S07`) are SVG rasterizations (not interactive-component screenshots).
- S07 `mobile-touch-S07.mp4` real-device video evidence is pending (student manual work); automated tap/keyboard tests cover the interaction logic, on-device validation still required.

## Last Test Evidence
- Automated: `node scripts/check-environment.mjs` → exit 0. **S07:** `npm run lint` exit 0; `npm run typecheck` exit 0; `npm run test` 3 files / 13 tests passed exit 0 (sanity + `body-map-front` 5 + `body-map-switcher` 7: geometry incl. lower-back, default view, aria-pressed switch, keyboard Space, focus retention, all-six-regions-reachable, tap→onSelect); `npm run build` Next 16.3.0, 2 static routes, exit 0 → **all four PASS** (see `docs/test-report-S07.txt`).
- Manual: S01–S05 drafted/executed by implementation partner (sign-offs/reviews pending). S06/S07 components + tests written by implementation partner; student manual work pending (verify hotspot/region positions on a real device, original-work proof for the self-authored SVGs, on-device mobile video).
- Content/media: Not started.
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: Vertical slice defined (`docs/baseline-ledger.md` §5); not implemented (S09). App shell builds (S05); front + back body maps + switcher done with tests (S06/S07), not yet routed (S08).

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
- **Deliverables:** `public/body-back.svg` (original, self-authored), `components/BodyMapBack.tsx` (11 back hotspots incl. lower-back), `components/BodyMapSwitcher.tsx` (client; front/back toggle), `tests/body-map-switcher.test.tsx`; evidence `docs/body-back-S07.png`, `docs/test-report-S07.txt`.
- **Acceptance:** (1) front/back state recognizable by AT — MET (aria-pressed + aria-live + group aria-label); (2) all regions reachable in at least one view — MET (front + lower-back); (3) switching does not lose page context — MET (focus retained).
- **Verification:** lint/typecheck/build exit 0; test 3 files / 13 tests passed → ALL CHECKS PASS (`docs/test-report-S07.txt`).
- **Changed files (S07):** `public/body-back.svg`, `components/BodyMapBack.tsx`, `components/BodyMapSwitcher.tsx`, `tests/body-map-switcher.test.tsx`, `docs/body-back-S07.png`, `docs/test-report-S07.txt`, `TASKS.md`.
- **Honest scope note:** SVG + components + tests authored by the implementation partner; PNGs are SVG rasterizations via cairosvg (no browser available). `mobile-touch-S07.mp4` deferred (real-device capture, not fabricated). Components not mounted on a route yet (S08).
- **Checkpoints:** pre-S07 `42be299`; S07 complete (this commit).

## Next Unit
- S09 - 脚踝垂直切片验收; ankle vertical-slice acceptance only. (S08 is now the active unit; do not implement S08 or S09 until opened.)

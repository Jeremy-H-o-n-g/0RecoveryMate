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
Unit code: S06
Unit title: 前视人体 SVG 与语义热点
Unit focus: Build the front-view body outline and semantic hotspots (shoulder, arm, knee, ankle, …) so each region is focusable, identifiable, and testable.
Current prompt: `prompts/S06-Front-Body-SVG.md`
Prior-state requirement: S05 project and tokens passed; SVG source and license are recorded.
Status: **Activated — not yet started.** Do not implement until S06 is opened.

## Acceptance Criteria for Current Unit
- All planned hotspots are keyboard-activatable.
- Hotspots do not overlap in a way that causes misselection.
- The SVG license is traceable.

## Completed Units
- [x] S01 - 基线台账与完整垂直切片
- [x] S02 - 健康边界与内容证据协议
- [x] S03 - 形成性研究设计与成功指标
- [x] S04 - 信息架构、用户旅程与界面蓝图
- [x] S05 - 仓库初始化、版本锁定与设计令牌
- [ ] S06 - 前视人体 SVG 与语义热点
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
- 2026-08-09 (S04): UX blueprint `docs/UXBlueprint.md` (seven-step → pages/routes/states; mobile no-scroll; safety before action; not hover-dependent; color not sole cue); state model `docs/StateModel.md`; `docs/Architecture.md` enhanced; `docs/ux-flow-S04.png` auto-generated.
- 2026-08-09 (S05): Next.js App Router project initialized at repo root (create-next-app) with a genuine `package-lock.json` from real `npm install`. Actual versions (see `setup-versions.txt`): next 16.3.0 (Active LTS), react 19.2.8, typescript 5.9.3, tailwindcss 4.3.3, eslint 9.39.5, vitest 4.1.10, framer-motion 13.0.0, zod 4.4.3.
- 2026-08-09 (S05): Quality scripts configured and passing — `lint` (eslint), `typecheck` (tsc --noEmit), `test` (vitest run), `build` (next build). `unrs-resolver` install script approved under npm allow-scripts so ESLint's native resolver works.
- 2026-08-09 (S05): Design tokens in `app/globals.css` cover background, surface, foreground, muted, focus, accent, accent-2, border, motion-scale + prefers-reduced-motion. Minimal shell: `app/layout.tsx`, `app/page.tsx`.

## Known Issues
- Exact qualified content reviewer is not yet named.
- Final original/third-party SVG choice is unresolved (DC-2) — S06 prior-state requires SVG source/license to be recorded.
- Media hosting remains local-first until the performance budget is measured.
- Authoritative proposal PDF is 11 pages (canonical).
- S01 ledger review and S02 policy wording were performed by the implementation partner; student/mentor sign-off and professional review (S11) pending.
- S02 refusal test is a defined contract (not live); enforcement pending S10/S11; page-level safety prompt in S15.
- S03 study execution pending (10 volunteers + consent, mentor task-wording review, pilot run).
- S04 screens not yet hand-drawn/Figma'd; mentor info-priority review pending.
- S05 `homepage-S05.png` evidence is pending (needs headless browser + running server; not fabricated). Next telemetry is anonymous dev usage stats, not end-user tracking; production analytics remain off.
- S05 scope note: the prompt's "create or modify only" list (package.json, package-lock.json, app/layout.tsx, app/globals.css, .gitignore, .env.example) was insufficient for a runnable project whose `build`/`lint`/`typecheck`/`test` must pass; the standard Next.js configs (tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs, next-env.d.ts), `app/page.tsx` (a route is required to build), and a vitest config + sample test (required for `test` to pass) were added to satisfy acceptance.

## Last Test Evidence
- Automated: `node scripts/check-environment.mjs` → exit 0. S01–S04 doc checks ALL CHECKS PASS. **S05:** `npm run lint` exit 0; `npm run typecheck` exit 0; `npm run test` 1/1 passed exit 0; `npm run build` Next 16.3.0 compiled, 2 static routes, exit 0 → **all four PASS** (see `docs/test-report-S05.txt`, `setup-versions.txt`).
- Manual: S01–S04 drafted by implementation partner (sign-offs/reviews pending as noted). S05 installs and quality-gate runs executed by the implementation partner (real `npm install`, real lockfile, real command results) — recorded in `setup-versions.txt` / `docs/test-report-S05.txt`.
- Content/media: Not started.
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: Vertical slice defined (`docs/baseline-ledger.md` §5); not implemented (S09). App shell builds (S05).

## S01 Completion Notes (completed 2026-07-27)
- Checkpoints: `dc9c0d6` → `3717579` → `d69336a`.

## S02 Completion Notes (completed 2026-08-09)
- Checkpoints: pre-S02 `d69336a`; complete `99b410d`.

## S03 Completion Notes (completed 2026-08-09)
- Checkpoints: pre-S03 `99b410d`; complete `7d51f58`.

## S04 Completion Notes (completed 2026-08-09)
- Checkpoints: pre-S04 `7d51f58`; complete `e44248d`.

## S05 Completion Notes (completed 2026-08-09)
- **Deliverables:** `package.json`, `package-lock.json` (real), `app/layout.tsx`, `app/globals.css` (design tokens), `.gitignore` (added `tsconfig.tsbuildinfo`), `.env.example` (unchanged, clean); plus the configs/test harness required for the gates (`tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `next-env.d.ts`, `app/page.tsx`, `vitest.config.ts`, `test/sanity.test.ts`); evidence `setup-versions.txt`, `docs/test-report-S05.txt`.
- **Acceptance:** (1) four commands pass — MET; (2) no secrets/local DB committed — MET (node_modules/.next/.env gitignored; source scan clean); (3) design tokens cover background/text/focus/accent/reduced-motion — MET.
- **Verification:** lint/typecheck/test/build all exit 0 (see `docs/test-report-S05.txt`).
- **Changed files (S05):** the app scaffold + configs + evidence above + `TASKS.md`.
- **Honest scope note:** installs and the four gates were executed by the implementation partner (real, not fabricated); `homepage-S05.png` is pending (no headless browser; not fabricated). `next@16.3.0` used (current Next 16 LTS; proposal example was 16.2.11).
- **Checkpoints:** pre-S05 `2deec09`; S05 complete (this commit).

## Next Unit
- S07 - 后视人体图、切换与触控/键盘兼容; back-view body, toggle, and touch/keyboard compatibility only. (S06 is now the active unit; do not implement S06 or S07 until opened.)

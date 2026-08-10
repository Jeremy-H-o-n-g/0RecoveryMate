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
Unit code: S10
Unit title: 动作内容 Schema 与构建时校验
Unit focus: Define the structure/media/source/review/accessibility fields for 12–18 exercises and make the build fail on invalid content.
Current prompt: `prompts/S10-Content-Schema-and-Validation.md`
Prior-state requirement: ankle slice stable; component interfaces frozen.
Status: **Activated — not yet started.** Do not implement until S10 is opened. Note: S10 lists `data/exercises.json` (current exercises are at `data/sample/exercises.json`) and adds `npm run validate:content` + a build-time content gate.

## Acceptance Criteria for Current Unit
- Every published exercise has source, review, license, captions/transcript, and stop signals.
- Bad references block the build.

## Completed Units
- [x] S01 - 基线台账与完整垂直切片
- [x] S02 - 健康边界与内容证据协议
- [x] S03 - 形成性研究设计与成功指标
- [x] S04 - 信息架构、用户旅程与界面蓝图
- [x] S05 - 仓库初始化、版本锁定与设计令牌
- [x] S06 - 前视人体 SVG 与语义热点
- [x] S07 - 后视人体图、切换与触控/键盘兼容
- [x] S08 - BodyMap 状态、数据契约与路由
- [x] S09 - 脚踝垂直切片验收
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
- 2026-08-09 (S04): UX blueprint `docs/UXBlueprint.md`; state model `docs/StateModel.md`; `docs/Architecture.md` enhanced; `docs/ux-flow-S04.png`.
- 2026-08-09 (S05): Next.js App Router project at repo root (genuine lockfile); versions in `setup-versions.txt`; four quality scripts pass; design tokens cover background/text/focus/accent/reduced-motion.
- 2026-08-10 (S06): Front body SVG + `BodyPart`/`BodyMapFront` (accessible `<button>` hotspots) + tests; component testing set up (jsdom + Testing Library + user-event).
- 2026-08-10 (S07): Back body SVG + `BodyMapBack` (incl. lower-back) + `BodyMapSwitcher` (front/back toggle, aria-pressed, focus retention) + tests.
- 2026-08-10 (S08): Type-safe data contract — `schemas/body-part.ts` (Zod), `data/body-parts.json` (6 regions), `lib/content.ts` (server-only query fns; excludes unreviewed), `app/body/[part]/page.tsx` (static route; notFound on invalid) + tests.
- 2026-08-10 (S09): Ankle vertical slice wired end-to-end (no backend) — `app/page.tsx` (client; mounts switcher; onSelect→region→router), `app/body/[part]/page.tsx` renders `ExerciseCard`, `components/ExerciseCard.tsx`, `app/exercise/[id]/page.tsx` (server route; safety before action; placeholder steps; URL-driven `?done=1` completion; notFound on invalid). `lib/content.ts` expanded (getExercise/getExerciseIds/getPartExercises/getRegionByHotspot).
- 2026-08-10 (S09): The slice surfaces the DRAFT ankle placeholder, clearly marked (not approved, not medical guidance), per S09's allowance for clearly-marked placeholders; production approved-only enforcement stays via the build gate (S10/S11). `tests/e2e/ankle-slice.spec.tsx` verifies the 5-step data chain + card + invalid + deep-link + ankle-thin.

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
- S06/S07 PNGs are SVG rasterizations (cairosvg); S07 `mobile-touch-S07.mp4` pending (real device).
- S08 `route-evidence-S08.png` deferred (no browser). Exercises are still the draft sample at `data/sample/exercises.json`.
- S09 `ankle-slice-S09.mp4` deferred (real-browser walkthrough = student manual work). `/exercise/[id]` renders dynamically because it reads `?done=` for completion; static-export optimization, if needed, is S24/S27. S10 will formalize the exercise schema + `data/exercises.json` + the build-time content gate.

## Last Test Evidence
- Automated: `node scripts/check-environment.mjs` → exit 0. **S09:** `npm run lint` exit 0; `npm run typecheck` exit 0; `npm run test` 5 files / 23 tests passed exit 0 (incl. `tests/e2e/ankle-slice.spec.tsx`: hotspot→region→exercise chain, placeholder card, invalid→null, deep-link, ankle-thin); `npm run build` exit 0, routes `/`, `/_not-found`, `/body/[part]` SSG ×6, `/exercise/[id]` dynamic → **all four PASS** (see `docs/e2e-report-S09.txt`).
- Manual: S01–S08 drafted/executed by implementation partner (sign-offs/reviews pending). S09 slice + tests written by implementation partner; real-browser walkthrough (desktop+mobile video) is student manual work (pending).
- Content/media: Not started (S10 defines the exercise content schema).
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: ankle vertical slice implemented + verified at the data/integration level (S09); on-device walkthrough pending.

## Completion notes (checkpoints)
- S01 (2026-07-27): `dc9c0d6` → `3717579` → `d69336a`.
- S02 (2026-08-09): pre `d69336a` → `99b410d`.
- S03 (2026-08-09): pre `99b410d` → `7d51f58`.
- S04 (2026-08-09): pre `7d51f58` → `e44248d`.
- S05 (2026-08-09): pre `2deec09` → `c2e4431`.
- S06 (2026-08-10): pre `c2e4431` → WIP `682d828` → `42be299`.
- S07 (2026-08-10): pre `42be299` → `ca0b543`.
- S08 (2026-08-10): pre `ca0b543` → `9dbd94b`.

## S09 Completion Notes (completed 2026-08-10)
- **Deliverables:** `app/page.tsx` (client; body map → region nav), `components/ExerciseCard.tsx`, `app/exercise/[id]/page.tsx` (server; safety-first, `?done=1` completion, notFound on invalid); expanded `lib/content.ts` and `app/body/[part]/page.tsx` (justified scope); `tests/e2e/ankle-slice.spec.tsx`; evidence `docs/e2e-report-S09.txt`.
- **Acceptance:** (1) 5-step slice no break points — MET; (2) placeholders clearly marked, not medical — MET; (3) refresh + direct URL work — MET.
- **Verification:** lint/typecheck/build exit 0; test 5 files / 23 tests passed → ALL CHECKS PASS (`docs/e2e-report-S09.txt`).
- **Changed files (S09):** `app/page.tsx`, `app/body/[part]/page.tsx`, `lib/content.ts`, `components/ExerciseCard.tsx`, `app/exercise/[id]/page.tsx`, `tests/e2e/ankle-slice.spec.tsx`, `docs/e2e-report-S09.txt`, `TASKS.md`.
- **Honest scope note:** slice surfaces the DRAFT ankle placeholder, clearly marked (not approved/medical); real-browser walkthrough video is student manual work (deferred). `/exercise/[id]` is dynamic (reads `?done=`); static-export optimization is later.
- **Checkpoints:** pre-S09 `9dbd94b`; S09 complete (this commit).

## Next Unit
- S11 - 来源台账、专业审核与内容锁定; source ledger, professional review, and content lock only. (S10 is now the active unit; do not implement S10 or S11 until opened.)

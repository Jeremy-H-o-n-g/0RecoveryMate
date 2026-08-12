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
Unit code: S11
Unit title: 来源台账、专业审核与内容锁定
Unit focus: Select 2–3 candidate exercises per region and lock the shootable list via source + professional review.
Current prompt: `prompts/S11-Source-Review-and-Content-Lock.md`
Prior-state requirement: S10 schema and publish gate passed.
Status: **In Progress — BLOCKED on a human decision (2026-08-10).** S11 requires professional-review **sign-off** by a qualified reviewer; the reviewer is still unnamed (DC-3) and forging signatures is forbidden. Sign-off (`review-signoff-S11.pdf`) and candidate-source selection cannot be completed until a reviewer is named + the student provides real sources. The review-log structure was created (`docs/ContentReviewLog.md`); S12 is NOT activated. See "S11 Blocker" below.

## Acceptance Criteria for Current Unit
- Each of the six regions has at least 2 shootable candidate exercises.
- All text is signed off by the reviewer.
- The license path is clear.

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
- [x] S10 - 动作内容 Schema 与构建时校验
- [ ] S11 - 来源台账、专业审核与内容锁定  *(In Progress — blocked; see S11 Blocker)*
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
- 2026-08-10 (S06): Front body SVG + `BodyPart`/`BodyMapFront` (accessible `<button>` hotspots) + tests; component testing set up.
- 2026-08-10 (S07): Back body SVG + `BodyMapBack` (incl. lower-back) + `BodyMapSwitcher` (front/back toggle, aria-pressed, focus retention) + tests.
- 2026-08-10 (S08): Type-safe data contract — `schemas/body-part.ts`, `data/body-parts.json`, `lib/content.ts`, `app/body/[part]/page.tsx` + tests.
- 2026-08-10 (S09): Ankle vertical slice wired end-to-end (no backend); surfaces clearly-marked DRAFT placeholder; `tests/e2e/ankle-slice.spec.tsx`.
- 2026-08-10 (S10): Exercise schema (`schemas/exercise.ts`, Zod) + build-time content gate (`lib/content.ts` parses + referential integrity) + `scripts/validate-content.ts` (`npm run validate:content` via tsx). Difficulty is non-medical; approved requires full provenance + accessibility.
- 2026-08-10 (S11, BLOCKED): `docs/ContentReviewLog.md` created (review process + log + the blocker) and `docs/SourceLedger.md` §7 added. S11 remains BLOCKED — no qualified reviewer is named (DC-3), 0 approved content, no fabricated sign-off/sources. S12 NOT activated.

## Known Issues
- ⚠️ Exact qualified content reviewer is not yet named (DC-3) — blocks S11 sign-off. S11 cannot complete until a reviewer is named + the student provides real, licensable sources.
- SVG is self-authored (DC-2): student should save original-work proof + mentor confirmation (pending).
- Media hosting remains local-first until the performance budget is measured.
- Authoritative proposal PDF is 11 pages (canonical).
- S01 ledger review and S02 policy wording were performed by the implementation partner; professional review (S11) blocked.
- S02 refusal test is a defined contract (not live); build-time enforcement wired (S10); page-level safety prompt in S15.
- S03 study execution pending (10 volunteers + consent, mentor task-wording review, pilot run).
- S04 screens not yet hand-drawn/Figma'd; mentor info-priority review pending.
- S05 `homepage-S05.png` pending (no headless browser). Production analytics remain off.
- S06/S07 PNGs are SVG rasterizations; S07 `mobile-touch-S07.mp4` pending (real device).
- S08 `route-evidence-S08.png` deferred (no browser).
- S09 `ankle-slice-S09.mp4` deferred (real-browser walkthrough = student manual work). `/exercise/[id]` renders dynamically (reads `?done=`); static-export optimization is S24/S27.
- S10: `data/sample/exercises.json` superseded by `data/exercises.json` (kept). Current content is only the DRAFT ankle placeholder; no approved content (blocked → S11).
- S11: candidate selection (2–3/region), `source-ledger-S11.csv`, and `review-signoff-S11.pdf` are pending a named reviewer + real student sources.

## Last Test Evidence
- Automated: `node scripts/check-environment.mjs` → exit 0. S10 gates green (lint/typecheck/build/test 6 files-32 tests/`validate:content` OK). **S11 (blocked):** changes are docs-only; `npm run validate:content` → "OK - no content errors." exit 0; `npm run test` still 6 files / 32 tests passed. No content approval (0 approved; reviewer unnamed).
- Manual: S01–S09 drafted/executed by implementation partner (sign-offs/reviews pending). S10 schema/validator authored by implementation partner. S11 (blocked): review-log + ledger status drafted by implementation partner; professional sign-off + source selection CANNOT proceed without a named reviewer (DC-3) + real student sources (not fabricated).
- Content/media: Schema + build gate done (S10); actual content + professional review blocked (S11).
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: ankle vertical slice verified (S09); content schema + gate done (S10); real content + review blocked (S11).

## Completion notes (checkpoints)
- S01 (2026-07-27): `dc9c0d6` → `3717579` → `d69336a`.
- S02 (2026-08-09): pre `d69336a` → `99b410d`.
- S03 (2026-08-09): pre `99b410d` → `7d51f58`.
- S04 (2026-08-09): pre `7d51f58` → `e44248d`.
- S05 (2026-08-09): pre `2deec09` → `c2e4431`.
- S06 (2026-08-10): pre `c2e4431` → WIP `682d828` → `42be299`.
- S07 (2026-08-10): pre `42be299` → `ca0b543`.
- S08 (2026-08-10): pre `ca0b543` → `9dbd94b`.
- S09 (2026-08-10): pre `9dbd94b` → `6d95164`.
- S10 (2026-08-10): pre `6d95164` → `299ba2a`.

## S11 Blocker (In Progress — blocked 2026-08-10)
- S11 acceptance cannot pass without a **human decision**: name a qualified reviewer (DC-3) AND have the student provide real, licensable sources. Forging review signatures / inventing sources is forbidden.
- **Done (honest, non-fabricated):** `docs/ContentReviewLog.md` (review process + log + the blocker), `docs/SourceLedger.md` §7 (S11 status).
- **NOT done (blocked):** candidate selection (2–3/region, 12–18 total), professional sign-off, `source-ledger-S11.csv`, `review-signoff-S11.pdf`, any `approved` content.
- **Status:** S11 is NOT marked complete; S12 is NOT activated. Per S11's stop condition ("stop when a blocker requires a human decision").
- **Rollback:** pre-S11 `299ba2a`.
- **To unblock:** (1) name a qualified reviewer (DC-3); (2) student records real sources in `docs/SourceLedger.md` + `source-ledger-S11.csv`; (3) reviewer records approve/modify/reject in `docs/ContentReviewLog.md`; (4) capture `review-signoff-S11.pdf`; (5) then set `approved` in `data/exercises.json` (build gate enforces full provenance + accessibility).

## Next Unit
- S12 - 拍摄规范、分镜与首条视频采集; shoot spec, storyboard, and first video capture only. **NOT activated** — S11 is the current unit and is blocked. Do not implement S12 until S11 is unblocked and passes.

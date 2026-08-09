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
Unit code: S05
Unit title: 仓库初始化、版本锁定与设计令牌
Unit focus: Establish a runnable Next.js App Router project on a supported LTS, quality scripts, and cyber-sport design tokens.
Current prompt: `prompts/S05-Repository-and-Design-Tokens.md`
Prior-state requirement: P1 exit gate passed; Node 24 LTS, Git, and editor verified.
Status: **Activated — not yet started.** Do not implement until S05 is opened.

## Acceptance Criteria for Current Unit
- The four commands (`lint`, `typecheck`, `test`, `build`) pass.
- No secrets or local database are committed.
- Design tokens cover background, text, focus, accent, and reduced-motion.

## Completed Units
- [x] S01 - 基线台账与完整垂直切片
- [x] S02 - 健康边界与内容证据协议
- [x] S03 - 形成性研究设计与成功指标
- [x] S04 - 信息架构、用户旅程与界面蓝图
- [ ] S05 - 仓库初始化、版本锁定与设计令牌
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
- 2026-07-27 (S01): Requirements ledger created at `docs/baseline-ledger.md`; BR-01..BR-15 verified; authoritative source treated as the 11-page proposal PDF.
- 2026-07-27 (S02): Content policy v1 in `config/content-policy.json` (`reviewStatus` machine; only `approved` publishable; 9 required fields; buildGate) and `docs/ContentSafetyPolicy.md`; `docs/SourceLedger.md` created; no fabricated endorsements.
- 2026-08-09 (S03): Formative usability protocol v1 in `docs/ResearchProtocol.md` (AB/BA, 5 per order; descriptive only; no significance; stop-at-any-time); anonymized record table; `docs/ConsentScript.md`; pilot template.
- 2026-08-09 (S04): UX blueprint in `docs/UXBlueprint.md` — seven-step experience mapped to pages/routes (`/`, `/body/[part]`, `/exercise/[id]`, optional `/flow/[sport]`); mobile-first (no horizontal scroll); loading/empty/error; safety prompt before action; keyboard+touch parity (not hover-dependent); color not sole cue. State model in `docs/StateModel.md` with a return path for every state; `docs/Architecture.md` enhanced additively.
- 2026-08-09 (S04): `docs/ux-flow-S04.png` auto-generated (process flow, not UI mockups); student Figma/hand-drawn screens pending.

## Known Issues
- Exact qualified content reviewer is not yet named.
- Final original/third-party SVG choice is unresolved.
- Media hosting remains local-first until the performance budget is measured.
- Page-count reference resolved: authoritative proposal PDF is 11 pages (canonical).
- S01 ledger review and S02 policy wording were performed by the implementation partner (AI); student/mentor sign-off and professional review (S11) are pending.
- S02 refusal test is a defined contract (not live); enforcement pending S10/S11; page-level safety prompt in S15.
- S03 study execution pending (10 volunteers + consent, mentor task-wording review, pilot run); `pilot-observation.csv` is a template.
- S04 screens not yet hand-drawn/Figma'd by the student; mentor info-priority review and not-hover-dependent confirmation pending real implementation.
- S05 (next) requires real `npm` execution and a genuine `package-lock.json`; the four commands must actually pass — nothing may be fabricated.

## Last Test Evidence
- Automated: `scripts/check-environment.mjs` → "Node environment OK: v24.18.0", exit 0. S01 structural verification ALL CHECKS PASS. S02 content-policy JSON valid + checks ALL CHECKS PASS. S03 protocol checks ALL CHECKS PASS. S04 checks ALL CHECKS PASS (7-step mapping; front/back control; mobile no-scroll; return-path-per-state; safety before action; not-hover/color/no-diagnosis; valid `ux-flow-S04.png` 1537×786). No `package.json`/app yet (repo init is S05); no automated app tests exist.
- Manual: S01 proposal reviewed page by page (implementation partner, 11 pp). S02 policy drafted (impl partner; professional review pending S11). S03 protocol drafted (impl partner; student/mentor wording review + pilot pending). S04 blueprint drafted (impl partner; student Figma screens + mentor info-priority review pending).
- Content/media: Not started.
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: Vertical slice defined in `docs/baseline-ledger.md` §5; not implemented (S09).

## S01 Completion Notes (completed 2026-07-27)
- Deliverables: `docs/baseline-ledger.md`, `docs/traceability-review-S01.md`; updated `docs/ProjectPlan.md`, `docs/Traceability.md`, `README.md`. Checkpoints: `dc9c0d6` → `3717579` → `d69336a`.

## S02 Completion Notes (completed 2026-08-09)
- Deliverables: `config/content-policy.json` (v1), `docs/ContentSafetyPolicy.md`, `docs/SourceLedger.md`, `docs/content-policy-v1.md`, `docs/unsafe-copy-test.md`. Checkpoints: pre-S02 `d69336a`; complete `99b410d`.

## S03 Completion Notes (completed 2026-08-09)
- Deliverables: `docs/ResearchProtocol.md`, `docs/ConsentScript.md`, `data/templates/usability-observations.csv`, `data/templates/pilot-observation.csv`, `docs/research-protocol-v1.md`. Checkpoints: pre-S03 `99b410d`; complete `7d51f58`.

## S04 Completion Notes (completed 2026-08-09)
- **Deliverables:** `docs/UXBlueprint.md`, `docs/StateModel.md`; enhanced `docs/Architecture.md` (additive); evidence `docs/state-review-S04.md`, `docs/ux-flow-S04.png`.
- **Acceptance:** (1) seven-step UX mappable to pages/states — MET; (2) front/back switch has a clear control — MET; (3) mobile needs no horizontal scroll — MET.
- **Verification:** ALL CHECKS PASS; `check-environment.mjs` exit 0.
- **Changed files (S04):** `docs/UXBlueprint.md`, `docs/StateModel.md`, `docs/Architecture.md`, `docs/state-review-S04.md`, `docs/ux-flow-S04.png`, `TASKS.md`.
- **Honest scope note:** `ux-flow-S04.png` is an auto-generated process flow, not UI mockups; student Figma/hand-drawn key screens, mentor info-priority review, and not-hover-dependent confirmation on the real build are pending. No visual polish, accounts, social, or diagnosis flows added.
- **Checkpoints:** pre-S04 `7d51f58`; S04 complete (this commit).

## Next Unit
- S06 - 前视人体 SVG 与语义热点; front-view body SVG with semantic hotspots only. (S05 is now the active unit; do not implement S05 or S06 until opened.)

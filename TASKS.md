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
Unit code: S03
Unit title: 形成性研究设计与成功指标
Unit focus: Design the 10-student usability study (body-map navigation vs simplified-list prototype) to yield interpretable evidence without over-extrapolation.
Current prompt: `prompts/S03-Formative-Research-Design.md`
Prior-state requirement: S02 safety and privacy rules are fixed.
Status: **Activated — not yet started.** Do not implement until S03 is opened.

## Acceptance Criteria for Current Unit
- The research question, metrics, and exclusion rules are clear.
- Small-sample limitations are written into the plan.
- Any participant can stop at any time.

## Completed Units
- [x] S01 - 基线台账与完整垂直切片
- [x] S02 - 健康边界与内容证据协议
- [ ] S03 - 形成性研究设计与成功指标
- [ ] S04 - 信息架构、用户旅程与界面蓝图
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
- 2026-07-27 (S01): Requirements ledger created at `docs/baseline-ledger.md`; BR-01..BR-15 verified against proposal §7 (p.7); scope layers (M/RF/OP/XS), vertical slice (VS-1..VS-6), metrics (SM-1..SM-6), and decisions (DC-1..DC-6) recorded.
- 2026-07-27 (S01): Six-region default set confirmed from the authoritative proposal (§3.1 p.3, §10 p.9).
- 2026-07-27 (S01): S01 acceptance criteria met at definition level; structural verification passed (15 unique BRs with session + verification; all ledger ID families present). Vertical slice VS-1..VS-6 defined backend-free; implementation deferred to S09.
- 2026-07-27 (S01): Authoritative source treated as the 11-page proposal PDF (`RecoverMate_Project_Plan_and_Feasibility.pdf`); earlier "13 pages" wording corrected.
- 2026-07-27 (S02): Content policy v1 defined in `config/content-policy.json` (`reviewStatus` machine: draft/in-review/approved/rejected/blocked; only `approved` publishable) and `docs/ContentSafetyPolicy.md`; `requiredExerciseFields` now include `reviewStatus`.
- 2026-07-27 (S02): `docs/SourceLedger.md` created; all current content is `draft`/placeholder (none approved).
- 2026-07-27 (S02): No organizational endorsements claimed; AAOS treated as a reference to consult, not an endorsement; soreness is not auto-interpreted as a specific injury.

## Known Issues
- Exact qualified content reviewer is not yet named.
- Final original/third-party SVG choice is unresolved.
- Media hosting remains local-first until the performance budget is measured.
- Page-count reference resolved: the authoritative proposal PDF is 11 pages (treated as canonical); earlier "13 pages" wording updated. If a longer canonical proposal exists, the student should supply it.
- The page-by-page proposal review for S01 was performed by the implementation partner (AI) against the extracted PDF text; formal student/mentor ledger sign-off is recommended but was not blocking for S01 (rollback: `3717579`).
- S02 refusal test (`docs/unsafe-copy-test.md`) is a defined contract, not a live run; automated enforcement is pending S10/S11. The page-level safety prompt is implemented in S15.

## Last Test Evidence
- Automated: `scripts/check-environment.mjs` → "Node environment OK: v24.18.0", exit 0 (Node v24.18.0 LTS). S01 structural verification: 15 unique BRs with session + verification; all ledger ID families present → ALL CHECKS PASS. S02 verification: `content-policy.json` valid JSON; publishable statuses, 9 required fields, 5 review states, build gate, refusal templates, page-level prompt, and refusal coverage (TC-1/TC-2/TC-3) all OK; sample carries required fields with `reviewStatus="draft"` (blocked) → ALL CHECKS PASS. No `package.json`/app yet (repo init is S05); no automated app tests exist.
- Manual: S01 proposal reviewed page by page by the implementation partner (11 pp). S02 policy/wording drafted by the implementation partner; professional review-process confirmation is pending (S11). 3 dangerous wordings defined as a contract test (not a live run). Student/mentor sign-off recommended.
- Content/media: Not started.
- Research: Protocol scheduled for S03.
- End-to-end demo path: Vertical slice defined in `docs/baseline-ledger.md` §5 (backend-free); not implemented (S09).

## S01 Completion Notes (completed 2026-07-27)
- **Deliverables:** `docs/baseline-ledger.md` (requirements ledger), `docs/traceability-review-S01.md` (review evidence); updated `docs/ProjectPlan.md`, `docs/Traceability.md` (source/review header), `README.md` (ledger pointer).
- **Acceptance:** (1) every baseline feature has an ID/session/verification — MET; (2) ankle vertical slice defined end-to-end and backend-free — MET (implementation is S09); (3) unknowns explicit, nothing invented — MET.
- **Verification:** `node scripts/check-environment.mjs` exit 0; structural check ALL CHECKS PASS.
- **Checkpoints:** pre-S01 `dc9c0d6`; S01 WIP `3717579`; S01 complete `d69336a`.

## S02 Completion Notes (completed 2026-08-09)
- **Deliverables:** `config/content-policy.json` (v1), `docs/ContentSafetyPolicy.md` (v1), `docs/SourceLedger.md` (new); evidence `docs/content-policy-v1.md`, `docs/unsafe-copy-test.md`.
- **Acceptance:** (1) unreviewed actions cannot enter the release build — MET (publishable=["approved"] + buildGate; sample is `draft`/blocked; enforcement S10/S11); (2) every action has source, license, review status — MET (9 required fields; `SourceLedger.md` states + sample carries them); (3) red-flag prompts not obscured by visuals — MET (rule, implemented S15).
- **Verification:** JSON valid; ALL CHECKS PASS; `check-environment.mjs` exit 0.
- **Changed files (S02):** `config/content-policy.json`, `docs/ContentSafetyPolicy.md`, `docs/SourceLedger.md`, `docs/content-policy-v1.md`, `docs/unsafe-copy-test.md`, `TASKS.md`.
- **Honest scope note:** refusal test is a defined contract (not live; no app until S05); policy wording is draft pending professional review (S11); no endorsements fabricated; sample content stays `draft`/placeholder.
- **Checkpoints:** pre-S02 `d69336a`; S02 complete (this commit).

## Next Unit
- S04 - 信息架构、用户旅程与界面蓝图; information architecture, user journeys, and UI blueprints only. (S03 is now the active unit; do not implement S03 or S04 until opened.)

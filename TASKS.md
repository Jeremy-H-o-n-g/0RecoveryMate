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
Unit code: S02
Unit title: 健康边界与内容证据协议
Unit focus: Add source, license, professional-review, stop-signal, and escalation fields to action content so the product is general guidance, not a diagnostic tool.
Current prompt: `prompts/S02-Health-Boundary-and-Evidence-Protocol.md`
Prior-state requirement: S01 requirements ledger passed; unknown health content stays placeholder.
Status: **Activated — not yet started.** Do not implement until S02 is opened.

## Acceptance Criteria for Current Unit
- Unreviewed actions cannot enter the release build.
- Every action has source, license, and review status.
- Red-flag safety prompts are not obscured by visuals.

## Completed Units
- [x] S01 - 基线台账与完整垂直切片
- [ ] S02 - 健康边界与内容证据协议
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

## Known Issues
- Exact qualified content reviewer is not yet named.
- Final original/third-party SVG choice is unresolved.
- Media hosting remains local-first until the performance budget is measured.
- Page-count reference resolved: the authoritative proposal PDF is 11 pages (treated as canonical); earlier "13 pages" wording updated. If a longer canonical proposal exists, the student should supply it.
- The page-by-page proposal review for S01 was performed by the implementation partner (AI) against the extracted PDF text; formal student/mentor ledger sign-off is recommended but was not blocking for S01 (rollback: `3717579`).

## Last Test Evidence
- Automated: `scripts/check-environment.mjs` → "Node environment OK: v24.18.0", exit 0 (Node v24.18.0 LTS). S01 structural verification: Traceability matrix = 15 BRs, all unique, all with session + verification; baseline-ledger ID families all present (BR 15, M 6, RF 5, OP 3, XS 4, VS 6, SM 6, DC 6, RG 7, R 8) → ALL CHECKS PASS. No `package.json`/app yet (repo init is S05); no automated app tests exist.
- Manual: Baseline proposal reviewed page by page by the implementation partner against extracted text (11 pp). Traceability matrix verified: 15 BRs, each with a unique ID, session mapping, and verification method. Student/mentor sign-off recommended.
- Content/media: Not started.
- Research: Protocol scheduled for S03.
- End-to-end demo path: Vertical slice defined in `docs/baseline-ledger.md` §5 (backend-free); not implemented (S09).

## S01 Completion Notes (completed 2026-07-27)
- **Deliverables:** `docs/baseline-ledger.md` (requirements ledger), `docs/traceability-review-S01.md` (review evidence); updated `docs/ProjectPlan.md`, `docs/Traceability.md` (source/review header), `README.md` (ledger pointer).
- **Acceptance:** (1) every baseline feature has an ID/session/verification — MET; (2) ankle vertical slice defined end-to-end and backend-free — MET (implementation is S09); (3) unknowns explicit, nothing invented — MET.
- **Verification:** `node scripts/check-environment.mjs` exit 0; structural check ALL CHECKS PASS (15 unique BRs with session + verification; all ledger ID families present).
- **Changed files (S01):** `docs/baseline-ledger.md`, `docs/traceability-review-S01.md`, `docs/ProjectPlan.md`, `docs/Traceability.md`, `README.md`, `TASKS.md`.
- **Honest scope note:** the page-by-page proposal review was performed by the implementation partner (AI) against the extracted PDF text; formal student/mentor ledger sign-off is recommended. No app/repository code yet (S05). No content approval fabricated; all sample content stays `draft`/placeholder.
- **Checkpoints:** pre-S01 `dc9c0d6`; S01 WIP `3717579`; S01 complete (this commit).

## Next Unit
- S03 - 形成性研究设计与成功指标; design the formative study and success metrics only. (S02 is now the active unit; do not implement S02 or S03 until opened.)

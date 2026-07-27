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
Unit code: S01
Unit title: 基线台账与完整垂直切片
Unit focus: Convert the authoritative proposal into the requirement ledger and define the ankle end-to-end vertical slice.
Current prompt: `prompts/S01-Baseline-Ledger-and-Vertical-Slice.md`
Status: **In Progress — paused 2026-07-27.** Do not activate S02. See "S01 WIP / Resume" below.

## Acceptance Criteria for Current Unit
- Every baseline feature has an ID, session mapping, and verification method.
- The ankle vertical slice is complete end to end and does not require a backend.
- Unknowns remain explicit decisions; no health or licensing facts are invented.

## Completed Units
- [ ] S01 - 基线台账与完整垂直切片
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
- 2026-07-27 (S01 WIP): Requirements ledger drafted at `docs/baseline-ledger.md`; BR-01..BR-15 verified against proposal §7 (p.7); scope layers (M/RF/OP/XS), vertical slice (VS-1..VS-6), metrics (SM-1..SM-6), and decisions (DC-1..DC-6) recorded.
- 2026-07-27 (S01 WIP): Six-region default set confirmed from the authoritative proposal (§3.1 p.3, §10 p.9).

## Known Issues
- Exact qualified content reviewer is not yet named.
- Final original/third-party SVG choice is unresolved.
- Media hosting remains local-first until the performance budget is measured.
- Authoritative proposal PDF is 11 pages, but TASKS/S01 text references "13 pages"; confirm the canonical source with student/mentor.
- S01 paused mid-session: ledger + review evidence drafted; `docs/Traceability.md` header, `README.md` pointer, final verification, and the completion/S02-activation decision are not yet done. Student/mentor sign-off on the ledger is pending (review performed by the implementation partner against the extracted proposal text).

## Last Test Evidence
- Automated: `scripts/check-environment.mjs` → "Node environment OK: v24.18.0", exit 0 (Node v24.18.0 LTS). No `package.json`/app yet (repo init is S05); no automated app tests exist.
- Manual: Baseline proposal reviewed page by page by the implementation partner against extracted text (11 pp). Traceability matrix verified: 15 BRs, each with a unique ID, session mapping, and verification method. Student/mentor sign-off pending.
- Content/media: Not started.
- Research: Protocol scheduled for S03.
- End-to-end demo path: Vertical slice defined in `docs/baseline-ledger.md` §5 (backend-free); not implemented (S09).

## S01 WIP / Resume (paused 2026-07-27)
- **Completed this unit:** created `docs/baseline-ledger.md` (full requirements ledger with unique IDs BR/M/RF/OP/XS/VS/SM/DC/R/RG) and `docs/traceability-review-S01.md`; rewrote `docs/ProjectPlan.md` with scope layers + vertical slice. Pre-S01 checkpoint: `dc9c0d6`.
- **Unfinished / pending:** acceptance criteria are met at definition level, but S01 is NOT marked complete and S02 is NOT activated (paused). Still to do: add source/review header to `docs/Traceability.md`, add a ledger pointer to `README.md`, run final structural verification, then decide completion with the student.
- **Changed files:** `docs/baseline-ledger.md` (new), `docs/traceability-review-S01.md` (new), `docs/ProjectPlan.md` (modified), `TASKS.md` (this record).
- **Tests run / results:** `node --version` → v24.18.0; `node scripts/check-environment.mjs` → exit 0 (PASS). No app tests exist yet.
- **Precise next action to resume:** (1) add a one-line source/review header to `docs/Traceability.md` above its table; (2) add a baseline-ledger pointer to `README.md`; (3) re-run `node scripts/check-environment.mjs`; (4) with the student, confirm the 11-vs-13-page source and the six-region set; (5) only then evaluate S01 completion and S02 activation.
- **No secrets/artifacts committed:** extracted proposal text lives in OS temp (`%TEMP%\rm_proposal.txt`), outside the repo; no `.env`, keys, or build artifacts staged.

## Next Unit
- S02 - 健康边界与内容证据协议; prepare source and review fields only.

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
Unit code: S04
Unit title: 信息架构、用户旅程与界面蓝图
Unit focus: Turn the proposal's seven-step experience into page, state, route, and responsive-layout blueprints.
Current prompt: `prompts/S04-Information-Architecture-and-UX-Blueprint.md`
Prior-state requirement: S01–S03 scope, safety, and research contracts have passed.
Status: **Activated — not yet started.** Do not implement until S04 is opened.

## Acceptance Criteria for Current Unit
- The seven-step user experience is fully mappable to pages and states.
- Front/back body-view switching has a clear control.
- The mobile layout needs no horizontal scrolling.

## Completed Units
- [x] S01 - 基线台账与完整垂直切片
- [x] S02 - 健康边界与内容证据协议
- [x] S03 - 形成性研究设计与成功指标
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
- 2026-07-27 (S01): S01 acceptance criteria met at definition level; structural verification passed. Authoritative source treated as the 11-page proposal PDF; earlier "13 pages" wording corrected.
- 2026-07-27 (S02): Content policy v1 defined in `config/content-policy.json` (`reviewStatus` machine; only `approved` publishable; 9 required fields incl. `reviewStatus`; buildGate) and `docs/ContentSafetyPolicy.md`; `docs/SourceLedger.md` created; no fabricated endorsements; soreness not auto-interpreted as injury.
- 2026-08-09 (S03): Formative usability study protocol v1 defined in `docs/ResearchProtocol.md` — RQ (body map vs list), AB/BA counterbalanced (5 per order), metrics (completion rate, median time, misselection), descriptive only, no significance, no medical-effectiveness claim.
- 2026-08-09 (S03): Record table `data/templates/usability-observations.csv` confirmed anonymized (`participant_id` only; no name/health/diagnosis); `docs/ConsentScript.md` drafted; pilot template `data/templates/pilot-observation.csv` created (not run).

## Known Issues
- Exact qualified content reviewer is not yet named.
- Final original/third-party SVG choice is unresolved.
- Media hosting remains local-first until the performance budget is measured.
- Page-count reference resolved: the authoritative proposal PDF is 11 pages (canonical); earlier "13 pages" wording updated.
- The page-by-page proposal review for S01 was performed by the implementation partner (AI); formal student/mentor ledger sign-off is recommended (rollback: `3717579`).
- S02 refusal test (`docs/unsafe-copy-test.md`) is a defined contract, not a live run; automated enforcement is pending S10/S11; page-level safety prompt implemented in S15.
- S03 study execution is pending: recruiting 10 volunteers with consent, mentor review of task wording, and the pilot timing run are student manual work (not done); `pilot-observation.csv` is a template, not real data.

## Last Test Evidence
- Automated: `scripts/check-environment.mjs` → "Node environment OK: v24.18.0", exit 0 (Node v24.18.0 LTS). S01 structural verification: 15 unique BRs with session + verification; all ledger ID families present → ALL CHECKS PASS. S02: `content-policy.json` valid JSON; publishable statuses, 9 required fields, 5 review states, build gate, refusal templates, page-level prompt, refusal coverage (TC-1/TC-2/TC-3) all OK → ALL CHECKS PASS. S03: record table has no name/health/diagnosis columns; AB/BA with 5 per order; every task (T1–T3) has start + end conditions; no-significance and no-medical-effectiveness rules present; stop-at-any-time rule present → ALL CHECKS PASS. No `package.json`/app yet (repo init is S05); no automated app tests exist.
- Manual: S01 proposal reviewed page by page by the implementation partner (11 pp). S02 policy/wording drafted by the implementation partner; professional review-process confirmation pending (S11); 3 dangerous wordings defined as a contract test (not a live run). S03 protocol drafted by the implementation partner; student/mentor review of task wording and the pilot run are pending.
- Content/media: Not started.
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: Vertical slice defined in `docs/baseline-ledger.md` §5 (backend-free); not implemented (S09).

## S01 Completion Notes (completed 2026-07-27)
- **Deliverables:** `docs/baseline-ledger.md`, `docs/traceability-review-S01.md`; updated `docs/ProjectPlan.md`, `docs/Traceability.md`, `README.md`.
- **Acceptance:** all three criteria met at definition level; structural check ALL CHECKS PASS.
- **Checkpoints:** pre-S01 `dc9c0d6`; S01 WIP `3717579`; S01 complete `d69336a`.

## S02 Completion Notes (completed 2026-08-09)
- **Deliverables:** `config/content-policy.json` (v1), `docs/ContentSafetyPolicy.md` (v1), `docs/SourceLedger.md`; evidence `docs/content-policy-v1.md`, `docs/unsafe-copy-test.md`.
- **Acceptance:** all three criteria met at policy/schema level; JSON valid; ALL CHECKS PASS.
- **Checkpoints:** pre-S02 `d69336a`; S02 complete `99b410d`.

## S03 Completion Notes (completed 2026-08-09)
- **Deliverables:** `docs/ResearchProtocol.md`, `docs/ConsentScript.md`, `data/templates/usability-observations.csv` (refined), `data/templates/pilot-observation.csv` (template); evidence `docs/research-protocol-v1.md`.
- **Acceptance:** (1) research question, metrics, exclusion rules clear — MET; (2) small-sample limitations written into the plan — MET; (3) any participant can stop at any time — MET.
- **Verification:** record table anonymized; AB/BA 5-per-order; tasks have start + end conditions; no-significance/no-medical-effectiveness; no health history; stop rule — ALL CHECKS PASS; `check-environment.mjs` exit 0.
- **Changed files (S03):** `docs/ResearchProtocol.md`, `docs/ConsentScript.md`, `data/templates/usability-observations.csv`, `data/templates/pilot-observation.csv`, `docs/research-protocol-v1.md`, `TASKS.md`.
- **Honest scope note:** recruiting 10 volunteers with consent, mentor review of task wording, and the pilot timing run are **student manual work — pending, not fabricated**; `pilot-observation.csv` is a template, not real data.
- **Checkpoints:** pre-S03 `99b410d`; S03 complete (this commit).

## Next Unit
- S05 - 仓库初始化、版本锁定与设计令牌; repository init, version lock, and design tokens only. (S04 is now the active unit; do not implement S04 or S05 until opened.)

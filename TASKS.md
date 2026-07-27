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

## Known Issues
- Exact qualified content reviewer is not yet named.
- Final original/third-party SVG choice is unresolved.
- Media hosting remains local-first until the performance budget is measured.

## Last Test Evidence
- Automated: Not started.
- Manual: Baseline PDF reviewed page by page.
- Content/media: Not started.
- Research: Protocol scheduled for S03.
- End-to-end demo path: Defined; not implemented.

## Next Unit
- S02 - 健康边界与内容证据协议; prepare source and review fields only.

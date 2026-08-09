# RecoverMate Requirements Traceability

**Source:** Jeremy Hong proposal §7 (p.7) — `resources/RecoverMate_Project_Plan_and_Feasibility.pdf`.
**Reviewed S01** — every row has a unique ID, a session mapping, and a verification method. See `traceability-review-S01.md` and `baseline-ledger.md` §4. All items are `Planned`/`Refinement`; none are fabricated as approved.

| ID | Requirement | Sessions | Verification | Status |
|---|---|---|---|---|
| BR-01 | 首页以可交互人体模型为核心导航 | S04, S06–S09 | 键盘/触控/E2E + 截图 | Planned |
| BR-02 | 深色赛博运动视觉、霓虹描边、毛玻璃卡片 | S05, S14, S18, S24 | 视觉回归 + 对比度检查 | Planned |
| BR-03 | hover 高亮、click/tap 选择、ripple/脉冲 | S06–S08, S18, S23 | 多输入方式 + reduced-motion | Planned |
| BR-04 | 动作卡：预览、名称、时长、难度、肌群 | S14, S20 | 组件/内容 schema 测试 | Planned |
| BR-05 | 动作详情：视频、步骤、计时器、下一动作 | S15–S17, S22 | E2E + 媒体/字幕检查 | Planned |
| BR-06 | 环形计时器及暂停/完成状态 | S16–S18 | 状态机与边界值测试 | Planned |
| BR-07 | 完成反馈与粒子效果 | S18 | 幂等 + reduced-motion 测试 | Planned |
| BR-08 | 正面/背面人体图切换 | S06–S08 | 视图/焦点/方向测试 | Planned |
| BR-09 | 六部位，每部位 2–3 个动作 | S10–S13, S20 | 全量内容 manifest + 审核记录 | Planned |
| BR-10 | 运动类型快捷入口与 5–8 分钟流程（增强） | S21–S22 | 映射/队列/退出测试 | Planned |
| BR-11 | 移动端适配 | S06–S07, S14, S19, S23 | 真实设备 + 断点矩阵 | Planned |
| BR-12 | 纯静态、Vercel 部署 | S05, S24, S27 | production smoke + rollback | Planned |
| BR-13 | 邀请 10 名同学测试并收集反馈 | S03, S25–S26 | 匿名原始记录 + 可复现分析 | Planned |
| BR-14 | 视频来源、字幕、转录、许可与审核 | S02, S10–S13, S20 | 构建门禁 + source ledger | Refinement |
| BR-15 | 非诊断安全边界与升级建议 | S02, S15, S23, S28 | 安全文案 contract test + 人工审核 | Refinement |

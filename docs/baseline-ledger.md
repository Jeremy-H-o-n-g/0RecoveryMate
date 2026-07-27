# RecoverMate Baseline Requirements Ledger

**Source of truth:** Jeremy Hong, *RecoverMate 项目计划与可行性报告*
(`resources/RecoverMate_Project_Plan_and_Feasibility.pdf`), dated 2026-07-27.
This ledger is a non-losable, traceable normalization of that proposal. Where
this ledger and the proposal differ, **the proposal wins** — raise the
discrepancy (see §11 Open Items).

**Review status:** Page-by-page review performed in S01 by the implementation
partner against the extracted proposal text (11 pages). Student/mentor final
sign-off: **pending** (not fabricated as complete). See
`docs/traceability-review-S01.md`.

**Safety:** General educational recovery/warm-up guidance only. No diagnosis,
treatment, injury grading, or individualized medical advice.

---

## 1. Problem, users, claim (prop. p.2)
- **Problem:** 高中生运动后希望快速找到与酸痛部位相关的一般性恢复/热身指导。
- **Primary users:** 高中生运动参与者; **secondary:** 导师、内容审核者、竞赛评委。
- **Core claim:** 人体图比菜单式浏览更直觉，能快速连接部位、动作与视频指导。

## 2. Inputs / outputs / constraints (prop. p.2)
- **Inputs:** 正面/背面部位选择、运动类型选择、播放与计时控制。
- **Outputs:** 经审核的动作卡、视频、步骤、时长、提示和完成反馈。
- **Tech constraints:** Next.js App Router、Tailwind、Framer Motion、SVG、静态部署。
- **Content constraints:** 六部位，每部位 2–3 个动作，手机拍摄并剪辑。
- **Deployment/validation:** 部署到 Vercel，邀请 10 名同学测试并收集反馈。

## 3. Scope layers (prop. §3, p.3–4)

### 3.1 Mandatory (baseline) — M-01…M-06
- **M-01** 交互式正面/背面人体 SVG；肩、手臂、腰背、膝、小腿、脚踝六部位。
- **M-02** hover/focus/tap 高亮与选择，桌面和移动端均可操作。
- **M-03** 每部位 2–3 条动作；卡片包含预览、名称、时长、难度与主要肌群。
- **M-04** 动作详情包含视频、分步说明、计时器、暂停/继续和完成状态。
- **M-05** 赛博运动视觉、毛玻璃卡片、完成反馈和响应式布局。
- **M-06** 纯静态数据/媒体架构、Vercel 部署、10 人形成性可用性测试。

### 3.2 Justified refinements — RF-01…RF-05
- **RF-01** 发布内容必须包含来源、许可、审核状态、审核者、审核时间、停止信号、字幕与转录。
- **RF-02** 保留 Next.js App Router；新建项目用当前受支持并打补丁的 LTS 版本（不机械锁定 Next.js 14）。
- **RF-03** Zod 构建时校验、自动化测试、WCAG 2.2 AA 关键检查、prefers-reduced-motion。
- **RF-04** 10 人测试升级为形成性对照（人体图 vs 简化列表原型，AB/BA 顺序平衡）。
- **RF-05** 生产部署之外保留一个可断网运行的脚踝完整闭环。

### 3.3 Optional enhancement (non-blocking) — OP-01…OP-03
- **OP-01** 跑步、篮球、游泳、力量、足球、通用六种运动快捷入口。
- **OP-02** 5–8 分钟运动恢复流程队列。
- **OP-03** 云对象存储替代本地视频；仅在免费额度、CORS 和许可确认后启用。

### 3.4 Out of scope (this release) — XS-01…XS-04
- **XS-01** 伤病诊断、治疗处方、疼痛分级或个体化医疗建议。
- **XS-02** 账号、社交、评论、健康档案、个体推荐模型、生产数据库。
- **XS-03** 未经批准的后台上传/CMS；内容更新采用受审查的 Git + JSON 流程。
- **XS-04** 声称通过 10 人测试证明医学有效性或统计代表性。

## 4. Requirement traceability (prop. §7, p.7)
Canonical table: [`docs/Traceability.md`](Traceability.md). Every requirement has
a unique ID (BR-01…BR-15), a session mapping, and a verification method.

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

## 5. Vertical slice (prop. §4, p.4) — VS-1…VS-6
Smallest complete vertical slice; **no backend required** (static-first):
- **VS-1** 脚踝热点选择 (ankle hotspot) →
- **VS-2** 一张经审核的动作卡 (1 reviewed action card) →
- **VS-3** 动作详情：视频 + 分步说明 (detail: video + steps) →
- **VS-4** 计时器，暂停/继续 (timer, pause/resume) →
- **VS-5** 完成反馈 (completion feedback) →
- **VS-6** 返回 (return).

**Completion definition:** 桌面/手机可用；深链刷新可用；安全提示、字幕、转录和离线媒体齐全.
**No-backend confirmation:** slice runs on static Next.js + JSON + local media; no
accounts/DB (prop. §1, §6; [`Architecture.md`](Architecture.md)).
**Status in S01:** the slice is **defined**, not built. Implementation is S09.

## 6. Success metrics (prop. §5, p.4–5) — SM-1…SM-6
- **SM-1** 核心任务完成率 — 人体图版本 ≥ 80%（形成性目标）— 匿名任务记录 + 屏幕观察.
- **SM-2** 中位找到动作时间 — 人体图不劣于列表，并解释差异 — 统一计时脚本.
- **SM-3** 误选/返回 — 无系统性热点误映射 — 观察表 + route 日志（研究版）.
- **SM-4** 可访问性 — 无严重/高等级问题；全键盘可完成核心路径 — 自动扫描 + 人工走查.
- **SM-5** 内容完整性 — 100% 发布动作有来源、审核、许可、字幕和转录 — 构建时 manifest.
- **SM-6** 演示韧性 — 断网 30 秒内切换到离线脚踝闭环 — 彩排视频.

**Interpretation rule:** 10 人样本只用于形成性设计决策；不做总体有效性或治疗效果外推.

## 7. Decisions & defaults (prop. §10, p.9–10) — DC-1…DC-6
- **DC-1** 六部位 = 肩、手臂、腰背、膝、小腿、脚踝 — confirm by S01 — **confirmed from source**.
- **DC-2** SVG = 学生自绘简化图；OpenMoji 仅作许可示例而非默认素材 — confirm by S06 — **OPEN**.
- **DC-3** 专业审核 = 至少一名具备适当资格的体育/康复专业人员 — confirm by S11 — **OPEN (reviewer unnamed)**.
- **DC-4** 视频出演 = 有书面同意的学生本人或成年志愿者；不拍真实伤情 — confirm by S12 — **OPEN**.
- **DC-5** 媒体托管 = 先本地 public 视频；超预算后再评估对象存储 — confirm by S13/S24 — **OPEN (local-first)**.
- **DC-6** 生产分析 = 默认关闭；研究数据独立、匿名、离线记录 — confirm by S25/S27 — **OPEN**.

## 8. Risk register (prop. §8, p.8) — R1…R8
- **R1** 动作内容未经专业审查 (P 中 / I 高) → 未批准内容构建失败；保持 blocked + 占位内容. Owner: 学生+导师+审核者.
- **R2** 视频许可或肖像同意不完整 (中 / 高) → 拍摄前签核 + 素材台账; 回退: 移除媒体用自制占位.
- **R3** SVG 来源/许可不清 (中 / 中) → 优先自绘 + 记录 CC 许可; 回退: 重绘简化图.
- **R4** 12–18 条视频工作量失控 (高 / 中) → 先跑通一条流水线 + 批量模板; 回退: 每部位 2 条，第三条延期.
- **R5** 霓虹动画影响可读性/舒适度 (中 / 中) → WCAG 检查 + reduced-motion; 回退: 静态高亮 + 无粒子.
- **R6** Next.js/依赖安全更新 (中 / 高) → 使用支持版本 + 锁文件; 回退: 升级补丁版并全回归.
- **R7** 现场网络或视频加载失败 (中 / 高) → 媒体预算 + 本地离线闭环; 回退: 30 秒内切换离线演示.
- **R8** 10 人研究数据被过度解读 (中 / 中) → 预注册描述性分析 + 限制; 回退: 删改超范围结论并由导师复核.

## 9. Release gates (prop. §11, p.10) — RG-1…RG-7
- **RG-1** BR-01…BR-15 全部有通过证据；enhancement 可延期但不能伪装完成.
- **RG-2** lint、typecheck、unit、E2E、a11y、content validation、production build 全通过.
- **RG-3** 所有发布动作经专业审核；所有媒体和 SVG 有许可/同意记录.
- **RG-4** 所有视频有字幕和描述性转录；核心路径可键盘完成并支持减少动画.
- **RG-5** 10 人数据匿名、原始数据只读、分析可重跑，结论包含限制.
- **RG-6** 生产烟雾测试、离线回退和回滚演练通过.
- **RG-7** 最终演示不泄露研究原始数据、同意书、密钥或本地路径.

## 10. Tech & version baseline (prop. §6, p.6; refs p.11)
- Static-first Next.js App Router + TypeScript + Tailwind + Framer Motion + SVG + Vercel.
- New repository uses the **Next.js 16.2.11 Active LTS** patch line and **Node.js 24 LTS** (do not lock to Next.js 14). Actual versions must be written to `package-lock.json` and `setup-versions.txt` in S05.
- Environment check: `scripts/check-environment.mjs` requires Node 24 LTS. Current: **Node v24.18.0 → PASS**.
- Reference links (Next.js/Node/WCAG/W3C captions-transcripts/AAOS/OpenMoji) are for version, safety, accessibility, and licensing checks only; they do **not** replace professional health content review.

## 11. Open items / unknowns (explicit, not fabricated)
- **O-1** Page-count discrepancy: TASKS.md and S01 text say "13 页提案"; the authoritative PDF is **11 pages**. Confirm canonical source with student/mentor.
- **O-2** Professional reviewer not yet named (DC-3).
- **O-3** Final original vs third-party SVG choice unresolved (DC-2).
- **O-4** Media hosting local-first until performance budget is measured (DC-5).
- **O-5** Student/mentor manual sign-off on this ledger: **pending**.
- **O-6** Application/repository not yet initialized (`package.json`, etc.); scheduled for S05. S01 is documentation only.

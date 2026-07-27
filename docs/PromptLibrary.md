# RecoverMate Session Prompt Pack

> Initialize `TASKS.md` once. For each session, paste only the current prompt into the active unit.

## P1 · 证据、范围与产品契约

# S01 基线台账与完整垂直切片

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P1 — 证据、范围与产品契约
Prior-state requirement: 仓库可以为空；必须先阅读基线摘要与全局工程契约。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
把学生方案转换为不可丢失的需求台账，并定义“脚踝→动作卡→视频/步骤→计时→完成”的最小完整闭环。

# Scope
- 创建需求台账
- 给每项需求分配验证证据
- 定义核心、增强与明确不做项

# Requirements
Knowledge/research concepts:
- 权威基线与建议项的区分
- 需求可追溯性
- 垂直切片与范围边界

Files and modules in scope:
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Traceability.md

Student manual work that must not be fabricated:
- 逐条核对 13 页提案
- 确认六个部位的默认集合
- 记录仍需导师/专业人员决定的事项

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Traceability.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 人工比对基线功能清单
- 检查每项需求都有会话和验证方式

Acceptance:
- 所有基线功能均有唯一编号
- 垂直切片可在无后端条件下完整演示
- 未知项未被伪造为事实

Evidence to save:
- baseline-ledger.md
- traceability-review-S01.md

# Security and Safety
- 不写任何医疗功效承诺
- 真实姓名、健康史和账号信息不进入样例数据
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要初始化完整应用
- 不要提前设计所有页面
- 不要把可选运动入口升级为核心阻塞项
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S01 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S01's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S02 健康边界与内容证据协议

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P1 — 证据、范围与产品契约
Prior-state requirement: S01 需求台账已通过；未知健康内容仍保持占位状态。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
建立动作内容的来源、许可、专业审核、停止信号和升级建议字段，使产品是一般性指导而不是诊断工具。

# Scope
- 编写内容政策
- 定义 reviewStatus 与 source ledger
- 制定页面级安全提示规则

# Requirements
Knowledge/research concepts:
- 健康信息与医疗建议的边界
- 来源可追溯
- 内容审核状态机
- 青少年内容安全

Files and modules in scope:
- docs/ContentSafetyPolicy.md
- docs/SourceLedger.md
- config/content-policy.json

Student manual work that must not be fabricated:
- 与合格体育/康复专业人员确认审核流程
- 标注可接受与不可接受的措辞

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- docs/ContentSafetyPolicy.md
- docs/SourceLedger.md
- config/content-policy.json

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- JSON 结构校验
- 对 3 个危险措辞做拒绝测试
- 检查安全提示在所有动作详情可见

Acceptance:
- 未审核动作不能进入发布构建
- 每个动作有来源、许可与审核状态
- 红旗提示不被视觉效果遮挡

Evidence to save:
- content-policy-v1.md
- unsafe-copy-test.md

# Security and Safety
- 严重疼痛、明显肿胀、无法负重/活动、麻木或持续影响运动表现时停止并寻求专业评估
- 不建议用户通过网站自我诊断
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要编造 ACSM 或其他机构背书
- 不要把“酸痛”自动解释为某种损伤
- 不要用免责声明掩盖不可靠内容
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S02 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S02's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S03 形成性研究设计与成功指标

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P1 — 证据、范围与产品契约
Prior-state requirement: S02 的安全与隐私规则已固定。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
设计 10 名同学的可用性研究，以人体图导航与简化列表原型对比，得到可解释但不过度外推的证据。

# Scope
- 定义任务脚本
- 设计 AB/BA 两组顺序
- 建立匿名记录表和停止规则

# Requirements
Knowledge/research concepts:
- 形成性研究
- 任务成功率
- 中位任务时间
- 顺序效应与对照顺序

Files and modules in scope:
- docs/ResearchProtocol.md
- data/templates/usability-observations.csv
- docs/ConsentScript.md

Student manual work that must not be fabricated:
- 选择 10 名志愿者并获得适当同意
- 准备不含健康史的问题
- 试跑一次计时流程

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- docs/ResearchProtocol.md
- data/templates/usability-observations.csv
- docs/ConsentScript.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 检查记录表无姓名/健康信息
- 两种顺序各 5 人
- 所有任务有明确开始与结束条件

Acceptance:
- 研究问题、指标、排除规则明确
- 小样本限制写入计划
- 任何参与者可随时停止

Evidence to save:
- research-protocol-v1.md
- pilot-observation.csv

# Security and Safety
- 不收集诊断、伤病史或不必要的个人数据
- 参与者不需要实际完成可能引起不适的动作
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要承诺统计显著性
- 不要把同学反馈当作医学有效性证据
- 不要诱导参与者报告疼痛
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S03 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S03's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S04 信息架构、用户旅程与界面蓝图

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P1 — 证据、范围与产品契约
Prior-state requirement: S01–S03 的范围、安全和研究契约已通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
把提案中的七步体验落成页面、状态、路由和响应式布局蓝图。

# Scope
- 定义首页、部位页、动作页和流程模式
- 绘制桌面/移动断点
- 列出加载/空/错误状态

# Requirements
Knowledge/research concepts:
- 信息架构
- 状态流
- 移动优先
- 可访问交互模式

Files and modules in scope:
- docs/UXBlueprint.md
- docs/StateModel.md
- docs/Architecture.md

Student manual work that must not be fabricated:
- 手绘或 Figma 完成关键屏幕
- 让导师检查信息优先级
- 确认不依赖 hover 才能操作

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- docs/UXBlueprint.md
- docs/StateModel.md
- docs/Architecture.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 键盘/触控路径走查
- 每个状态均有返回路径
- 安全提示与主要动作不冲突

Acceptance:
- 七步用户体验全部可映射到页面和状态
- 正面/背面切换有明确控制
- 移动端无需横向滚动

Evidence to save:
- ux-flow-S04.png
- state-review-S04.md

# Security and Safety
- 安全提示位于动作开始前
- 视觉“酷感”不得降低信息可读性
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要开始大规模视觉打磨
- 不要增加账号、社交或诊断流程
- 不要用颜色作为唯一状态提示
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S04 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S04's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


## P2 · 工程基础与交互式人体图

# S05 仓库初始化、版本锁定与设计令牌

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P2 — 工程基础与交互式人体图
Prior-state requirement: P1 退出门禁通过；Node 24 LTS、Git 和编辑器已验证。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
在受支持的 LTS 版本上建立可运行的 Next.js App Router 工程、质量脚本和赛博运动设计令牌。

# Scope
- create-next-app 初始化
- 安装动画/校验/测试依赖
- 配置 lint、typecheck、test、build
- 建立暗色和霓虹令牌

# Requirements
Knowledge/research concepts:
- 可重复构建
- 锁文件
- 设计令牌
- 静态优先架构

Files and modules in scope:
- package.json
- package-lock.json
- app/layout.tsx
- app/globals.css
- .gitignore
- .env.example

Student manual work that must not be fabricated:
- 执行安装命令
- 创建 Git 初始检查点
- 记录实际依赖版本

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- package.json
- package-lock.json
- app/layout.tsx
- app/globals.css
- .gitignore
- .env.example

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- npm run lint
- npm run typecheck
- npm test
- npm run build

Acceptance:
- 四项命令通过
- 无密钥或本地数据库入库
- 设计令牌覆盖背景、文字、焦点、强调与减少动画

Evidence to save:
- setup-versions.txt
- test-report-S05.txt
- homepage-S05.png

# Security and Safety
- 使用当前受支持的 Next.js 安全版本
- 默认不开启用户追踪
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要复制旧 Next.js 14 依赖锁
- 不要使用 @latest 后丢弃锁文件
- 不要实现人体图
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S05 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S05's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S06 前视人体 SVG 与语义热点

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P2 — 工程基础与交互式人体图
Prior-state requirement: S05 工程和令牌通过；SVG 来源与许可已记录。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
完成前视人体轮廓及肩、手臂、膝、踝等语义热点，使每个区域可聚焦、可识别、可测试。

# Scope
- 制作前视 SVG
- 建立 BodyPart 组件
- 加入非颜色提示和焦点环
- 扩大移动端命中区

# Requirements
Knowledge/research concepts:
- SVG viewBox
- path/group 命名
- 命中区域
- ARIA 名称与焦点顺序

Files and modules in scope:
- public/body-front.svg
- components/BodyPart.tsx
- components/BodyMapFront.tsx
- tests/body-map-front.test.tsx

Student manual work that must not be fabricated:
- 在 Figma/矢量工具调整轮廓
- 逐项检查 id 命名
- 保存原创过程或许可证明

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- public/body-front.svg
- components/BodyPart.tsx
- components/BodyMapFront.tsx
- tests/body-map-front.test.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 键盘 Tab/Enter/Space 测试
- 触控热点尺寸检查
- 自动化查询每个 aria-label

Acceptance:
- 所有计划热点均可键盘激活
- 热点不重叠导致误选
- 许可记录可追溯

Evidence to save:
- body-front-S06.png
- svg-license-S06.md
- test-report-S06.txt

# Security and Safety
- 人体图仅作为导航示意，不显示诊断性解剖结论
- 避免刺激性伤情图像
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要粘贴来源不明的人体 SVG
- 不要只实现 hover
- 不要把左右侧误映射
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S06 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S06's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S07 后视人体图、切换与触控/键盘兼容

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P2 — 工程基础与交互式人体图
Prior-state requirement: 前视热点测试通过；共享 BodyPart API 已稳定。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
完成后视人体图，并实现前后切换、清晰方向标记和跨输入方式一致交互。

# Scope
- 添加后视 SVG
- 实现切换控制
- 在切换后保留合理焦点
- 标注左右方向

# Requirements
Knowledge/research concepts:
- 视图状态
- 方向认知
- pointer 与 keyboard 事件统一
- focus retention

Files and modules in scope:
- public/body-back.svg
- components/BodyMapBack.tsx
- components/BodyMapSwitcher.tsx
- tests/body-map-switcher.test.tsx

Student manual work that must not be fabricated:
- 核对腰背和小腿区域位置
- 手机实机测试
- 邀请一名同学做无指导走查

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- public/body-back.svg
- components/BodyMapBack.tsx
- components/BodyMapSwitcher.tsx
- tests/body-map-switcher.test.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 前后切换回归测试
- 触控 tap 测试
- 屏幕阅读器名称检查

Acceptance:
- 前/后状态可被辅助技术识别
- 所有部位在至少一个视图中可达
- 切换不丢失页面上下文

Evidence to save:
- body-back-S07.png
- mobile-touch-S07.mp4
- test-report-S07.txt

# Security and Safety
- 避免把视觉部位选择描述为伤病判断
- 不记录用户选择
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要通过替换 viewBox 隐藏语义
- 不要添加手势作为唯一操作
- 不要开始动作内容填充
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S07 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S07's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S08 BodyMap 状态、数据契约与路由

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P2 — 工程基础与交互式人体图
Prior-state requirement: S06–S07 视觉热点和输入兼容已通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
把选择、悬停、焦点、视图和路由参数连接到类型安全的数据契约。

# Scope
- 定义 BodyPart schema
- 创建查询函数
- 实现部位路由
- 添加空/无效状态

# Requirements
Knowledge/research concepts:
- 受控状态
- 路由参数
- 数据规范化
- 无效参数处理

Files and modules in scope:
- types/content.ts
- schemas/body-part.ts
- data/body-parts.json
- lib/content.ts
- app/body/[part]/page.tsx

Student manual work that must not be fabricated:
- 填写六部位元数据草案
- 逐个核对 svgIds
- 记录未审内容为 blocked

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- types/content.ts
- schemas/body-part.ts
- data/body-parts.json
- lib/content.ts
- app/body/[part]/page.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- schema validation
- 有效/无效 route tests
- 浏览器前进后退测试

Acceptance:
- 六部位 ID 唯一
- 无效 URL 显示安全错误页
- 路由不依赖客户端私有状态

Evidence to save:
- schema-report-S08.txt
- route-evidence-S08.png

# Security and Safety
- 数据字段不能隐含诊断
- 未审核动作查询结果默认排除
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要硬编码卡片内容到组件
- 不要静默吞掉无效 ID
- 不要引入数据库
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S08 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S08's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S09 脚踝垂直切片验收

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P2 — 工程基础与交互式人体图
Prior-state requirement: S08 数据与路由契约通过；一条可公开使用的审核占位内容可用。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
打通脚踝热点到一张动作卡、动作详情、占位计时与完成状态的端到端闭环。

# Scope
- 连接 BodyMap 到部位页
- 显示一张安全卡片
- 进入动作页
- 用明确占位实现完成状态

# Requirements
Knowledge/research concepts:
- 端到端切片
- 薄实现
- 验收驱动开发
- 演示回退

Files and modules in scope:
- app/page.tsx
- components/ExerciseCard.tsx
- app/exercise/[id]/page.tsx
- tests/e2e/ankle-slice.spec.ts

Student manual work that must not be fabricated:
- 完成真实浏览器走查
- 保存桌面和移动截图
- 记录所有临时占位

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- app/page.tsx
- components/ExerciseCard.tsx
- app/exercise/[id]/page.tsx
- tests/e2e/ankle-slice.spec.ts

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 端到端测试
- 404/未审核内容测试
- 刷新深链测试

Acceptance:
- 五步切片无断点
- 所有占位清楚标记且不能误认为医学内容
- 刷新和直接 URL 可用

Evidence to save:
- ankle-slice-S09.mp4
- e2e-report-S09.txt

# Security and Safety
- 动作开始前显示停止/求助边界
- 占位视频不得含未经授权人物
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要扩展到六部位
- 不要把临时代码复制 18 次
- 不要宣称完整功能已完成
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S09 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S09's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


## P3 · 内容系统与媒体制作

# S10 动作内容 Schema 与构建时校验

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P3 — 内容系统与媒体制作
Prior-state requirement: 脚踝切片稳定；组件接口已冻结。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
定义 12–18 个动作所需的结构、媒体、来源、审核和可访问性字段，并让构建在内容不合格时失败。

# Scope
- 扩展 Exercise schema
- 验证 body-to-exercise 引用
- 校验字幕/转录/视频文件
- 生成内容检查报告

# Requirements
Knowledge/research concepts:
- 内容即数据
- Zod 校验
- 引用完整性
- 发布门禁

Files and modules in scope:
- schemas/exercise.ts
- data/exercises.json
- scripts/validate-content.ts
- tests/content-schema.test.ts

Student manual work that must not be fabricated:
- 和专业审核者确认字段
- 定义难度标签的非医疗含义
- 列出六部位目标数量

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- schemas/exercise.ts
- data/exercises.json
- scripts/validate-content.ts
- tests/content-schema.test.ts

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 缺字段、坏 URL、未审核、重复 ID、孤儿媒体测试
- npm run validate:content

Acceptance:
- 任何发布动作均有来源、审核、许可、字幕/转录与停止信号
- 坏引用阻断构建

Evidence to save:
- content-validation-S10.txt
- schema-decisions-S10.md

# Security and Safety
- 难度表示动作复杂度，不表示伤势等级
- 不存储用户健康数据
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要先填满动作再补来源
- 不要允许 reviewStatus 缺省为 approved
- 不要把 JSON 当自由文本垃圾箱
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S10 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S10's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S11 来源台账、专业审核与内容锁定

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P3 — 内容系统与媒体制作
Prior-state requirement: S10 schema 与发布门禁通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
选择六部位每部位 2–3 个候选动作，并通过来源与专业审核流程锁定可拍摄清单。

# Scope
- 填充来源台账
- 记录审核意见
- 锁定动作 ID 与拍摄状态
- 拒绝不合格候选

# Requirements
Knowledge/research concepts:
- 证据层级
- 版本化审核
- 内容差异记录
- 许可和署名

Files and modules in scope:
- docs/SourceLedger.md
- docs/ContentReviewLog.md
- data/exercises.json

Student manual work that must not be fabricated:
- 预约审核
- 逐项记录批准/修改/拒绝
- 确认出演者与素材许可

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- docs/SourceLedger.md
- docs/ContentReviewLog.md
- data/exercises.json

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 每个候选内容的证据完整性检查
- blocked 项无法通过构建

Acceptance:
- 六部位各至少 2 个可拍摄动作
- 所有文本由审核者签核
- 许可路径清楚

Evidence to save:
- review-signoff-S11.pdf
- source-ledger-S11.csv

# Security and Safety
- 内容审核者必须具备适当资格
- 任何矛盾意见进入已知问题而非被隐藏
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要自行“修正”专业意见
- 不要伪造审核签名
- 不要把品牌参考图当可用素材
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S11 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S11's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S12 拍摄规范、分镜与首条视频采集

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P3 — 内容系统与媒体制作
Prior-state requirement: 动作清单已锁定；出演者同意与场地安全已确认。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
用手机与三脚架拍摄一条可评审的双角度动作视频，并同步保留同意与镜头记录。

# Scope
- 建立 shot list
- 拍摄正面与侧面
- 记录 take 选择
- 保存原始媒体清单

# Requirements
Knowledge/research concepts:
- 镜头连续性
- 可理解动作示范
- 安全拍摄
- 媒体权利

Files and modules in scope:
- docs/VideoProductionProtocol.md
- media/production-log.csv
- media/raw/README.md

Student manual work that must not be fabricated:
- 布置干净背景和稳定光线
- 检查动作空间
- 拍摄口述说明与无声替代镜头

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- docs/VideoProductionProtocol.md
- media/production-log.csv
- media/raw/README.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 画面完整性检查
- 声音/曝光/稳定性检查
- 同意文件和 take ID 对应检查

Acceptance:
- 动作关键姿态未被裁切
- 素材权利清楚
- 不安全或含敏感背景的 take 被拒绝

Evidence to save:
- pilot-raw-contact-sheet-S12.jpg
- production-log-S12.csv

# Security and Safety
- 拍摄前清场并评估跌倒风险
- 不要求出演者忍痛完成动作
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要拍摄真实受伤展示
- 不要把未经同意的人拍入背景
- 不要删除原始审核记录
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S12 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S12's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S13 视频编辑、字幕、转录与媒体优化

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P3 — 内容系统与媒体制作
Prior-state requirement: S12 首条视频素材与权利记录通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
将首条素材剪成网页版本、3 秒预览、字幕和描述性转录，并建立可复制的媒体流水线。

# Scope
- 导出 MP4
- 生成预览和 poster
- 编写 VTT 字幕与转录
- 校验路径和元数据

# Requirements
Knowledge/research concepts:
- 编码与码率
- poster/preview
- WebVTT
- 描述性转录
- 媒体回退

Files and modules in scope:
- public/videos/pilot.mp4
- public/videos/pilot-preview.mp4
- public/captions/pilot.vtt
- public/transcripts/pilot.md
- data/exercises.json

Student manual work that must not be fabricated:
- 人工校对字幕时序
- 由审核者复核屏幕文字和口述
- 手机网络条件下试播

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- public/videos/pilot.mp4
- public/videos/pilot-preview.mp4
- public/captions/pilot.vtt
- public/transcripts/pilot.md
- data/exercises.json

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 浏览器播放测试
- 字幕轨启用测试
- 文件大小预算
- 无音频情况下可理解性检查

Acceptance:
- 主视频、预览、poster、字幕、转录均可用
- 字幕准确
- 媒体预算未超标

Evidence to save:
- media-report-S13.txt
- caption-review-S13.md

# Security and Safety
- 删除可能暴露地点/身份的元数据
- 不要把字幕当作唯一的步骤说明
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要自动生成字幕后不校对
- 不要用未授权音乐
- 不要一次批量处理全部视频
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S13 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S13's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


## P4 · 核心恢复体验

# S14 动作卡片、筛选与渐进呈现

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P4 — 核心恢复体验
Prior-state requirement: P3 媒体流水线通过；至少一条完整媒体可用。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
实现毛玻璃动作卡、审核状态过滤、桌面侧滑和移动端下滑布局。

# Scope
- 完成 ExerciseCard
- 接入部位查询
- 实现 skeleton/empty/error
- 加入键盘和 reduced-motion 行为

# Requirements
Knowledge/research concepts:
- 可组合卡片
- 响应式布局
- 渐进动画
- 内容状态过滤

Files and modules in scope:
- components/ExerciseCard.tsx
- components/ExercisePanel.tsx
- tests/exercise-card.test.tsx

Student manual work that must not be fabricated:
- 对比桌面/手机卡片密度
- 检查文字与标签可读性
- 确认卡片预览默认静音

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- components/ExerciseCard.tsx
- components/ExercisePanel.tsx
- tests/exercise-card.test.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 组件测试
- 未审核内容不可见
- 键盘激活和焦点样式
- 移动端截图

Acceptance:
- 卡片显示名称、时长、难度、肌群与预览
- 布局无横向溢出
- 空状态可行动

Evidence to save:
- card-desktop-S14.png
- card-mobile-S14.png
- test-report-S14.txt

# Security and Safety
- 标签不暗示诊断或保证效果
- 自动播放预览必须静音且可被减少
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要一次加载所有完整视频
- 不要把预览作为背景无限播放
- 不要隐藏来源状态
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S14 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S14's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S15 动作详情路由与可访问视频播放器

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P4 — 核心恢复体验
Prior-state requirement: S14 卡片可正确导航到审核动作。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
实现可深链动作详情页、原生可控视频、字幕、转录入口、分步文字和安全提示。

# Scope
- 实现详情 route
- 配置 controls/track/poster
- 显示步骤、来源、审核和停止信号
- 处理无效 ID

# Requirements
Knowledge/research concepts:
- 静态参数生成
- HTML 视频可访问性
- 深链/刷新
- 安全信息层级

Files and modules in scope:
- app/exercise/[id]/page.tsx
- components/VideoPlayer.tsx
- components/SafetyNotice.tsx
- tests/exercise-page.test.tsx

Student manual work that must not be fabricated:
- 用键盘完成播放/暂停/字幕操作
- 核对移动端全屏行为
- 审核中文文案

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- app/exercise/[id]/page.tsx
- components/VideoPlayer.tsx
- components/SafetyNotice.tsx
- tests/exercise-page.test.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 有效/无效 route 测试
- 字幕和转录链接测试
- 浏览器刷新测试

Acceptance:
- 无 JavaScript 异常
- 字幕可启用
- 步骤无需播放视频也可读
- 安全提示位于开始前

Evidence to save:
- exercise-page-S15.png
- a11y-video-S15.md

# Security and Safety
- 播放器不自动开始可能引起动作的内容
- 页面明确不替代专业评估
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要自制不可访问的播放控件替代原生控件
- 不要隐藏下载/许可限制
- 不要收集观看行为
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S15 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S15's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S16 环形计时器状态机与数学验证

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P4 — 核心恢复体验
Prior-state requirement: S15 播放器和动作数据稳定。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
实现空闲、运行、暂停、完成、重置状态，并用结构化计时公式验证环形进度。

# Scope
- 实现 Timer reducer/hook
- 连接可视进度
- 暂停/恢复/重置
- 处理后台标签页

# Requirements
Knowledge/research concepts:
- 有限状态机
- 时间漂移
- SVG stroke dash
- 边界值测试

Files and modules in scope:
- components/Timer.tsx
- hooks/useExerciseTimer.ts
- lib/timer-math.ts
- tests/timer.test.ts

Student manual work that must not be fabricated:
- 用秒表核对 30/60/90 秒
- 测试切换标签页
- 检查屏幕阅读器剩余时间播报频率

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- components/Timer.tsx
- hooks/useExerciseTimer.ts
- lib/timer-math.ts
- tests/timer.test.ts

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- fake timers 单元测试
- 0、1、T、T+1 边界
- 暂停后不继续递减

Acceptance:
- 状态转换确定且可重复
- 视觉进度与剩余时间一致
- 完成事件只触发一次

Evidence to save:
- timer-tests-S16.txt
- timer-demo-S16.mp4

# Security and Safety
- 计时器是跟随工具，不要求用户忍痛坚持到零
- 提供立即停止和重置
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要依赖 setInterval 次数当作真实时间
- 不要在渲染期间触发完成副作用
- 不要实现下一节同步
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S16 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S16's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S17 分步指引、播放器与计时同步

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P4 — 核心恢复体验
Prior-state requirement: S16 计时器状态机测试通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
让视频、步骤高亮和计时器在用户控制下协调工作，并在暂停/跳转时保持一致。

# Scope
- 定义 session controller
- 同步 play/pause/ended
- 允许手动步骤导航
- 保存当前步骤于页面状态

# Requirements
Knowledge/research concepts:
- 多状态协调
- 单一事实源
- 媒体事件
- 用户可控自动化

Files and modules in scope:
- components/ExerciseSession.tsx
- components/StepIndicator.tsx
- hooks/useExerciseSession.ts
- tests/exercise-session.test.tsx

Student manual work that must not be fabricated:
- 跟随首条视频完整走查
- 测试暂停后阅读步骤
- 请同学验证状态是否清楚

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- components/ExerciseSession.tsx
- components/StepIndicator.tsx
- hooks/useExerciseSession.ts
- tests/exercise-session.test.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 播放器/计时器同步测试
- seek/ended 测试
- 键盘步骤导航

Acceptance:
- 暂停视频同时暂停计时
- 用户可手动调整步骤
- 任何异常可安全重置

Evidence to save:
- session-sync-S17.mp4
- test-report-S17.txt

# Security and Safety
- 不得强迫自动进入下一动作
- 保留随时停止出口
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要创建循环依赖的多个计时器
- 不要屏蔽原生媒体错误
- 不要加入完成特效
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S17 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S17's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S18 完成反馈、粒子效果与减少动画

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P4 — 核心恢复体验
Prior-state requirement: S17 session controller 稳定。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
实现一次性完成反馈、可控下一步和 prefers-reduced-motion 回退。

# Scope
- 完成环变绿/弹跳
- 按需动态加载 confetti
- 提供静态成功提示
- 移除强制 3 秒跳转

# Requirements
Knowledge/research concepts:
- 微交互
- 一次性副作用
- 减少动画
- 可恢复完成状态

Files and modules in scope:
- components/CompletionFeedback.tsx
- components/ConfettiEffect.tsx
- app/globals.css
- tests/completion-feedback.test.tsx

Student manual work that must not be fabricated:
- 在正常与减少动画系统设置下测试
- 检查粒子不遮挡安全控件
- 验证“下一个动作”由用户确认

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- components/CompletionFeedback.tsx
- components/ConfettiEffect.tsx
- app/globals.css
- tests/completion-feedback.test.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 完成事件幂等测试
- reduced-motion 测试
- 动态 import 失败回退

Acceptance:
- 特效只触发一次
- 减少动画时无粒子/缩放
- 用户控制下一步

Evidence to save:
- completion-normal-S18.mp4
- completion-reduced-S18.mp4

# Security and Safety
- 视觉奖励不应鼓励在疼痛中继续
- 成功文案不宣称治疗效果
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要强制自动跳转
- 不要在首屏加载粒子库
- 不要用闪烁效果
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S18 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S18's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S19 响应式集成、错误状态与第一轮回归

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P4 — 核心恢复体验
Prior-state requirement: S14–S18 功能分别通过组件门禁。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
把人体图、卡片、详情、计时器和反馈整合为手机/平板/桌面均可用的核心体验。

# Scope
- 完成断点布局
- 处理视频/数据加载失败
- 加入返回和恢复路径
- 建立核心回归套件

# Requirements
Knowledge/research concepts:
- 响应式组合
- 布局稳定性
- 错误边界
- 回归测试

Files and modules in scope:
- app/page.tsx
- app/body/[part]/page.tsx
- app/exercise/[id]/page.tsx
- components/ErrorState.tsx
- tests/e2e/core-flow.spec.ts

Student manual work that must not be fabricated:
- 三种视口人工走查
- 低速网络模拟
- 真实手机触控测试

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- app/page.tsx
- app/body/[part]/page.tsx
- app/exercise/[id]/page.tsx
- components/ErrorState.tsx
- tests/e2e/core-flow.spec.ts

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 核心 E2E
- 无横向滚动
- 媒体失败可恢复
- 控制台无错误

Acceptance:
- 脚踝切片在三种视口通过
- 错误状态有下一步
- 视觉状态不丢失

Evidence to save:
- responsive-matrix-S19.pdf
- e2e-report-S19.txt

# Security and Safety
- 错误状态不建议用户自行判断伤情
- 网络失败时仍显示安全文本
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要用隐藏 overflow 掩盖布局错误
- 不要开始全量内容填充前的接口重构
- 不要忽略控制台警告
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S19 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S19's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


## P5 · 完整范围与运动流程

# S20 六部位与 12–18 条动作内容集成

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P5 — 完整范围与运动流程
Prior-state requirement: P4 组件冻结；所有待集成内容已有审核/许可状态。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
按审核与媒体流水线填充肩、手臂、腰背、膝、小腿、脚踝六部位，每部位 2–3 条动作。

# Scope
- 填充 body-parts/exercises
- 导入视频/字幕/转录/poster
- 生成内容清单
- 跑全量构建门禁

# Requirements
Knowledge/research concepts:
- 批量内容迁移
- 引用完整性
- 内容一致性
- 媒体预算

Files and modules in scope:
- data/body-parts.json
- data/exercises.json
- public/videos/**
- public/captions/**
- public/transcripts/**

Student manual work that must not be fabricated:
- 逐条视觉审查
- 审核者最终抽检
- 核对左右部位与前后视图映射

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- data/body-parts.json
- data/exercises.json
- public/videos/**
- public/captions/**
- public/transcripts/**

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- npm run validate:content
- 全量 route build
- 媒体存在性/大小检查
- 抽样 E2E

Acceptance:
- 六部位各 2–3 条已审核动作
- 无孤儿文件/坏引用
- 所有视频有字幕与转录

Evidence to save:
- content-manifest-S20.csv
- validation-S20.txt
- review-sampling-S20.md

# Security and Safety
- 任何未通过专业复核的条目保持 blocked
- 不在成片中展示个人敏感信息
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要用复制粘贴制造错误来源
- 不要为了凑数量降低审核门槛
- 不要提交原始大文件到 Git
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S20 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S20's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S21 运动类型快捷入口与部位高亮

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P5 — 完整范围与运动流程
Prior-state requirement: S20 全量内容可查询。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
实现跑步、篮球、游泳、力量、足球、通用入口，并把推荐部位作为可解释导航而非诊断结论。

# Scope
- 定义 Sport schema
- 实现快捷按钮
- 高亮相关部位
- 显示“为何推荐”文本

# Requirements
Knowledge/research concepts:
- 多对多映射
- 推荐解释
- 过滤与高亮
- 可选增强降级

Files and modules in scope:
- data/sports.json
- schemas/sport.ts
- components/SportQuickEntry.tsx
- tests/sport-entry.test.tsx

Student manual work that must not be fabricated:
- 由审核者核对运动-部位映射措辞
- 用键盘/触控测试
- 验证通用入口

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- data/sports.json
- schemas/sport.ts
- components/SportQuickEntry.tsx
- tests/sport-entry.test.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 映射 schema 测试
- 按钮/高亮测试
- 无匹配安全回退

Acceptance:
- 六种入口可达
- 推荐理由可见
- 不会把推荐写成个体化医学判断

Evidence to save:
- sports-entry-S21.png
- mapping-review-S21.md

# Security and Safety
- 使用“常见训练负荷相关区域”而非“你受伤的部位”
- 不根据用户选择推断健康状态
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要声称智能诊断
- 不要加入用户画像
- 不要阻塞直接人体图路径
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S21 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S21's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S22 运动恢复流程队列与用户控制

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P5 — 完整范围与运动流程
Prior-state requirement: S21 运动映射通过；动作时长和审核状态完整。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
实现 5–8 分钟流程的队列、上一步/下一步/退出/重启，保持用户完全控制。

# Scope
- 生成 exerciseQueue
- 实现 FlowController
- 显示进度和预计总时长
- 处理动作不可用

# Requirements
Knowledge/research concepts:
- 队列模型
- 流程状态
- 可中断自动化
- 恢复与重置

Files and modules in scope:
- lib/build-exercise-queue.ts
- components/FlowController.tsx
- app/flow/[sport]/page.tsx
- tests/flow-controller.test.tsx

Student manual work that must not be fabricated:
- 逐个运动走查
- 确认流程顺序由专业审核者批准
- 测试中途退出

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- lib/build-exercise-queue.ts
- components/FlowController.tsx
- app/flow/[sport]/page.tsx
- tests/flow-controller.test.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 队列单元测试
- 缺失动作回退
- 退出/刷新/重启测试

Acceptance:
- 队列仅含 approved 动作
- 不会自动播放下一动作
- 退出后返回清楚

Evidence to save:
- flow-basketball-S22.mp4
- queue-tests-S22.txt

# Security and Safety
- 流程不是治疗方案
- 用户可随时停止且不受负面提示
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要用倒计时强迫继续
- 不要持久化健康选择
- 不要让可选流程破坏单动作路径
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S22 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S22's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


## P6 · 质量、研究与迭代

# S23 自动化、可访问性与安全回归

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P6 — 质量、研究与迭代
Prior-state requirement: P5 全功能可运行；缺陷日志已清理到可测试状态。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
建立覆盖数据、组件、核心 E2E、键盘、对比度、减少动画和安全文案的发布回归套件。

# Scope
- 补齐单元/集成/E2E
- 自动化可访问性扫描
- 建立安全文案 snapshot/contract test
- 输出报告

# Requirements
Knowledge/research concepts:
- 测试金字塔
- axe/WCAG 检查
- 安全回归
- 测试证据

Files and modules in scope:
- tests/**
- playwright.config.ts
- vitest.config.ts
- docs/TestPlan.md
- scripts/check-safety-copy.ts

Student manual work that must not be fabricated:
- 人工键盘走查
- 屏幕阅读器抽查
- 色盲/高对比模拟

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- tests/**
- playwright.config.ts
- vitest.config.ts
- docs/TestPlan.md
- scripts/check-safety-copy.ts

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- npm test
- npm run test:e2e
- npm run test:a11y
- npm run validate:content

Acceptance:
- 核心路径全绿
- 无严重/高可访问性问题
- 安全提示不会因内容更新消失

Evidence to save:
- test-summary-S23.html
- a11y-report-S23.html
- defect-log-S23.csv

# Security and Safety
- 测试账号和样例均为虚构
- 安全失败必须阻断发布
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要跳过失败测试
- 不要只依赖自动化扫描
- 不要降低规则来让构建变绿
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S23 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S23's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S24 性能、媒体预算与离线演示回退

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P6 — 质量、研究与迭代
Prior-state requirement: S23 回归套件通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
优化首屏和媒体加载，并制作网络失败时可运行的本地演示路径。

# Scope
- 预览懒加载
- poster 与 preload 策略
- bundle 分析
- 建立本地媒体 fallback 和 demo checklist

# Requirements
Knowledge/research concepts:
- 懒加载
- 媒体预算
- 核心 Web 指标
- 演示韧性

Files and modules in scope:
- next.config.ts
- components/VideoPlayer.tsx
- docs/PerformanceBudget.md
- docs/OfflineDemo.md
- public/demo-media/**

Student manual work that must not be fabricated:
- 低端手机/慢网人工测试
- 断网演练
- 计时首屏与部位选择响应

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- next.config.ts
- components/VideoPlayer.tsx
- docs/PerformanceBudget.md
- docs/OfflineDemo.md
- public/demo-media/**

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- npm run build
- bundle report
- Lighthouse/浏览器性能记录
- offline smoke test

Acceptance:
- 首屏不下载完整视频
- 离线演示至少覆盖脚踝闭环
- 性能预算和例外有记录

Evidence to save:
- performance-S24.html
- offline-demo-S24.mp4

# Security and Safety
- 离线包只含有权分发的媒体
- 分析工具不得收集健康选择
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要用压缩破坏动作可理解性
- 不要把所有视频打包进首屏
- 不要把 Lighthouse 分数当唯一目标
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S24 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S24's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S25 10 人可用性研究执行

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P6 — 质量、研究与迭代
Prior-state requirement: 研究版本、同意脚本和记录表冻结；导师批准执行。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
按 S03 协议执行人体图与列表对照的形成性测试，记录任务结果、时间、误选和质性反馈。

# Scope
- 建立每位参与者的匿名 session ID
- 按 AB/BA 执行
- 保存观察与访谈摘要
- 登记偏差

# Requirements
Knowledge/research concepts:
- 主持一致性
- 观察记录
- 顺序控制
- 异常/退出处理

Files and modules in scope:
- data/research/raw/usability-observations.csv
- docs/ResearchRunLog.md
- data/research/raw/README.md

Student manual work that must not be fabricated:
- 主持 10 次短测
- 不提供超出脚本的提示
- 结束后做安全去敏检查

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- data/research/raw/usability-observations.csv
- docs/ResearchRunLog.md
- data/research/raw/README.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 记录完整性检查
- 两组人数检查
- 缺失值/偏差标记

Acceptance:
- 10 份匿名记录完成或明确记录退出
- 无健康史/姓名
- 未篡改失败与负面反馈

Evidence to save:
- research-run-log-S25.pdf
- anonymized-observations-S25.csv

# Security and Safety
- 参与者无需实际完成动作
- 任何不适或担忧立即停止
- 原始记录限制访问
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要边测试边改版本
- 不要删除失败任务
- 不要诱导正面评价
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S25 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S25's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S26 研究分析、证据化迭代与限制

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P6 — 质量、研究与迭代
Prior-state requirement: S25 原始数据已冻结并备份。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
计算描述性指标、编码反馈主题，并只实施由证据支持且不破坏安全边界的修订。

# Scope
- 编写分析脚本
- 生成表/图
- 将发现映射到缺陷
- 选择 1–3 项高价值修订并回归

# Requirements
Knowledge/research concepts:
- 描述性统计
- 中位数
- 任务完成率
- 质性编码
- 小样本限制

Files and modules in scope:
- scripts/analyze-usability.py
- data/research/derived/summary.csv
- docs/ResearchFindings.md
- docs/DecisionLog.md

Student manual work that must not be fabricated:
- 人工复核异常值与观察笔记
- 和导师讨论是否修订
- 记录未采纳建议的理由

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- scripts/analyze-usability.py
- data/research/derived/summary.csv
- docs/ResearchFindings.md
- docs/DecisionLog.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 脚本重跑一致
- 原始数据不被修改
- 修订后完整回归

Acceptance:
- 完成率与中位时间可复现
- 结论不超出 10 人样本
- 每项修改有证据链接

Evidence to save:
- research-summary-S26.pdf
- analysis-output-S26.csv
- regression-S26.txt

# Security and Safety
- 只报告匿名汇总
- 不把导航偏好解释为健康效果
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要做无依据显著性宣称
- 不要挑选性删除数据
- 不要在分析脚本中改原始文件
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S26 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S26's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


## P7 · 发布、展示与答辩

# S27 Vercel 部署、烟雾测试与回滚

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P7 — 发布、展示与答辩
Prior-state requirement: P6 候选版本通过全部门禁；发布清单签核。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
发布锁定版本，完成自定义域名可选配置、生产烟雾测试、日志最小化和一键回滚演练。

# Scope
- 连接 Vercel
- 配置生产构建
- 执行 smoke tests
- 记录部署与回滚步骤
- 准备本地演示副本

# Requirements
Knowledge/research concepts:
- 生产构建
- 环境分离
- 部署烟雾测试
- 版本回滚

Files and modules in scope:
- vercel.json（仅在需要时）
- docs/DeploymentGuide.md
- docs/RecoveryGuide.md
- docs/ReleaseChecklist.md

Student manual work that must not be fabricated:
- 在真实网络和手机上测试生产 URL
- 演练回滚到前一版本
- 确认无敏感日志

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- vercel.json（仅在需要时）
- docs/DeploymentGuide.md
- docs/RecoveryGuide.md
- docs/ReleaseChecklist.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 生产首页/深链/媒体/字幕 smoke
- 404/错误状态
- 回滚演练
- 安全头检查

Acceptance:
- 生产核心闭环通过
- 回滚可在演示前执行
- 离线方案独立可用

Evidence to save:
- release-S27.txt
- production-smoke-S27.pdf
- rollback-S27.mp4

# Security and Safety
- 不上传原始同意书或研究原始数据
- 生产日志不记录部位选择
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要在最后时刻升级依赖
- 不要把密钥放到客户端
- 不要删除前一稳定部署
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S27 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S27's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


# S28 报告、演示、竞赛叙事与答辩

# Role
Act as the implementation partner for this bounded InnovationLab session. Preserve Jeremy Hong's RecoverMate baseline and the approved static-first architecture.

# Read First
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Architecture.md
- docs/ContentSafetyPolicy.md
- All files listed in this session before editing

# Current State
Active phase: P7 — 发布、展示与答辩
Prior-state requirement: S27 生产和离线版本均通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
把产品、研究、技术、安全、限制和证据整合为可重复的 3–5 分钟演示与正式答辩材料。

# Scope
- 完成报告/海报/演示稿
- 编写现场脚本
- 准备故障分支
- 建立 Q&A 证据索引

# Requirements
Knowledge/research concepts:
- 问题—证据—设计—结果叙事
- 可复现演示
- 限制陈述
- 技术答辩

Files and modules in scope:
- docs/FinalReport.md
- docs/DemoScript.md
- docs/DefenseQandA.md
- docs/EvidenceIndex.md

Student manual work that must not be fabricated:
- 至少两次计时彩排
- 一次断网彩排
- 导师模拟提问
- 核对署名与许可

# Implementation Sequence
1. Inspect the current repository and confirm the prior-state requirement.
2. Run the existing verification commands and record the baseline results.
3. Create a checkpoint before making changes.
4. Implement the smallest bounded change that satisfies this session only.
5. Keep the project runnable after every small step.
6. Run the listed tests and complete the manual checks with the student.
7. Update TASKS.md without deleting prior decisions, issues, or evidence.
8. Stop at the declared session boundary.

# Files
Create or modify only:
- docs/FinalReport.md
- docs/DemoScript.md
- docs/DefenseQandA.md
- docs/EvidenceIndex.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 演示 5 分钟内完成
- 每项结果可指向证据
- 离线切换不超过 30 秒

Acceptance:
- 明确展示学生原创决策
- 健康边界和研究限制主动说明
- 所有引用和许可完整

Evidence to save:
- final-demo-S28.mp4
- final-evidence-index.pdf
- rehearsal-notes-S28.md

# Security and Safety
- 不把原型展示成医疗器械
- 不展示参与者原始数据或同意文件
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要现场依赖唯一网络路径
- 不要隐瞒失败或限制
- 不要加入未测试功能
- Do not implement future sessions early.
- Do not hard-code secrets, fabricate content approval, invent research results, suppress errors, or claim tests passed without running them.
- Do not replace working architecture without explicit approval.

# Completion Report
Report:
1. changed files;
2. commands/tests run and exact results;
3. manual checks completed by the student;
4. evidence paths;
5. remaining limitations and known issues;
6. checkpoint/rollback reference;
7. next safe preparation only.

# TASKS.md Update
Mark S28 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S28's criteria pass, or when a blocker requires a human decision. Do not begin the next session.


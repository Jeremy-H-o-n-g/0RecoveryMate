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

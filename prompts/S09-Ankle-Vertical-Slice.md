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

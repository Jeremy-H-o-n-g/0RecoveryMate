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

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

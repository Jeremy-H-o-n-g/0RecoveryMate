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

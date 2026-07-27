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

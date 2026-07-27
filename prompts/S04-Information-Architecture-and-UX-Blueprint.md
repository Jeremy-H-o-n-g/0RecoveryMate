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

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

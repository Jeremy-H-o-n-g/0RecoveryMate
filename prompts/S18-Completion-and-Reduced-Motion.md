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

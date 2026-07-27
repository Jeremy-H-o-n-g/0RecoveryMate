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

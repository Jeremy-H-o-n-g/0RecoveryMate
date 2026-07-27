# S24 性能、媒体预算与离线演示回退

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
Active phase: P6 — 质量、研究与迭代
Prior-state requirement: S23 回归套件通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
优化首屏和媒体加载，并制作网络失败时可运行的本地演示路径。

# Scope
- 预览懒加载
- poster 与 preload 策略
- bundle 分析
- 建立本地媒体 fallback 和 demo checklist

# Requirements
Knowledge/research concepts:
- 懒加载
- 媒体预算
- 核心 Web 指标
- 演示韧性

Files and modules in scope:
- next.config.ts
- components/VideoPlayer.tsx
- docs/PerformanceBudget.md
- docs/OfflineDemo.md
- public/demo-media/**

Student manual work that must not be fabricated:
- 低端手机/慢网人工测试
- 断网演练
- 计时首屏与部位选择响应

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
- next.config.ts
- components/VideoPlayer.tsx
- docs/PerformanceBudget.md
- docs/OfflineDemo.md
- public/demo-media/**

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- npm run build
- bundle report
- Lighthouse/浏览器性能记录
- offline smoke test

Acceptance:
- 首屏不下载完整视频
- 离线演示至少覆盖脚踝闭环
- 性能预算和例外有记录

Evidence to save:
- performance-S24.html
- offline-demo-S24.mp4

# Security and Safety
- 离线包只含有权分发的媒体
- 分析工具不得收集健康选择
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要用压缩破坏动作可理解性
- 不要把所有视频打包进首屏
- 不要把 Lighthouse 分数当唯一目标
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
Mark S24 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S24's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

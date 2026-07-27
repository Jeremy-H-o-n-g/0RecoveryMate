# S23 自动化、可访问性与安全回归

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
Prior-state requirement: P5 全功能可运行；缺陷日志已清理到可测试状态。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
建立覆盖数据、组件、核心 E2E、键盘、对比度、减少动画和安全文案的发布回归套件。

# Scope
- 补齐单元/集成/E2E
- 自动化可访问性扫描
- 建立安全文案 snapshot/contract test
- 输出报告

# Requirements
Knowledge/research concepts:
- 测试金字塔
- axe/WCAG 检查
- 安全回归
- 测试证据

Files and modules in scope:
- tests/**
- playwright.config.ts
- vitest.config.ts
- docs/TestPlan.md
- scripts/check-safety-copy.ts

Student manual work that must not be fabricated:
- 人工键盘走查
- 屏幕阅读器抽查
- 色盲/高对比模拟

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
- tests/**
- playwright.config.ts
- vitest.config.ts
- docs/TestPlan.md
- scripts/check-safety-copy.ts

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- npm test
- npm run test:e2e
- npm run test:a11y
- npm run validate:content

Acceptance:
- 核心路径全绿
- 无严重/高可访问性问题
- 安全提示不会因内容更新消失

Evidence to save:
- test-summary-S23.html
- a11y-report-S23.html
- defect-log-S23.csv

# Security and Safety
- 测试账号和样例均为虚构
- 安全失败必须阻断发布
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要跳过失败测试
- 不要只依赖自动化扫描
- 不要降低规则来让构建变绿
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
Mark S23 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S23's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

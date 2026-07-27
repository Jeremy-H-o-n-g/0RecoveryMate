# S19 响应式集成、错误状态与第一轮回归

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
Prior-state requirement: S14–S18 功能分别通过组件门禁。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
把人体图、卡片、详情、计时器和反馈整合为手机/平板/桌面均可用的核心体验。

# Scope
- 完成断点布局
- 处理视频/数据加载失败
- 加入返回和恢复路径
- 建立核心回归套件

# Requirements
Knowledge/research concepts:
- 响应式组合
- 布局稳定性
- 错误边界
- 回归测试

Files and modules in scope:
- app/page.tsx
- app/body/[part]/page.tsx
- app/exercise/[id]/page.tsx
- components/ErrorState.tsx
- tests/e2e/core-flow.spec.ts

Student manual work that must not be fabricated:
- 三种视口人工走查
- 低速网络模拟
- 真实手机触控测试

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
- app/page.tsx
- app/body/[part]/page.tsx
- app/exercise/[id]/page.tsx
- components/ErrorState.tsx
- tests/e2e/core-flow.spec.ts

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 核心 E2E
- 无横向滚动
- 媒体失败可恢复
- 控制台无错误

Acceptance:
- 脚踝切片在三种视口通过
- 错误状态有下一步
- 视觉状态不丢失

Evidence to save:
- responsive-matrix-S19.pdf
- e2e-report-S19.txt

# Security and Safety
- 错误状态不建议用户自行判断伤情
- 网络失败时仍显示安全文本
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要用隐藏 overflow 掩盖布局错误
- 不要开始全量内容填充前的接口重构
- 不要忽略控制台警告
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
Mark S19 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S19's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

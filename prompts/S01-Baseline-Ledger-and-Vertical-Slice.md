# S01 基线台账与完整垂直切片

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
Prior-state requirement: 仓库可以为空；必须先阅读基线摘要与全局工程契约。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
把学生方案转换为不可丢失的需求台账，并定义“脚踝→动作卡→视频/步骤→计时→完成”的最小完整闭环。

# Scope
- 创建需求台账
- 给每项需求分配验证证据
- 定义核心、增强与明确不做项

# Requirements
Knowledge/research concepts:
- 权威基线与建议项的区分
- 需求可追溯性
- 垂直切片与范围边界

Files and modules in scope:
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Traceability.md

Student manual work that must not be fabricated:
- 逐条核对 13 页提案
- 确认六个部位的默认集合
- 记录仍需导师/专业人员决定的事项

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
- README.md
- TASKS.md
- docs/ProjectPlan.md
- docs/Traceability.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 人工比对基线功能清单
- 检查每项需求都有会话和验证方式

Acceptance:
- 所有基线功能均有唯一编号
- 垂直切片可在无后端条件下完整演示
- 未知项未被伪造为事实

Evidence to save:
- baseline-ledger.md
- traceability-review-S01.md

# Security and Safety
- 不写任何医疗功效承诺
- 真实姓名、健康史和账号信息不进入样例数据
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要初始化完整应用
- 不要提前设计所有页面
- 不要把可选运动入口升级为核心阻塞项
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
Mark S01 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S01's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

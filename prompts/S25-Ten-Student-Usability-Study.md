# S25 10 人可用性研究执行

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
Prior-state requirement: 研究版本、同意脚本和记录表冻结；导师批准执行。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
按 S03 协议执行人体图与列表对照的形成性测试，记录任务结果、时间、误选和质性反馈。

# Scope
- 建立每位参与者的匿名 session ID
- 按 AB/BA 执行
- 保存观察与访谈摘要
- 登记偏差

# Requirements
Knowledge/research concepts:
- 主持一致性
- 观察记录
- 顺序控制
- 异常/退出处理

Files and modules in scope:
- data/research/raw/usability-observations.csv
- docs/ResearchRunLog.md
- data/research/raw/README.md

Student manual work that must not be fabricated:
- 主持 10 次短测
- 不提供超出脚本的提示
- 结束后做安全去敏检查

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
- data/research/raw/usability-observations.csv
- docs/ResearchRunLog.md
- data/research/raw/README.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 记录完整性检查
- 两组人数检查
- 缺失值/偏差标记

Acceptance:
- 10 份匿名记录完成或明确记录退出
- 无健康史/姓名
- 未篡改失败与负面反馈

Evidence to save:
- research-run-log-S25.pdf
- anonymized-observations-S25.csv

# Security and Safety
- 参与者无需实际完成动作
- 任何不适或担忧立即停止
- 原始记录限制访问
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要边测试边改版本
- 不要删除失败任务
- 不要诱导正面评价
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
Mark S25 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S25's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

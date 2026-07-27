# S26 研究分析、证据化迭代与限制

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
Prior-state requirement: S25 原始数据已冻结并备份。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
计算描述性指标、编码反馈主题，并只实施由证据支持且不破坏安全边界的修订。

# Scope
- 编写分析脚本
- 生成表/图
- 将发现映射到缺陷
- 选择 1–3 项高价值修订并回归

# Requirements
Knowledge/research concepts:
- 描述性统计
- 中位数
- 任务完成率
- 质性编码
- 小样本限制

Files and modules in scope:
- scripts/analyze-usability.py
- data/research/derived/summary.csv
- docs/ResearchFindings.md
- docs/DecisionLog.md

Student manual work that must not be fabricated:
- 人工复核异常值与观察笔记
- 和导师讨论是否修订
- 记录未采纳建议的理由

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
- scripts/analyze-usability.py
- data/research/derived/summary.csv
- docs/ResearchFindings.md
- docs/DecisionLog.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 脚本重跑一致
- 原始数据不被修改
- 修订后完整回归

Acceptance:
- 完成率与中位时间可复现
- 结论不超出 10 人样本
- 每项修改有证据链接

Evidence to save:
- research-summary-S26.pdf
- analysis-output-S26.csv
- regression-S26.txt

# Security and Safety
- 只报告匿名汇总
- 不把导航偏好解释为健康效果
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要做无依据显著性宣称
- 不要挑选性删除数据
- 不要在分析脚本中改原始文件
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
Mark S26 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S26's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

# S11 来源台账、专业审核与内容锁定

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
Active phase: P3 — 内容系统与媒体制作
Prior-state requirement: S10 schema 与发布门禁通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
选择六部位每部位 2–3 个候选动作，并通过来源与专业审核流程锁定可拍摄清单。

# Scope
- 填充来源台账
- 记录审核意见
- 锁定动作 ID 与拍摄状态
- 拒绝不合格候选

# Requirements
Knowledge/research concepts:
- 证据层级
- 版本化审核
- 内容差异记录
- 许可和署名

Files and modules in scope:
- docs/SourceLedger.md
- docs/ContentReviewLog.md
- data/exercises.json

Student manual work that must not be fabricated:
- 预约审核
- 逐项记录批准/修改/拒绝
- 确认出演者与素材许可

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
- docs/SourceLedger.md
- docs/ContentReviewLog.md
- data/exercises.json

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 每个候选内容的证据完整性检查
- blocked 项无法通过构建

Acceptance:
- 六部位各至少 2 个可拍摄动作
- 所有文本由审核者签核
- 许可路径清楚

Evidence to save:
- review-signoff-S11.pdf
- source-ledger-S11.csv

# Security and Safety
- 内容审核者必须具备适当资格
- 任何矛盾意见进入已知问题而非被隐藏
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要自行“修正”专业意见
- 不要伪造审核签名
- 不要把品牌参考图当可用素材
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
Mark S11 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S11's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

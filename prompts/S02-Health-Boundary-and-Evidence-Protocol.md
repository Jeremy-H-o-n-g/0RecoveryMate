# S02 健康边界与内容证据协议

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
Prior-state requirement: S01 需求台账已通过；未知健康内容仍保持占位状态。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
建立动作内容的来源、许可、专业审核、停止信号和升级建议字段，使产品是一般性指导而不是诊断工具。

# Scope
- 编写内容政策
- 定义 reviewStatus 与 source ledger
- 制定页面级安全提示规则

# Requirements
Knowledge/research concepts:
- 健康信息与医疗建议的边界
- 来源可追溯
- 内容审核状态机
- 青少年内容安全

Files and modules in scope:
- docs/ContentSafetyPolicy.md
- docs/SourceLedger.md
- config/content-policy.json

Student manual work that must not be fabricated:
- 与合格体育/康复专业人员确认审核流程
- 标注可接受与不可接受的措辞

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
- docs/ContentSafetyPolicy.md
- docs/SourceLedger.md
- config/content-policy.json

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- JSON 结构校验
- 对 3 个危险措辞做拒绝测试
- 检查安全提示在所有动作详情可见

Acceptance:
- 未审核动作不能进入发布构建
- 每个动作有来源、许可与审核状态
- 红旗提示不被视觉效果遮挡

Evidence to save:
- content-policy-v1.md
- unsafe-copy-test.md

# Security and Safety
- 严重疼痛、明显肿胀、无法负重/活动、麻木或持续影响运动表现时停止并寻求专业评估
- 不建议用户通过网站自我诊断
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要编造 ACSM 或其他机构背书
- 不要把“酸痛”自动解释为某种损伤
- 不要用免责声明掩盖不可靠内容
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
Mark S02 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S02's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

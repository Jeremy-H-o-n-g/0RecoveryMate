# S03 形成性研究设计与成功指标

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
Prior-state requirement: S02 的安全与隐私规则已固定。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
设计 10 名同学的可用性研究，以人体图导航与简化列表原型对比，得到可解释但不过度外推的证据。

# Scope
- 定义任务脚本
- 设计 AB/BA 两组顺序
- 建立匿名记录表和停止规则

# Requirements
Knowledge/research concepts:
- 形成性研究
- 任务成功率
- 中位任务时间
- 顺序效应与对照顺序

Files and modules in scope:
- docs/ResearchProtocol.md
- data/templates/usability-observations.csv
- docs/ConsentScript.md

Student manual work that must not be fabricated:
- 选择 10 名志愿者并获得适当同意
- 准备不含健康史的问题
- 试跑一次计时流程

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
- docs/ResearchProtocol.md
- data/templates/usability-observations.csv
- docs/ConsentScript.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 检查记录表无姓名/健康信息
- 两种顺序各 5 人
- 所有任务有明确开始与结束条件

Acceptance:
- 研究问题、指标、排除规则明确
- 小样本限制写入计划
- 任何参与者可随时停止

Evidence to save:
- research-protocol-v1.md
- pilot-observation.csv

# Security and Safety
- 不收集诊断、伤病史或不必要的个人数据
- 参与者不需要实际完成可能引起不适的动作
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要承诺统计显著性
- 不要把同学反馈当作医学有效性证据
- 不要诱导参与者报告疼痛
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
Mark S03 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S03's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

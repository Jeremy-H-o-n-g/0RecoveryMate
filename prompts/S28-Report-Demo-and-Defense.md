# S28 报告、演示、竞赛叙事与答辩

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
Active phase: P7 — 发布、展示与答辩
Prior-state requirement: S27 生产和离线版本均通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
把产品、研究、技术、安全、限制和证据整合为可重复的 3–5 分钟演示与正式答辩材料。

# Scope
- 完成报告/海报/演示稿
- 编写现场脚本
- 准备故障分支
- 建立 Q&A 证据索引

# Requirements
Knowledge/research concepts:
- 问题—证据—设计—结果叙事
- 可复现演示
- 限制陈述
- 技术答辩

Files and modules in scope:
- docs/FinalReport.md
- docs/DemoScript.md
- docs/DefenseQandA.md
- docs/EvidenceIndex.md

Student manual work that must not be fabricated:
- 至少两次计时彩排
- 一次断网彩排
- 导师模拟提问
- 核对署名与许可

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
- docs/FinalReport.md
- docs/DemoScript.md
- docs/DefenseQandA.md
- docs/EvidenceIndex.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 演示 5 分钟内完成
- 每项结果可指向证据
- 离线切换不超过 30 秒

Acceptance:
- 明确展示学生原创决策
- 健康边界和研究限制主动说明
- 所有引用和许可完整

Evidence to save:
- final-demo-S28.mp4
- final-evidence-index.pdf
- rehearsal-notes-S28.md

# Security and Safety
- 不把原型展示成医疗器械
- 不展示参与者原始数据或同意文件
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要现场依赖唯一网络路径
- 不要隐瞒失败或限制
- 不要加入未测试功能
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
Mark S28 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S28's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

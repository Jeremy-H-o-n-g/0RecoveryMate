# S10 动作内容 Schema 与构建时校验

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
Prior-state requirement: 脚踝切片稳定；组件接口已冻结。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
定义 12–18 个动作所需的结构、媒体、来源、审核和可访问性字段，并让构建在内容不合格时失败。

# Scope
- 扩展 Exercise schema
- 验证 body-to-exercise 引用
- 校验字幕/转录/视频文件
- 生成内容检查报告

# Requirements
Knowledge/research concepts:
- 内容即数据
- Zod 校验
- 引用完整性
- 发布门禁

Files and modules in scope:
- schemas/exercise.ts
- data/exercises.json
- scripts/validate-content.ts
- tests/content-schema.test.ts

Student manual work that must not be fabricated:
- 和专业审核者确认字段
- 定义难度标签的非医疗含义
- 列出六部位目标数量

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
- schemas/exercise.ts
- data/exercises.json
- scripts/validate-content.ts
- tests/content-schema.test.ts

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 缺字段、坏 URL、未审核、重复 ID、孤儿媒体测试
- npm run validate:content

Acceptance:
- 任何发布动作均有来源、审核、许可、字幕/转录与停止信号
- 坏引用阻断构建

Evidence to save:
- content-validation-S10.txt
- schema-decisions-S10.md

# Security and Safety
- 难度表示动作复杂度，不表示伤势等级
- 不存储用户健康数据
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要先填满动作再补来源
- 不要允许 reviewStatus 缺省为 approved
- 不要把 JSON 当自由文本垃圾箱
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
Mark S10 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S10's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

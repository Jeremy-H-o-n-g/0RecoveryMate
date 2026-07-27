# S20 六部位与 12–18 条动作内容集成

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
Active phase: P5 — 完整范围与运动流程
Prior-state requirement: P4 组件冻结；所有待集成内容已有审核/许可状态。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
按审核与媒体流水线填充肩、手臂、腰背、膝、小腿、脚踝六部位，每部位 2–3 条动作。

# Scope
- 填充 body-parts/exercises
- 导入视频/字幕/转录/poster
- 生成内容清单
- 跑全量构建门禁

# Requirements
Knowledge/research concepts:
- 批量内容迁移
- 引用完整性
- 内容一致性
- 媒体预算

Files and modules in scope:
- data/body-parts.json
- data/exercises.json
- public/videos/**
- public/captions/**
- public/transcripts/**

Student manual work that must not be fabricated:
- 逐条视觉审查
- 审核者最终抽检
- 核对左右部位与前后视图映射

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
- data/body-parts.json
- data/exercises.json
- public/videos/**
- public/captions/**
- public/transcripts/**

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- npm run validate:content
- 全量 route build
- 媒体存在性/大小检查
- 抽样 E2E

Acceptance:
- 六部位各 2–3 条已审核动作
- 无孤儿文件/坏引用
- 所有视频有字幕与转录

Evidence to save:
- content-manifest-S20.csv
- validation-S20.txt
- review-sampling-S20.md

# Security and Safety
- 任何未通过专业复核的条目保持 blocked
- 不在成片中展示个人敏感信息
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要用复制粘贴制造错误来源
- 不要为了凑数量降低审核门槛
- 不要提交原始大文件到 Git
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
Mark S20 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S20's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

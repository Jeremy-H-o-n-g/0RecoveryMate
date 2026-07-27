# S21 运动类型快捷入口与部位高亮

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
Prior-state requirement: S20 全量内容可查询。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
实现跑步、篮球、游泳、力量、足球、通用入口，并把推荐部位作为可解释导航而非诊断结论。

# Scope
- 定义 Sport schema
- 实现快捷按钮
- 高亮相关部位
- 显示“为何推荐”文本

# Requirements
Knowledge/research concepts:
- 多对多映射
- 推荐解释
- 过滤与高亮
- 可选增强降级

Files and modules in scope:
- data/sports.json
- schemas/sport.ts
- components/SportQuickEntry.tsx
- tests/sport-entry.test.tsx

Student manual work that must not be fabricated:
- 由审核者核对运动-部位映射措辞
- 用键盘/触控测试
- 验证通用入口

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
- data/sports.json
- schemas/sport.ts
- components/SportQuickEntry.tsx
- tests/sport-entry.test.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 映射 schema 测试
- 按钮/高亮测试
- 无匹配安全回退

Acceptance:
- 六种入口可达
- 推荐理由可见
- 不会把推荐写成个体化医学判断

Evidence to save:
- sports-entry-S21.png
- mapping-review-S21.md

# Security and Safety
- 使用“常见训练负荷相关区域”而非“你受伤的部位”
- 不根据用户选择推断健康状态
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要声称智能诊断
- 不要加入用户画像
- 不要阻塞直接人体图路径
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
Mark S21 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S21's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

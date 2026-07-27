# S06 前视人体 SVG 与语义热点

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
Active phase: P2 — 工程基础与交互式人体图
Prior-state requirement: S05 工程和令牌通过；SVG 来源与许可已记录。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
完成前视人体轮廓及肩、手臂、膝、踝等语义热点，使每个区域可聚焦、可识别、可测试。

# Scope
- 制作前视 SVG
- 建立 BodyPart 组件
- 加入非颜色提示和焦点环
- 扩大移动端命中区

# Requirements
Knowledge/research concepts:
- SVG viewBox
- path/group 命名
- 命中区域
- ARIA 名称与焦点顺序

Files and modules in scope:
- public/body-front.svg
- components/BodyPart.tsx
- components/BodyMapFront.tsx
- tests/body-map-front.test.tsx

Student manual work that must not be fabricated:
- 在 Figma/矢量工具调整轮廓
- 逐项检查 id 命名
- 保存原创过程或许可证明

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
- public/body-front.svg
- components/BodyPart.tsx
- components/BodyMapFront.tsx
- tests/body-map-front.test.tsx

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 键盘 Tab/Enter/Space 测试
- 触控热点尺寸检查
- 自动化查询每个 aria-label

Acceptance:
- 所有计划热点均可键盘激活
- 热点不重叠导致误选
- 许可记录可追溯

Evidence to save:
- body-front-S06.png
- svg-license-S06.md
- test-report-S06.txt

# Security and Safety
- 人体图仅作为导航示意，不显示诊断性解剖结论
- 避免刺激性伤情图像
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要粘贴来源不明的人体 SVG
- 不要只实现 hover
- 不要把左右侧误映射
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
Mark S06 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S06's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

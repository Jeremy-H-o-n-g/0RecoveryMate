# S05 仓库初始化、版本锁定与设计令牌

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
Prior-state requirement: P1 退出门禁通过；Node 24 LTS、Git 和编辑器已验证。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
在受支持的 LTS 版本上建立可运行的 Next.js App Router 工程、质量脚本和赛博运动设计令牌。

# Scope
- create-next-app 初始化
- 安装动画/校验/测试依赖
- 配置 lint、typecheck、test、build
- 建立暗色和霓虹令牌

# Requirements
Knowledge/research concepts:
- 可重复构建
- 锁文件
- 设计令牌
- 静态优先架构

Files and modules in scope:
- package.json
- package-lock.json
- app/layout.tsx
- app/globals.css
- .gitignore
- .env.example

Student manual work that must not be fabricated:
- 执行安装命令
- 创建 Git 初始检查点
- 记录实际依赖版本

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
- package.json
- package-lock.json
- app/layout.tsx
- app/globals.css
- .gitignore
- .env.example

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- npm run lint
- npm run typecheck
- npm test
- npm run build

Acceptance:
- 四项命令通过
- 无密钥或本地数据库入库
- 设计令牌覆盖背景、文字、焦点、强调与减少动画

Evidence to save:
- setup-versions.txt
- test-report-S05.txt
- homepage-S05.png

# Security and Safety
- 使用当前受支持的 Next.js 安全版本
- 默认不开启用户追踪
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要复制旧 Next.js 14 依赖锁
- 不要使用 @latest 后丢弃锁文件
- 不要实现人体图
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
Mark S05 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S05's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

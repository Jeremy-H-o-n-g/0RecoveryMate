# S27 Vercel 部署、烟雾测试与回滚

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
Prior-state requirement: P6 候选版本通过全部门禁；发布清单签核。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
发布锁定版本，完成自定义域名可选配置、生产烟雾测试、日志最小化和一键回滚演练。

# Scope
- 连接 Vercel
- 配置生产构建
- 执行 smoke tests
- 记录部署与回滚步骤
- 准备本地演示副本

# Requirements
Knowledge/research concepts:
- 生产构建
- 环境分离
- 部署烟雾测试
- 版本回滚

Files and modules in scope:
- vercel.json（仅在需要时）
- docs/DeploymentGuide.md
- docs/RecoveryGuide.md
- docs/ReleaseChecklist.md

Student manual work that must not be fabricated:
- 在真实网络和手机上测试生产 URL
- 演练回滚到前一版本
- 确认无敏感日志

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
- vercel.json（仅在需要时）
- docs/DeploymentGuide.md
- docs/RecoveryGuide.md
- docs/ReleaseChecklist.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 生产首页/深链/媒体/字幕 smoke
- 404/错误状态
- 回滚演练
- 安全头检查

Acceptance:
- 生产核心闭环通过
- 回滚可在演示前执行
- 离线方案独立可用

Evidence to save:
- release-S27.txt
- production-smoke-S27.pdf
- rollback-S27.mp4

# Security and Safety
- 不上传原始同意书或研究原始数据
- 生产日志不记录部位选择
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要在最后时刻升级依赖
- 不要把密钥放到客户端
- 不要删除前一稳定部署
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
Mark S27 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S27's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

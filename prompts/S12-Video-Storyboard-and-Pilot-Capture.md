# S12 拍摄规范、分镜与首条视频采集

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
Prior-state requirement: 动作清单已锁定；出演者同意与场地安全已确认。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
用手机与三脚架拍摄一条可评审的双角度动作视频，并同步保留同意与镜头记录。

# Scope
- 建立 shot list
- 拍摄正面与侧面
- 记录 take 选择
- 保存原始媒体清单

# Requirements
Knowledge/research concepts:
- 镜头连续性
- 可理解动作示范
- 安全拍摄
- 媒体权利

Files and modules in scope:
- docs/VideoProductionProtocol.md
- media/production-log.csv
- media/raw/README.md

Student manual work that must not be fabricated:
- 布置干净背景和稳定光线
- 检查动作空间
- 拍摄口述说明与无声替代镜头

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
- docs/VideoProductionProtocol.md
- media/production-log.csv
- media/raw/README.md

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 画面完整性检查
- 声音/曝光/稳定性检查
- 同意文件和 take ID 对应检查

Acceptance:
- 动作关键姿态未被裁切
- 素材权利清楚
- 不安全或含敏感背景的 take 被拒绝

Evidence to save:
- pilot-raw-contact-sheet-S12.jpg
- production-log-S12.csv

# Security and Safety
- 拍摄前清场并评估跌倒风险
- 不要求出演者忍痛完成动作
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要拍摄真实受伤展示
- 不要把未经同意的人拍入背景
- 不要删除原始审核记录
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
Mark S12 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S12's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

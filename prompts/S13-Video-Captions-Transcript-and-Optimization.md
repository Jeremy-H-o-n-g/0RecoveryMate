# S13 视频编辑、字幕、转录与媒体优化

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
Prior-state requirement: S12 首条视频素材与权利记录通过。
Before editing, summarize what already works, current test status, known issues, and the exact checkpoint/commit you can roll back to. If the prior-state requirement is not satisfied, stop and report the blocker.

# Session Objective
将首条素材剪成网页版本、3 秒预览、字幕和描述性转录，并建立可复制的媒体流水线。

# Scope
- 导出 MP4
- 生成预览和 poster
- 编写 VTT 字幕与转录
- 校验路径和元数据

# Requirements
Knowledge/research concepts:
- 编码与码率
- poster/preview
- WebVTT
- 描述性转录
- 媒体回退

Files and modules in scope:
- public/videos/pilot.mp4
- public/videos/pilot-preview.mp4
- public/captions/pilot.vtt
- public/transcripts/pilot.md
- data/exercises.json

Student manual work that must not be fabricated:
- 人工校对字幕时序
- 由审核者复核屏幕文字和口述
- 手机网络条件下试播

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
- public/videos/pilot.mp4
- public/videos/pilot-preview.mp4
- public/captions/pilot.vtt
- public/transcripts/pilot.md
- data/exercises.json

Preserve all unrelated working files, the approved architecture, and completed-session history.

# Tests and Acceptance Criteria
Tests/checks:
- 浏览器播放测试
- 字幕轨启用测试
- 文件大小预算
- 无音频情况下可理解性检查

Acceptance:
- 主视频、预览、poster、字幕、转录均可用
- 字幕准确
- 媒体预算未超标

Evidence to save:
- media-report-S13.txt
- caption-review-S13.md

# Security and Safety
- 删除可能暴露地点/身份的元数据
- 不要把字幕当作唯一的步骤说明
- Keep secrets in environment variables and placeholders in .env.example.
- Use synthetic or anonymized sample data.
- RecoverMate provides general educational recovery/warm-up guidance only; it does not diagnose, treat, or replace qualified professional advice.

# Do Not Do
- 不要自动生成字幕后不校对
- 不要用未授权音乐
- 不要一次批量处理全部视频
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
Mark S13 complete only after every acceptance criterion passes. Preserve prior completed units, decisions, failed evidence, and known issues. Activate the next approved unit but do not implement it.

# Stop Condition
Stop when S13's criteria pass, or when a blocker requires a human decision. Do not begin the next session.

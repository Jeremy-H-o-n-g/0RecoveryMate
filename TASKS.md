# TASKS.md - RecoverMate

## Project Goal
Build a competition-ready static web app that uses an interactive body map to connect six body regions to professionally reviewed, accessible recovery/warm-up guidance while preserving Jeremy Hong's authoritative proposal.

## Global Rules
- General educational guidance only: no diagnosis, treatment, individualized medical advice, or outcome guarantees.
- Publish only `approved` content with source, license, reviewer, review date, captions, transcript, and stop signals.
- Keep the architecture static-first; no accounts, production health data, public uploads, or database in this release.
- Secrets stay in environment variables; samples are synthetic/anonymized.
- Preserve failed evidence, limitations, and student manual work; never fabricate approval, media, testing, or research.

## Current Unit
Unit code: S12
Unit title: 拍摄规范、分镜与首条视频采集
Unit focus: Shoot a reviewable dual-angle exercise video with phone + tripod; keep consent + shot records.
Current prompt: `prompts/S12-Video-Storyboard-and-Pilot-Capture.md`
Prior-state requirement: exercise list locked + performer consent + venue safety confirmed.
Status: **In Progress — SPEC DRAFTED, CAPTURE PENDING (2026-08-10).** Prior-state is NOT met (S11 content not locked; no consent/safety confirmed). The shoot spec + log template are drafted; actual filming is student manual work (cannot be fabricated). S13 NOT activated. See "S12 Status" below.

## Acceptance Criteria for Current Unit
- Key movement postures are not cropped (requires real footage).
- Asset rights are clear (requires consent on file).
- Unsafe / sensitive-background takes are rejected (requires real takes).

## Completed Units
- [x] S01 - 基线台账与完整垂直切片
- [x] S02 - 健康边界与内容证据协议
- [x] S03 - 形成性研究设计与成功指标
- [x] S04 - 信息架构、用户旅程与界面蓝图
- [x] S05 - 仓库初始化、版本锁定与设计令牌
- [x] S06 - 前视人体 SVG 与语义热点
- [x] S07 - 后视人体图、切换与触控/键盘兼容
- [x] S08 - BodyMap 状态、数据契约与路由
- [x] S09 - 脚踝垂直切片验收
- [x] S10 - 动作内容 Schema 与构建时校验
- [ ] S11 - 来源台账、专业审核与内容锁定 *(PARKED — reviewer placeholder `<<REVIEWER_NAME_TBD>>`; docs done, sign-off deferred)*
- [ ] S12 - 拍摄规范、分镜与首条视频采集 *(In Progress — spec drafted; capture pending)*
- [ ] S13 - 视频编辑、字幕、转录与媒体优化
- [ ] S14 - 动作卡片、筛选与渐进呈现
- [ ] S15 - 动作详情路由与可访问视频播放器
- [ ] S16 - 环形计时器状态机与数学验证
- [ ] S17 - 分步指引、播放器与计时同步
- [ ] S18 - 完成反馈、粒子效果与减少动画
- [ ] S19 - 响应式集成、错误状态与第一轮回归
- [ ] S20 - 六部位与 12–18 条动作内容集成
- [ ] S21 - 运动类型快捷入口与部位高亮
- [ ] S22 - 运动恢复流程队列与用户控制
- [ ] S23 - 自动化、可访问性与安全回归
- [ ] S24 - 性能、媒体预算与离线演示回退
- [ ] S25 - 10 人可用性研究执行
- [ ] S26 - 研究分析、证据化迭代与限制
- [ ] S27 - Vercel 部署、烟雾测试与回滚
- [ ] S28 - 报告、演示、竞赛叙事与答辩

## Decisions
- 2026-07-27: Preserve the Next.js App Router architecture; use a currently supported patched LTS line for a new repository.
- 2026-07-27: Default six regions are shoulder, arm, lower back, knee, calf, and ankle.
- 2026-07-27: Public upload/CMS is outside the current baseline; content updates use reviewed Git/JSON changes.
- 2026-07-27 (S01): Requirements ledger at `docs/baseline-ledger.md`; BR-01..BR-15 verified; authoritative source = 11-page proposal PDF.
- 2026-07-27 (S02): Content policy v1 (`config/content-policy.json` + `docs/ContentSafetyPolicy.md`); `docs/SourceLedger.md`; no fabricated endorsements.
- 2026-08-09 (S03): Formative usability protocol v1 (`docs/ResearchProtocol.md`).
- 2026-08-09 (S04): UX blueprint + state model + flow diagram.
- 2026-08-09 (S05): Next.js App Router project (genuine lockfile); design tokens; four quality scripts pass.
- 2026-08-10 (S06–S10): front/back body maps + switcher (S06/S07); type-safe data contract + `/body/[part]` route (S08); ankle vertical slice (S09); exercise schema + build-time content gate + `validate:content` (S10).
- 2026-08-10 (user direction): S11 is PARKED — obtaining the qualified reviewer takes time, so a `<<REVIEWER_NAME_TBD>>` placeholder is left for future update. S12 is activated before S11 acceptance passes (documented deviation), because S11/S12/S13 are real-world content-production sessions; their specs/templates are drafted now and review/capture are deferred (not fabricated).
- 2026-08-10 (S12, spec drafted): `docs/VideoProductionProtocol.md` (shoot spec), `media/production-log.csv` (template), `media/raw/README.md` (+ `.gitignore` exception). Capture is pending (prior-state: S11 content locked + consent + safety not met; filming is student manual work).

## Known Issues
- ⚠️ Qualified content reviewer not yet named (DC-3) — S11 parked; `<<REVIEWER_NAME_TBD>>` placeholder left for future update. S11 sign-off + sources deferred.
- S12 prior-state unmet (S11 content not locked; no consent/safety) → S12 capture deferred; spec drafted.
- S11/S12/S13 are real-world content-production sessions; their capture/review cannot be done or fabricated by the implementation partner.
- SVG is self-authored (DC-2): student should save original-work proof + mentor confirmation (pending).
- Media hosting remains local-first until the performance budget is measured.
- Authoritative proposal PDF is 11 pages (canonical).
- S02 refusal test is a defined contract (not live); build-time enforcement wired (S10); page-level safety prompt in S15.
- S03 study execution pending; S04 screens not yet hand-drawn/Figma'd.
- S05 `homepage-S05.png`, S08 `route-evidence-S08.png` deferred (no headless browser). S06/S07 PNGs are SVG rasterizations; S07 `mobile-touch-S07.mp4` deferred.
- S09 `ankle-slice-S09.mp4` deferred; `/exercise/[id]` renders dynamically (static-export optimization is S24/S27).
- S10: `data/sample/exercises.json` superseded by `data/exercises.json` (kept). Current content is only the DRAFT ankle placeholder; no approved content.

## Last Test Evidence
- Automated: `node scripts/check-environment.mjs` → exit 0. S10 gates green (lint/typecheck/build/test 6 files-32 tests/`validate:content` OK). **S12 (spec drafted):** docs/csv only; `npm run validate:content` → "OK - no content errors." exit 0; `npm run test` → 6 files / 32 tests pass. No capture (footage pending).
- Manual: S01–S10 drafted/executed by implementation partner. S11 (parked): review-log + ledger status + reviewer placeholder drafted; professional sign-off + sources deferred. S12 (spec drafted): video production protocol + production-log template + raw-media README drafted; filming is student manual work (pending).
- Content/media: Schema + build gate done (S10); content review (S11) + capture (S12) are real-world pending.
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: ankle slice verified (S09); content schema + gate done (S10); real content/review/capture deferred (S11/S12).

## Completion notes (checkpoints)
- S01: `dc9c0d6` → `3717579` → `d69336a`. · S02: `d69336a` → `99b410d`. · S03: `99b410d` → `7d51f58`.
- S04: `7d51f58` → `e44248d`. · S05: `2deec09` → `c2e4431`. · S06: `c2e4431` → `682d828` → `42be299`.
- S07: `42be299` → `ca0b543`. · S08: `ca0b543` → `9dbd94b`. · S09: `9dbd94b` → `6d95164`. · S10: `6d95164` → `299ba2a`.

## S11 Parked (deferred 2026-08-10, per user direction)
- S11 acceptance cannot pass until a qualified reviewer is named (DC-3) + the student provides real sources. Forging sign-off is forbidden.
- Done (honest): `docs/ContentReviewLog.md` (review process + log + `<<REVIEWER_NAME_TBD>>` placeholder), `docs/SourceLedger.md` §7.
- Deferred: candidate selection (2–3/region), professional sign-off, `source-ledger-S11.csv`, `review-signoff-S11.pdf`, any `approved` content.
- Rollback to S11-blocked state: `4d6ec2c`.

## S12 Status (In Progress — spec drafted, capture pending, 2026-08-10)
- Done (honest): `docs/VideoProductionProtocol.md` (shoot spec), `media/production-log.csv` (template), `media/raw/README.md` (+ `.gitignore` exception so the README tracks while raw media stays ignored).
- Deferred (cannot fabricate): actual filming (phone + tripod, dual-angle), `pilot-raw-contact-sheet-S12.jpg`, real production-log rows, `production-log-S12.csv` with real takes.
- Acceptance NOT met (requires real footage): postures not cropped; rights clear; unsafe takes rejected.
- Prior-state NOT met: S11 content locked + consent + venue safety.
- S12 NOT marked complete; S13 NOT activated. Rollback: pre-S12 `4d6ec2c`.

## Next Unit
- S13 - 视频编辑、字幕、转录与媒体优化; video editing, captions, transcript, optimization only. **NOT activated** — S12 is current and its capture is pending. Do not implement S13 until S12 capture is done (or until you direct another re-sequence).

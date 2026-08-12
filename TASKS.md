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
Unit code: S16
Unit title: 环形计时器状态机与数学验证
Unit focus: Implement idle/running/paused/complete/reset states with structured, drift-free timer math; verify the circular progress.
Current prompt: `prompts/S16-Timer-State-Machine.md`
Prior-state requirement: S15 player and exercise data are stable.
Status: **Activated — not yet started.** S16 is pure code (no content dependency). Do not implement until S16 is opened.

## Acceptance Criteria for Current Unit
- State transitions are deterministic and repeatable.
- Visual progress matches the remaining time.
- The completion event fires exactly once.

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
- [ ] S11 - 来源台账、专业审核与内容锁定 *(PARKED — `<<REVIEWER_NAME_TBD>>`; sign-off deferred)*
- [ ] S12 - 拍摄规范、分镜与首条视频采集 *(PARKED — spec drafted; capture deferred)*
- [ ] S13 - 视频编辑、字幕、转录与媒体优化 *(PARKED — spec drafted; editing deferred)*
- [x] S14 - 动作卡片、筛选与渐进呈现
- [x] S15 - 动作详情路由与可访问视频播放器
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
- 2026-08-10 (user direction): S11/S12/S13 (real-world content-production) are parked — reviewer `<<REVIEWER_NAME_TBD>>`, capture, editing deferred (not fabricated); specs/templates drafted. Code sessions S14+ proceed against placeholder content.
- 2026-08-10 (S12/S13, spec drafted): `docs/VideoProductionProtocol.md`, `docs/VideoPostProductionProtocol.md`, `media/production-log.csv`, `media/raw/README.md`, `public/{videos,captions,transcripts}/README.md`, `docs/media-report-S13.txt`, `docs/caption-review-S13.md`. Capture/editing pending.
- 2026-08-10 (S14, COMPLETE): `components/ExerciseCard.tsx` enhanced + `components/ExercisePanel.tsx` (approved-only filter default, skeleton/empty/error); wired into `/body/[part]`; `tests/exercise-card.test.tsx`. All gates pass.
- 2026-08-10 (S15, COMPLETE): `components/VideoPlayer.tsx` (native `<video controls>`, no autoplay, `<track>` captions, poster, transcript link, graceful no-video fallback), `components/SafetyNotice.tsx` (stop signals, rendered before the action — the page-level safety prompt), `app/exercise/[id]/page.tsx` (safety before action, player, steps readable without video, source/review/license shown, invalid→notFound), `tests/exercise-page.test.tsx`. All gates pass.

## Known Issues
- ⚠️ Qualified content reviewer not yet named (DC-3) — S11 parked (`<<REVIEWER_NAME_TBD>>`); S11 sign-off + sources deferred. S12 capture + S13 editing deferred (need footage).
- S11/S12/S13 are real-world content-production sessions; their review/capture/editing cannot be done or fabricated. Code sessions S14+ proceed against placeholder content; real media/review swapped in when S11–S13 unblock.
- SVG is self-authored (DC-2): student should save original-work proof + mentor confirmation (pending).
- Media hosting remains local-first (DC-5) until the performance budget (S24).
- Authoritative proposal PDF is 11 pages (canonical).
- S02 refusal test is a defined contract (not live); build-time enforcement wired (S10); page-level safety prompt implemented (S15).
- S03 study execution pending; S04 screens not yet hand-drawn/Figma'd.
- Deferred screenshots/recordings (no headless browser / real device): `homepage-S05.png`, `route-evidence-S08.png`, S06/S07 PNGs (SVG rasterizations), `mobile-touch-S07.mp4`, `ankle-slice-S09.mp4`, `card-desktop-S14.png`, `card-mobile-S14.png`, `exercise-page-S15.png`.
- S09 `/exercise/[id]` renders dynamically (reads `?done=`); static-export optimization is S24/S27.
- S10: `data/sample/exercises.json` superseded by `data/exercises.json` (kept). Current content is only the DRAFT ankle placeholder; no approved content.

## Last Test Evidence
- Automated: `node scripts/check-environment.mjs` → exit 0. **S15:** `npm run lint` exit 0; `npm run typecheck` exit 0; `npm run test` 8 files / 43 tests passed exit 0 (incl. `tests/exercise-page.test.tsx`: VideoPlayer controls/no-autoplay/track + fallback, SafetyNotice, valid page renders steps+safety, invalid→notFound); `npm run build` exit 0 → **all PASS** (see `docs/a11y-video-S15.md`).
- Manual: S01–S10 + S14 + S15 drafted/executed by implementation partner. S11/S12/S13 (content-production): specs drafted; review/capture/editing are student manual work (pending). S15 player/safety authored by implementation partner; on-device fullscreen + keyboard + caption walk-throughs are student manual work (pending real media).
- Content/media: Schema + build gate done (S10); cards (S14) + detail/player (S15) done; content review (S11) + capture (S12) + editing (S13) real-world pending.
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: ankle slice (S09) → cards (S14) → detail/player+safety (S15); timer next (S16).

## Completion notes (checkpoints)
- S01: `dc9c0d6` → `3717579` → `d69336a`. · S02: `d69336a` → `99b410d`. · S03: `99b410d` → `7d51f58`.
- S04: `7d51f58` → `e44248d`. · S05: `2deec09` → `c2e4431`. · S06: `c2e4431` → `682d828` → `42be299`.
- S07: `42be299` → `ca0b543`. · S08: `ca0b543` → `9dbd94b`. · S09: `9dbd94b` → `6d95164`. · S10: `6d95164` → `299ba2a`.
- S11 parked: `4d6ec2c`. · S12 spec: `27310d2`. · S13 spec: `0952d23`. · S14: `0952d23` → `6e5fde0`. · S15: `6e5fde0` → (this commit).

## S11 / S12 / S13 — parked (content-production, deferred per user direction)
- S11: reviewer `<<REVIEWER_NAME_TBD>>`; `docs/ContentReviewLog.md` + `docs/SourceLedger.md` §7 done; sign-off + sources deferred.
- S12: `docs/VideoProductionProtocol.md` + `media/production-log.csv` + `media/raw/README.md` done; filming deferred.
- S13: `docs/VideoPostProductionProtocol.md` + `docs/media-report-S13.txt` + `docs/caption-review-S13.md` + `public/{videos,captions,transcripts}/README.md` done; editing deferred.
- These unblock when a reviewer is named (DC-3) + the student films/edits real footage.

## S14 Completion Notes (completed 2026-08-10)
- Enhanced `ExerciseCard`; new `ExercisePanel` (approved-only filter default + skeleton/empty/error); wired into `/body/[part]`; `tests/exercise-card.test.tsx`; fixed S09 banner-text regression. Checkpoint: `6e5fde0`.

## S15 Completion Notes (completed 2026-08-10)
- **Deliverables:** `components/VideoPlayer.tsx`, `components/SafetyNotice.tsx`, enhanced `app/exercise/[id]/page.tsx`, `tests/exercise-page.test.tsx`; evidence `docs/a11y-video-S15.md`.
- **Acceptance:** no JS exceptions — MET; captions enableable (`<track>`) — MET; steps readable without video — MET; safety notice before action — MET.
- **Verification:** lint/typecheck/build exit 0; test 8 files / 43 tests → ALL PASS.
- **Changed files (S15):** `components/VideoPlayer.tsx`, `components/SafetyNotice.tsx`, `app/exercise/[id]/page.tsx`, `tests/exercise-page.test.tsx`, `docs/a11y-video-S15.md`, `TASKS.md`.
- **Honest scope note:** native controls (no custom); no autoplay; no tracking; `exercise-page-S15.png` deferred (no browser); real captions/transcript arrive with S13 footage.

## Next Unit
- S17 - 分步指引、播放器与计时同步; step guidance, player, and timer synchronization only. (S16 is now the active unit; do not implement S16 or S17 until opened.)

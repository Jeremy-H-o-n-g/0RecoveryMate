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
Unit code: S20
Unit title: 六部位与 12–18 条动作内容集成
Unit focus: Convert the 17 unique draft exercises in `Manual_Instructions.md` into `data/exercises.json` + wire all six regions' `exerciseIds`; decide the rest-interval representation (30 s set / 15 s rest).
Current prompt: `prompts/S20-Six-Region-Content-Integration.md`
Prior-state requirement: S19 core regression suite passing.
Status: **Activated — not yet started.** S20 is data + content integration (all DRAFT, clearly marked; never `approved` before S11). Do not implement until S20 is opened.

## Acceptance Criteria for Current Unit
- All six regions list exercises (12–18 total; 17 unique available from `Manual_Instructions.md`).
- Every entry is clearly-marked DRAFT (`reviewStatus: "draft"`), schema-valid, and passes the build gate + `validate:content`.
- 30 s set / 15 s rest representation is decided and documented (rest has no schema field today).
- The ankle placeholder is superseded or kept clearly-marked; nothing is published as approved.

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
- [ ] S11 - 来源台账、专业审核与内容锁定 *(PARKED — reviewer authorization pending; user will supply when obtained)*
- [x] S12 - 拍摄规范、分镜与首条视频采集 *(PASSED 2026-08-14 per user direction: placeholder-media strategy; protocol + log/templates drafted; real capture deferred and swappable in later; production log honestly empty)*
- [ ] S13 - 视频编辑、字幕、转录与媒体优化 *(PARKED — spec drafted; editing deferred until real footage; student review checklist defined in `docs/caption-review-S13.md`)*
- [x] S14 - 动作卡片、筛选与渐进呈现
- [x] S15 - 动作详情路由与可访问视频播放器
- [x] S16 - 环形计时器状态机与数学验证
- [x] S17 - 分步指引、播放器与计时同步
- [x] S18 - 完成反馈、粒子效果与减少动画
- [x] S19 - 响应式集成、错误状态与第一轮回归
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
- 2026-08-10 (S12/S13, spec drafted): production/post-production protocols + media/log/templates; capture/editing pending.
- 2026-08-10 (S14, COMPLETE): enhanced `ExerciseCard` + `ExercisePanel` (approved-only filter default, skeleton/empty/error); wired into `/body/[part]`; tests.
- 2026-08-10 (S15, COMPLETE): `VideoPlayer` (native controls, no autoplay, `<track>` captions, transcript, graceful fallback), `SafetyNotice` (before action), enhanced exercise detail page; tests.
- 2026-08-10 (S16, COMPLETE): `lib/timer-math.ts` (pure ratios/remaining/ring/clamp), `hooks/useExerciseTimer.ts` (drift-free state machine; completion once in effect; refs only in effects/handlers), `components/Timer.tsx` (SVG ring + controls + reduced-motion), `tests/timer.test.ts` (math boundaries + fake-timer hook tests). All gates pass.
- 2026-08-14 (S17, COMPLETE): `hooks/useExerciseSession.ts` (session controller; ONE timer; media events lead, controls delegate to the video; idempotent play sync; step timer per step; no forced advance; media errors surfaced), `components/StepIndicator.tsx` (aria-current highlight, click + Arrow/Home/End keyboard nav, clamped), `components/ExerciseSession.tsx` (client composition: native-controls video + steps + timer ring + live status + safe Stop/Reset), `tests/exercise-session.test.tsx` (16 tests). All gates pass.
- 2026-08-14 (user direction): `Manual_Instructions.md` committed as DRAFT content source (student-authored; NOT reviewed): 18 exercise entries across all six regions (17 unique — 腰背 婴儿式 #1/#3 to merge when converting), 通用要点 (3 general safety points), 7-sport→sore-region table. Raw material for S20 (12–18 exercises) + S21 sport entries. Becomes reviewable S11 input once the reviewer is authorized.
- 2026-08-14 (user direction, feature backlog): (a) user-adjustable circular timer with configurable defaults — extends the S16/S17 timer; unit assignment pending (candidate: S22 user-control scope or a dedicated unit; decide before S22). (b) body-map hotspot → show which sports mainly use those muscles (S21 scope, needs the sport table above).
- 2026-08-14 (user direction): S12 PASSED via placeholder-media strategy — no filming required to proceed; real videos swap in later through the existing local-media pipeline (`public/videos/<id>.mp4` + `videoUrl` in `data/exercises.json`; no CMS per DC). `media/production-log.csv` stays empty until real takes exist (nothing fabricated).
- 2026-08-14 (user direction): S11 remains parked — the user will provide reviewer authorization when obtained; until then no content may be marked `approved` (build gate enforces).
- 2026-08-14 (user content decisions, applied to `Manual_Instructions.md`): 腰背 keeps the richer 婴儿式 (former #3; duplicate former #1 removed in-file, remaining entries renumbered). All 膝盖 + 手臂 entries set to **30 s per set, 15 s rest between sets** (note: the exercise schema has no rest-interval field — decide representation at S20/S22, e.g., a step entry or a timer preset). No difficulty labels (difficulty stays `not-set` on conversion; existing 进阶/量力而行 phrasing stays as safety copy in 要点, not a label). Ankle-inversion risk flag deferred to reviewer sign-off (S11). Sport-table verification deferred to S21.
- 2026-08-14 (S18, COMPLETE): `components/CompletionFeedback.tsx` (role="status" static cue: text + check shape + green `--success` token, one-shot bounce class, user-clicked next/back links, zero timers/no navigation), `components/ConfettiEffect.tsx` (fires once per triggerKey; `prefers-reduced-motion` skip at both levels; `canvas-confetti` loaded ONLY via dynamic import with silent-by-design fallback to the static cue), `app/globals.css` (`--success` token + one-shot `completion-bounce` keyframe scaled by `--motion-scale`, killed under reduced motion), `tests/completion-feedback.test.tsx` (8 tests). Dependency added: `canvas-confetti` + `@types/canvas-confetti` (lazy-only; verified absent from all current chunks since no route references it yet). All gates pass.
- 2026-08-14 (user direction): deferred student evidence (mp4s, PDFs, viewport/slow-network/touch checks) stays as tracked placeholders in TASKS.md; the student will supply them later. Never fabricated.
- 2026-08-14 (S19, COMPLETE): `/exercise/[id]` now runs the real stack — SafetyNotice → `ExerciseSession` (S17) → user-confirmed `?done=1` → `CompletionFeedback` (S18); the S15 placeholder timer/complete blocks removed; back link generalized to the owning region (fixes S09's hardcoded `/body/ankle`). `components/ErrorState.tsx` (role=alert, non-diagnostic copy, recovery links) guards degenerate draft content (`steps: []`). Responsive polish on all three routes (mobile-first fluid containers, `px-4`/`sm:px-6`, `min-w-0`, `break-words`; no `overflow-x-hidden` — asserted). `tests/e2e/core-flow.spec.tsx` (10 tests) = core regression suite. Lazy-confetti proof: library in its own chunk (`3orrfx3`), component code separate (`1zfj6`), dynamic-import-only reference. All gates pass.

## Known Issues
- ⚠️ Qualified content reviewer not yet authorized (DC-3) — S11 parked (user will supply authorization; `<<REVIEWER_NAME_TBD>>` until then); sign-off + sources deferred. No content may be marked `approved` before that (build gate + policy).
- S12 passed via placeholder media (2026-08-14 user direction): code proceeds with empty/placeholder `videoUrl`s; real videos are dropped into `public/videos/<id>.mp4` + referenced in `data/exercises.json` when captured — no pipeline change needed. S13 editing deferred until real footage exists; its review checklist is ready (`docs/caption-review-S13.md`).
- S11/S13 are the remaining real-world content-production sessions; review/editing cannot be done or fabricated. Code sessions proceed against placeholder content; real media/review swapped in when they unblock.
- SVG is self-authored (DC-2): student should save original-work proof + mentor confirmation (pending).
- Media hosting remains local-first (DC-5) until the performance budget (S24).
- Authoritative proposal PDF is 11 pages (canonical).
- S02 refusal test is a defined contract (not live); build-time enforcement wired (S10); page-level safety prompt implemented (S15).
- S03 study execution pending; S04 screens not yet hand-drawn/Figma'd.
- Deferred screenshots/recordings (no headless browser / real device): `homepage-S05.png`, `route-evidence-S08.png`, S06/S07 PNGs (SVG rasterizations), `mobile-touch-S07.mp4`, `ankle-slice-S09.mp4`, `card-desktop-S14.png`, `card-mobile-S14.png`, `exercise-page-S15.png`, `timer-demo-S16.mp4`, `session-sync-S17.mp4`, `completion-normal-S18.mp4`, `completion-reduced-S18.mp4`.
- S17 wired in (S19): `/exercise/[id]` runs the full session stack. Still open (out of S19 allowlist): ExerciseSession renders its own `<video>` (needs direct media-event access); unifying with `VideoPlayer` is deferred to a later unit (candidate S23 regression).
- S18 wired in (S19): `CompletionFeedback` renders on `?done=1` with lazy confetti (library isolated in its own async chunk, loaded only at fire time). Student manual work pending: normal + reduced-motion OS-settings testing, particles-never-obscure-safety-controls check, next-step-user-confirmed check.
- S19 student manual work pending (placeholders per user direction): three-viewport walkthrough (`responsive-matrix-S19.pdf`), low-speed network simulation, real-phone touch testing.
- S17 student manual work pending: first-video walk-through, pause-then-read-steps check, classmate state-clarity check.
- S09 `/exercise/[id]` renders dynamically (reads `?done=`); static-export optimization is S24/S27.
- S10: `data/sample/exercises.json` superseded by `data/exercises.json` (kept). Current content is only the DRAFT ankle placeholder; no approved content.

## Last Test Evidence
- Automated: `node scripts/check-environment.mjs` → exit 0. **S19:** `npm run lint` exit 0; `npm run typecheck` exit 0; `npm run test` 12 files / 86 tests passed exit 0 (incl. `tests/e2e/core-flow.spec.tsx`: home→region→detail→finish chain, single Steps heading, computed back path, user-confirmed `?done=1` + static cue, media-failure recovery, ErrorState contract, responsive structural contract + no-overflow-hack scan, clean console); `npm run build` exit 0 → **all PASS** (see `docs/e2e-report-S19.txt`).
- Manual: S01–S10 + S14–S16 drafted/executed by implementation partner. S11/S12/S13 (content-production): specs drafted; review/capture/editing are student manual work (pending). S16 stopwatch spot-checks/tab-switch/SR cadence pending. S17 session authored + tested by implementation partner; first-video walk-through, pause-then-read-steps, and classmate state-clarity check are student manual work (pending).
- Content/media: Schema + build gate done (S10); cards (S14) + detail/player (S15) + timer (S16) + session sync (S17) + completion feedback (S18) done; S12 passed via placeholder (2026-08-14); content review (S11 — awaiting reviewer auth) + editing (S13 — awaiting footage) real-world pending; `Manual_Instructions.md` committed as draft content source.
- Research: Protocol designed (S03); execution scheduled for S25, pilot before that.
- End-to-end demo path: ankle slice (S09) → cards (S14) → detail/player+safety (S15) → timer (S16) → session sync (S17) → completion feedback (S18) → integrated flow + regression suite (S19); six-region content next (S20).

## Completion notes (checkpoints)
- S01: `dc9c0d6` → `3717579` → `d69336a`. · S02: `d69336a` → `99b410d`. · S03: `99b410d` → `7d51f58`.
- S04: `7d51f58` → `e44248d`. · S05: `2deec09` → `c2e4431`. · S06: `c2e4431` → `682d828` → `42be299`.
- S07: `42be299` → `ca0b543`. · S08: `ca0b543` → `9dbd94b`. · S09: `9dbd94b` → `6d95164`. · S10: `6d95164` → `299ba2a`.
- S11 parked: `4d6ec2c`. · S12 spec: `27310d2`. · S13 spec: `0952d23`. · S14: `0952d23` → `6e5fde0`. · S15: `6e5fde0` → `ce582f4`. · S16: `ce582f4` → `e12c309`. · S17: `e12c309` → `4f4f7bb`. · S18: `7236da8` → `2cbbe4f`. · S19: `2cbbe4f` → (this commit).

## S11 / S13 — parked; S12 passed via placeholder (content-production, per user directions)
- S11: reviewer authorization pending (user to supply); `docs/ContentReviewLog.md` + `docs/SourceLedger.md` §7; sign-off + sources deferred. `Manual_Instructions.md` (committed) is the draft content the reviewer will review.
- S12 (PASSED 2026-08-14, placeholder strategy): `docs/VideoProductionProtocol.md` + `media/production-log.csv` + `media/raw/README.md` remain the capture pipeline; filming deferred, videos uploadable later via local files + `videoUrl` (no CMS).
- S13: `docs/VideoPostProductionProtocol.md` + `docs/media-report-S13.txt` + `docs/caption-review-S13.md` + `public/{videos,captions,transcripts}/README.md`; editing deferred until real footage; the student review checklist is defined and waiting.
- Unblock S11 when reviewer authorization arrives; unblock S13 when real footage exists.

## S14–S19 Completion Notes (S14–S16 completed 2026-08-10; S17–S19 completed 2026-08-14)
- **S14** (`6e5fde0`): enhanced `ExerciseCard` + `ExercisePanel` (approved-only filter, states); wired into `/body/[part]`; tests.
- **S15** (`ce582f4`): `VideoPlayer` (native controls, no autoplay, captions, transcript, fallback) + `SafetyNotice` (before action) + enhanced detail page; tests.
- **S16** (`e12c309`): `lib/timer-math.ts` + `hooks/useExerciseTimer.ts` (drift-free FSM, completion once) + `components/Timer.tsx` + `tests/timer.test.ts`; evidence `docs/timer-tests-S16.txt`. Acceptance met (deterministic transitions; visual progress = remaining; completion once).
- **S17** (`4f4f7bb`): `hooks/useExerciseSession.ts` + `components/StepIndicator.tsx` + `components/ExerciseSession.tsx` + `tests/exercise-session.test.tsx`; evidence `docs/test-report-S17.txt`. Acceptance met (video pause pauses timer; manual + keyboard step adjustment; safe reset from any state incl. media errors; no forced advance).
- **S18** (`2cbbe4f`): `components/CompletionFeedback.tsx` + `components/ConfettiEffect.tsx` + `app/globals.css` (success token + one-shot bounce) + `tests/completion-feedback.test.tsx`; evidence `docs/test-report-S18.txt`. Acceptance met (effects fire once; reduced motion = no particles/scaling, static cue intact; next step user-controlled, zero timers).
- **S19** (this commit): routes wired (`/exercise/[id]` runs session + completion; back path per owning region), `components/ErrorState.tsx` guard, responsive polish on all routes, `tests/e2e/core-flow.spec.tsx` regression suite; evidence `docs/e2e-report-S19.txt`. Acceptance met (structural responsive contract + regression suite; viewport matrix is student placeholder evidence). VideoPlayer/session media unification still open.

## Next Unit
- S21 - 运动类型快捷入口与部位高亮 (after S20): sport quick entries from the 7-sport table + body-map highlighting; verify the sport table then (user direction 2026-08-14). (S20 is now the active unit; do not implement S20 or S21 until opened.)

# Handover — Admin Media Upload Feature (resume document)

**Date:** 2026-10-31 · **Repo:** `C:\0RecoveryMate` (branch `main`) · **For:** local Cursor agent resuming this task
**Feature commit:** `ef4d44e` — "feat(admin): in-app media uploads per body part via Vercel Blob"

---

## 1. Mission

The admin-only video upload module is **fully built, tested, and committed locally**.
The remaining task is **operational rollout**: get the commit deployed to Vercel and upload
the user's 11 prepared videos (~60 MB `.mp4` each) through the new `/admin/upload` UI,
then verify public playback. No further code changes are expected unless something fails.

## 2. Precise current state (verified 2026-10-31)

| Item | State |
|---|---|
| Code | ✅ Complete, committed as `ef4d44e` (29 files, +2166/−21) |
| All regression gates | ✅ Green at this commit (see §9) |
| `git push` to origin | ❌ **PENDING** — `origin/main` is still at `dc32933`. Two push attempts failed with `fatal: unable to access 'https://github.com/Jeremy-H-o-n-g/0RecoveryMate.git/': Recv failure: Connection was reset` (local network/GitHub reachability, likely needs the user's proxy/VPN). **Next action #1: retry `git push`** (user may need to run it in their own terminal). |
| Vercel Blob store | ✅ Connected to the project (user confirmed) → `BLOB_READ_WRITE_TOKEN` auto-injects into every NEW deployment |
| `UPLOAD_ADMIN_TOKEN` on Vercel | ✅ Set by the user (Settings → Env Vars → Production, Sensitive; value generated with `openssl rand -hex 32`). Value known only to the user — never ask for it, never commit it. |
| Videos | ⬜ 11 `.mp4` files (~60 MB each) prepared locally by the user, not yet uploaded |

## 3. Resume checklist (in this exact order)

1. **`git push`** from `C:\0RecoveryMate` (retry until GitHub is reachable; user's proxy may be required).
2. Vercel dashboard → **Deployments** → new build for `ef4d44e` reaches **Ready** (~1–2 min).
   Env var was added BEFORE the push, so this single deployment carries both secrets — no extra redeploy.
3. Open `https://<app>.vercel.app/admin/upload`:
   - ✅ token **login form** → proceed
   - ❌ "not configured" alert → `UPLOAD_ADMIN_TOKEN` not attached to Production → fix env var → Deployments → ⋯ → **Redeploy**
4. User logs in with their token (session = 8 h, httpOnly cookie).
5. **Upload the 11 videos — strictly one at a time** (wait for the "Uploaded ✓" on each before starting the next; the manifest is a single shared JSON — sequential uploads prevent write clobbering). Per video: part page → exercise card → **Video** row → Choose File → Upload → progress bar (multipart kicks in >4 MB) → ✓ + timestamp. Use the mapping table in §6.
6. Verify per upload: `https://<app>.vercel.app/exercise/<id>` → hard-refresh (`Ctrl+Shift+R`) → video plays. **No redeploy needed — uploads are live on next visit.**
7. Cross-check: Vercel → Storage → store → `videos/` shows 11 × `videos/<id>.mp4`.
8. Negative checks (DeploymentGuide §8): unauthenticated `POST /api/admin/upload` → **401**; unknown `exerciseId` → **400**; `/admin/upload` serves `noindex` and is linked from nowhere public.
9. Remind user: record the token in their password manager.

## 4. Architecture in one breath

```
Admin browser ──UPLOAD_ADMIN_TOKEN──▶ App (Vercel Functions, JSON only) ──scoped token──▶ Vercel Blob
```

- **Login:** `POST /api/admin/session` compares token (timingSafeEqual over sha256 hashes) → sets httpOnly `rm_admin` cookie holding `sha256hex(token)` (raw token never circulates). `DELETE` = logout. Bearer auth also accepted for curl.
- **Upload (two-phase, client-direct):** `POST /api/admin/upload {exerciseId, kind}` → server validates (zod + exercise exists) → issues `generateClientTokenFromReadWriteToken` scoped to ONE pathname, size cap, MIME whitelist, 30-min TTL → browser calls `put()` from `@vercel/blob/client` straight to Blob (60 MB videos never touch a Function — Vercel's ~4.5 MB body cap is bypassed by design) → `POST /api/admin/upload/complete` does `head()` + MIME/size re-check → writes URL into `media-manifest.json` in the store → `revalidatePath('/exercise/<id>')`.
- **Go-live without redeploy:** `/exercise/[id]` merges the manifest over build-time JSON at request time (`applyMediaOverlay(base, await getMediaManifest())`). The overlay carries **media URLs only** — `reviewStatus`/provenance can never be changed by an upload (Git/JSON only).
- **Never-throw degradation:** missing token / 404 / bad JSON / network error → `getMediaManifest()` returns EMPTY → pages render base content. Tests, CI, and the offline demo all run with zero env vars.
- **Fail-closed auth:** either env var unset → every admin endpoint answers **503**; public app unaffected.
- **Blob pathnames are server-computed** (client filenames discarded) and mirror the existing convention exactly:

| kind | pathname | MIME | cap |
|---|---|---|---|
| video | `videos/<id>.mp4` | video/mp4 | 200 MB |
| preview | `videos/<id>-preview.mp4` | video/mp4 | 50 MB |
| poster | `videos/<id>-poster.jpg` | image/jpeg | 4 MB |
| captions | `captions/<id>.vtt` | text/vtt | 1 MB |
| transcript | `transcripts/<id>.md` | text/markdown·plain | 1 MB |

## 5. File inventory (all in commit `ef4d44e`)

**New — domain (pure/server):** `lib/upload-rules.ts` (kind rules + intent validation) · `lib/media-overlay.ts` (manifest schema, get/set/clear, `applyMediaOverlay`, degradation contract) · `lib/admin-session.ts` (hashing, cookie options, `verifyAdminRequest`) · `lib/admin-api.ts` (`guardAdmin`, JSON helpers)
**New — API routes:** `app/api/admin/session/route.ts` · `app/api/admin/upload/route.ts` · `app/api/admin/upload/complete/route.ts` · `app/api/admin/media/route.ts` (DELETE)
**New — UI:** `app/admin/upload/page.tsx` (login / part grid) · `app/admin/upload/[part]/page.tsx` (exercise cards) · `components/admin/AdminLoginForm.tsx` · `AdminLogout.tsx` · `ExerciseMediaAdmin.tsx` (5 kind-rows, progress, two-click remove, single-flight per card, aria-live)
**New — tests:** `tests/upload-rules.test.ts` · `tests/media-overlay.test.ts` · `tests/admin-session.test.ts`
**Modified:** `app/exercise/[id]/page.tsx` (overlay merge) · `components/ExerciseSession.tsx` + `VideoPlayer.tsx` (optional `previewUrl` prop) · `config/content-policy.json` (v1.1, `adminUploads` block, `publicUploads` stays **false**) · `.env.example` · `package.json` (+`@vercel/blob@2.8.2`) · docs: `DeploymentGuide.md` (§8 deploy checklist), `VideoPostProductionProtocol.md` (§7), `public/videos/README.md`, `TASKS.md` · `tests/exercise-page.test.tsx` · `next-env.d.ts` (build regeneration)

## 6. Video → exercise mapping table (upload targets)

Mapping is decided by **which exercise card you upload from** — filenames are irrelevant to the system (rename files to ids only for human bookkeeping). Skip `ankle-pilot-placeholder` (draft placeholder pending review, not a real slot).

| Part page | Exercise id | 中文名 | English |
|---|---|---|---|
| shoulder 肩 | `shoulder-overhead-triceps-rear-stretch` | 过肩三头肌与肩后侧拉伸 | Overhead Triceps & Rear Shoulder Stretch |
| shoulder | `shoulder-clasped-hands-chest-opener` | 背后双手相扣开肩 | Clasped-Hands Chest Opener |
| shoulder | `shoulder-cross-body-stretch` | 交叉抱肩拉伸 | Cross-Body Shoulder Stretch |
| arm 手臂 | `arm-wrist-rotations` | 手腕旋转放松（动态） | Wrist Rotations (Dynamic) |
| arm | `arm-forearm-extensor-stretch` | 前臂伸肌拉伸 | Forearm Extensor Stretch |
| arm | `arm-forearm-flexor-stretch` | 前臂屈肌拉伸 | Forearm Flexor Stretch |
| arm | `arm-fixed-grip-biceps-stretch` | 抓固定物转体拉伸肱二头肌 | Fixed-Grip Biceps Stretch |
| lower-back 腰背 | `lower-back-cat-cow` | 猫牛式 | Cat-Cow |
| lower-back | `lower-back-childs-pose` | 婴儿式 | Child's Pose |
| knee 膝 | `knee-standing-quad-stretch` | 站立股四头肌拉伸 | Standing Quad Stretch |
| knee | `knee-seated-hamstring-stretch` | 坐姿腘绳肌拉伸 | Seated Hamstring Stretch |
| calf 小腿 | `calf-wall-gastrocnemius-stretch` | 推墙腓肠肌拉伸 | Wall Gastrocnemius Stretch |
| calf | `calf-wall-soleus-stretch` | 推墙比目鱼肌拉伸 | Wall Soleus Stretch |
| calf | `calf-stair-depth-stretch` | 台阶腓肠肌深度拉伸 | Stair Edge Calf Deep Stretch |
| ankle 脚踝 | `ankle-inversion-stretch` | 站立扶墙踝内翻拉伸 | Wall-Supported Ankle Inversion |
| ankle | `ankle-eversion-stretch` | 站立扶墙踝外翻拉伸 | Wall-Supported Ankle Eversion |
| ankle | `ankle-circles` | 脚踝绕环（动态） | Ankle Circles (Dynamic) |

Unsure what a video shows? Open `https://<app>.vercel.app/exercise/<id>` — full step text is on the page.

## 7. Storage capacity — IMPORTANT constraint

- **Hobby plan Blob storage is hard-capped at 1 GB.** 11 × ~60 MB ≈ **0.66 GB → fits with ~340 MB headroom.**
- The remaining 7 exercise videos (~0.4 GB more) will **NOT fit** at 60 MB each. Options: re-encode smaller (720p H.264 @ ~1–1.5 Mbps → ~20–25 MB/video, per `docs/VideoPostProductionProtocol.md` §3) or upgrade to Pro ($0.023/GB-month).
- Transfer: 10 GB/month included on Hobby ≈ 15 full watch-throughs of all 11 videos. Monitor: Settings → Usage.
- Sources: vercel.com/docs/vercel-blob/usage-and-pricing · vercel.com/docs/plans/hobby

## 8. Locked decisions (do not re-litigate)

- Per-exercise uploads grouped by body part; all five media kinds; shared-secret token auth (no accounts).
- `publicUploads: false` forever — no user-facing upload surface; `/admin/*` unlisted + noindex.
- Overlay carries URLs only; approval/provenance stay in Git/JSON.
- Auth inside route handlers, never middleware (Next 16 guidance); JSON content-type required (CSRF hardening with SameSite=strict).
- No secrets in the repo — `.env.example` holds comments only.
- **This Next.js is a modified build (16.3.0):** before touching ANY framework code, read the relevant guide in `node_modules/next/dist/docs/` (per `AGENTS.md`). Awaited `params`/`searchParams`/`cookies()`; `revalidatePath` literal paths; fetch uncached by default.

## 9. Verification gates — all green at `ef4d44e`

`npm test` 161/161 (18 files) · `typecheck` ✅ · `lint` ✅ (1 pre-existing warning in `dirt-evidence.tmp.mjs`) · `validate:content` ✅ · `check:safety` ✅ · `npm run build` ✅ **both with and without** tokens (public pages stay Static/SSG; only `/admin/*`, `/api/admin/*`, `/exercise/[id]` are ƒ Dynamic) · `test:e2e` 4/4 · `test:a11y` 7/7 · live curl smoke (503 fail-closed, 401/415 chains, hashed httpOnly cookie, scoped-token payload verified, degradation with fake blob token).
Re-run these after ANY code change: `npm run typecheck && npm run lint && npm test && npm run validate:content && npm run check:safety && npm run build`.

## 10. Troubleshooting

| Symptom | Fix |
|---|---|
| `git push` → `Recv failure: Connection was reset` | Local GitHub reachability — retry, or user runs push with their proxy/VPN |
| Admin endpoints answer **503** | An env var missing in the CURRENT deployment → re-check Settings → Env Vars → **Redeploy** |
| Login rejected | Wrong token, or env var rotated without redeploy |
| File picker rejects a video | Not `.mp4` — re-export H.264 + AAC (protocol §3) |
| Upload stalls | Retry — scoped tokens valid 30 min; check upstream bandwidth |
| Video not on exercise page | Hard-refresh; confirm row shows ✓; check Storage → `videos/<id>.mp4` exists |
| Replaced video shows old content | Blob CDN/browser cache — hard-refresh; if persistent, the planned mitigation is a `?v=` cache-buster appended to manifest URLs (one-line change in `complete` route / overlay) |
| Two uploads raced (manifest lost an entry) | Re-upload the missing exercise's video — overwrite fixes it |

## 11. Repo ops notes (Windows / Git Bash)

- Kill a stuck dev server: `netstat -ano | grep :3199` → `taskkill //F //T //PID <pid>` (`pkill -f` does NOT match Windows processes).
- Untracked `*.tmp.mjs` scratch files (align-check, art-diff, dirt-evidence, quality-ladder, regen4, sharp-ladder, theme3) are intentional WIP artifacts — do not commit or delete without asking.
- `next-env.d.ts` churns between dev/build type paths on `next dev` vs `next build` — commit whichever state the build left; don't hand-edit.
- Dev server convention this project used: port 3199 (`npm run dev`); local demo: `npm run build && npx next start -p 3100`.

## 12. Possible follow-ups (not started, ask user first)

- Upload the other 4 media kinds (preview/poster/captions/transcript) per exercise — same cards, same flow.
- Encode + upload videos for the remaining 7 exercises within the 1 GB cap (re-encode smaller first — §7).
- `?v=` cache-buster if stale-CDN is ever observed.
- Production smoke suite against the real URL: `docs/DeploymentGuide.md` §4 (`npm run test:smoke` with `PRODUCTION_SMOKE_URL`).

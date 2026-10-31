# Handover — Admin Media Upload Feature (resume document)

**Date:** 2026-10-31, updated 2026-11-01 · **Repo:** `C:\0RecoveryMate` (branch `main`) · **For:** local Cursor agent resuming this task
**Feature commit:** `ef4d44e` — "feat(admin): in-app media uploads per body part via Vercel Blob"
**Production URL:** `https://0-recovery-mate.vercel.app` (GitHub `homepage`)

---

## 1. Mission

The admin-only video upload module is **fully built, tested, and committed**.
Remaining work is **operational rollout**: confirm deploy → upload the 11 prepared
videos through `/admin/upload` (or `scripts/admin-upload-batch.mjs`) → verify
playback. No further code changes expected unless something fails.

## 2. Precise current state (verified 2026-10-31 → 2026-11-01)

| Item | State |
|---|---|
| Code | ✅ Complete (`ef4d44e` + handover docs) |
| All regression gates | ✅ Green at feature commit (see §9) |
| `git push` to origin | ✅ `origin/main` includes `ef4d44e` … `41fbcd4` |
| Vercel Production deploy | ✅ **Ready** — GitHub Vercel status for `41fbcd4`: "Deployment has completed". Dashboard: https://vercel.com/jeremyh2008-8524/0-recovery-mate |
| Live site | ✅ `https://0-recovery-mate.vercel.app/` serves RecoverMate |
| `/admin/upload` | ✅ Login form (not "not configured") → `UPLOAD_ADMIN_TOKEN` is on this deployment |
| Vercel Blob store | ⚠️ Connected but **PRIVATE** — root cause of the upload **400** ("Cannot use public access on a private store"). The app is public-access by design (visitors must stream videos). **Fix: create a new PUBLIC Blob store → Connect Project → Redeploy** (re-injects `BLOB_READ_WRITE_TOKEN`). See §3 item 4. |
| Network routing (browser) | ✅ Solved 2026-10-31: `*.vercel.app` only reachable via proxy; `*.public.blob.vercel-storage.com` works DIRECT (probe: 404 in 1.7 s vs app timeout). Windows proxy bypass list now contains `*.vercel-storage.com` — **keep it**, else uploads hang at 0% (pending). |
| Videos on disk | ✅ 11 × `.mp4` in `Desktop\Recoverymate videos\0Finalized\` (~867 MB total — under Hobby 1 GB with ~150 MB headroom) |
| Videos uploaded to Blob | ⬜ **NOT YET — blocked by the private-store 400.** After the public-store swap + Redeploy (§3 item 4): resume uploads, one at a time, browser UI or batch script. |
| Batch helper | ✅ `scripts/admin-upload-batch.mjs` — dry-run resolved all 11 filenames → exercise ids |

## 3. Resume checklist (in this exact order)

1. ~~`git push`~~ ✅
2. ~~Vercel deploy Ready~~ ✅ (`41fbcd4`)
3. ~~Open `/admin/upload` — login form~~ ✅ confirmed live
4. **❗ OPEN BLOCKER — swap to a PUBLIC Blob store:** Vercel → Storage → Create Store → **Blob** → visibility **Public** → **Connect Project** `0-recovery-mate` (auto-injects the new `BLOB_READ_WRITE_TOKEN`; if a manual env var was added for the old store, delete/replace it) → Deployments → ⋯ → **Redeploy**. Keep the old private store until uploads verify, then delete it.
5. **User logs in** at `/admin/upload` with `UPLOAD_ADMIN_TOKEN` (session = 8 h, httpOnly cookie). Never paste the token into chat.
6. **Upload the 11 videos — one at a time** (wait for ✓ before the next). Use §6 mapping **or** run the batch script (§3a). First % tick should appear within ~10–60 s (multipart chunks).
7. Verify each: `https://0-recovery-mate.vercel.app/exercise/<id>` → hard-refresh → video plays.
8. Cross-check: Vercel → Storage → new store → `videos/` → 11 × `videos/<id>.mp4`.
9. Negative checks (DeploymentGuide §8): unauthenticated `POST /api/admin/upload` → **401**; unknown `exerciseId` → **400**; `/admin/upload` is `noindex` / unlisted.
10. Reminder: keep the token in the password manager.

### 3a. Batch script (preferred when CLI can reach Vercel)

```powershell
$env:PRODUCTION_SMOKE_URL = "https://0-recovery-mate.vercel.app"
$env:UPLOAD_ADMIN_TOKEN   = "<from password manager — do not commit>"
# optional: $env:UPLOAD_VIDEOS_DIR = "C:\Users\Jeremy.H\Desktop\Recoverymate videos\0Finalized"
# optional: $env:UPLOAD_DRY_RUN = "1"
node scripts/admin-upload-batch.mjs
```

Uses Bearer auth (same as curl). Sequential. Re-run is safe (overwrite).
If the shell still cannot connect to `*.vercel.app`, use the browser UI instead (or fix DNS/proxy first).

## 4. Architecture in one breath

```
Admin browser ──UPLOAD_ADMIN_TOKEN──▶ App (Vercel Functions, JSON only) ──scoped token──▶ Vercel Blob
```

- **Login:** `POST /api/admin/session` compares token (timingSafeEqual over sha256 hashes) → sets httpOnly `rm_admin` cookie holding `sha256hex(token)` (raw token never circulates). `DELETE` = logout. Bearer auth also accepted for curl/scripts.
- **Upload (two-phase, client-direct):** `POST /api/admin/upload {exerciseId, kind}` → scoped Blob client token → browser/`put()` → Blob → `POST /api/admin/upload/complete` → `media-manifest.json` → `revalidatePath('/exercise/<id>')`.
- **Go-live without redeploy:** overlay merges media URLs only over build-time JSON.
- **Fail-closed auth:** either env var unset → admin endpoints **503**.
- Pathnames are server-computed (`videos/<id>.mp4`, etc.).

## 5. File inventory (all in commit `ef4d44e`)

Unchanged from prior handover — see git show `ef4d44e`. New helper since then: `scripts/admin-upload-batch.mjs`.

## 6. Video → exercise mapping (the 11 prepared files)

Local folder: `C:\Users\Jeremy.H\Desktop\Recoverymate videos\0Finalized\`

| Local filename | Exercise id | Admin part page |
|---|---|---|
| `肩：过肩三头+肩后侧拉伸.mp4` | `shoulder-overhead-triceps-rear-stretch` | `/admin/upload/shoulder` |
| `肩：背后双手相扣开肩.mp4` | `shoulder-clasped-hands-chest-opener` | `/admin/upload/shoulder` |
| `肩：交叉抱肩拉伸.mp4` | `shoulder-cross-body-stretch` | `/admin/upload/shoulder` |
| `小臂：前臂伸肌拉伸.mp4` | `arm-forearm-extensor-stretch` | `/admin/upload/arm` |
| `小臂：前臂屈肌拉伸.mp4` | `arm-forearm-flexor-stretch` | `/admin/upload/arm` |
| `腰背--猫牛式 .mp4` | `lower-back-cat-cow` | `/admin/upload/lower-back` |
| `腰背：婴儿式.mp4` | `lower-back-childs-pose` | `/admin/upload/lower-back` |
| `膝盖：站立股四头肌拉伸.mp4` | `knee-standing-quad-stretch` | `/admin/upload/knee` |
| `膝盖：坐姿腘绳肌拉伸.mp4` | `knee-seated-hamstring-stretch` | `/admin/upload/knee` |
| `小腿：推墙腓肠肌拉伸.mp4` | `calf-wall-gastrocnemius-stretch` | `/admin/upload/calf` |
| `小腿：台阶腓肠肌拉伸.mp4` | `calf-stair-depth-stretch` | `/admin/upload/calf` |

**Not in this batch** (still need smaller encodes later — §7):  
`arm-wrist-rotations`, `arm-fixed-grip-biceps-stretch`, `calf-wall-soleus-stretch`, `ankle-inversion-stretch`, `ankle-eversion-stretch`, `ankle-circles`.  
Skip `ankle-pilot-placeholder`.

UI tip: open the part page → exercise card → **Video** row → Choose File → Upload → wait for ✓.

## 7. Storage capacity — IMPORTANT

- Hobby Blob hard-cap **1 GB**. These 11 ≈ **0.85 GB** → fits with ~150 MB headroom (tighter than the earlier ~0.66 GB estimate).
- Remaining ~6 exercise videos will **not** fit at ~70–90 MB each. Re-encode smaller first (720p H.264 @ ~1–1.5 Mbps → ~20–25 MB) per `docs/VideoPostProductionProtocol.md` §3, or upgrade to Pro.
- Transfer: 10 GB/month Hobby. Monitor Settings → Usage.

## 8. Locked decisions (do not re-litigate)

Unchanged — see prior §8 / `docs/DeploymentGuide.md` §8.

## 9. Verification gates — all green at `ef4d44e`

`npm test` 161/161 · typecheck · lint · validate:content · check:safety · build (with/without tokens) · e2e 4/4 · a11y 7/7 · live curl smoke at feature time.
Re-run after ANY code change: `npm run typecheck && npm run lint && npm test && npm run validate:content && npm run check:safety && npm run build`.

## 10. Troubleshooting

| Symptom | Fix |
|---|---|
| Agent/CLI `curl` to `*.vercel.app` → timeout / status 000 | Local DNS/network cannot reach Vercel (observed 2026-10-31). Use browser UI, VPN/proxy, or alternate DNS; Cursor WebFetch can still see the site. |
| `POST vercel.com/api/blob/mpu` → **400** (token OK, Content-Length 0 on create) | Blob store is **Private**; app uses `access: "public"`. Create a **new Public** store, reconnect, Redeploy. Confirm in DevTools → Response: `Cannot use public access on a private store`. |
| Admin endpoints **503** | Env var missing on CURRENT deployment → Redeploy |
| Login rejected | Wrong token, or env rotated without redeploy |
| File picker rejects video | Not `.mp4` — re-export H.264 + AAC |
| Upload hangs at **0%**, blob request `(pending)` | Proxy is routing `*.vercel-storage.com` — add it to the proxy bypass / DIRECT rules (reachable directly on this network), then retry |
| Upload stalls (other) | Retry; scoped tokens valid 30 min |
| Video not on exercise page | Hard-refresh; confirm row ✓; Storage has `videos/<id>.mp4` |
| Two uploads raced | Re-upload the missing one — overwrite fixes it |

## 11. Repo ops notes

- Untracked `*.tmp.mjs` scratch files — do not commit without asking.
- Dev: port 3199; local demo: `npm run build && npx next start -p 3100`.

## 12. Possible follow-ups (ask user first)

- Upload remaining media kinds (preview/poster/captions/transcript).
- Re-encode + upload the remaining 6 exercises within the 1 GB cap.
- `?v=` cache-buster if stale CDN observed.
- `PRODUCTION_SMOKE_URL=https://0-recovery-mate.vercel.app npm run test:smoke`.

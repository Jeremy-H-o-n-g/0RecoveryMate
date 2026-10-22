# RecoverMate Deployment Guide (S27)

**Status: procedure READY; the actual Vercel connection is student manual
work** (account/auth is yours — the partner must not hold deployment
credentials). Everything below is runnable from the repo as-is.

## 0. What deploys

Static-first Next.js App Router. Build output: `/` + `/body/[part]` ×6 SSG +
`/exercise/[id]` (dynamic, reads `?done=` + the Blob media overlay) +
`/flow/[sport]` ×8 SSG. No database and no user-facing server state.
*(2026-10-22: the app now DOES contain admin-only API routes under
`/api/admin/*` and an unlisted `/admin/upload` surface — see §8. The public
app surface is unchanged.)*
**All shipped exercise content is clearly-marked DRAFT** (S11 review pending);
the app labels this on every affected page, which is acceptable for a demo
deployment and required to stay truthful.

## 1. Deploy to Vercel (first time)

1. Push the repo to GitHub (main branch).
2. vercel.com → Add New… → Project → import the repo. Framework preset:
   **Next.js** (auto). Build command / output: defaults.
3. Environment variables: **none required for the public baseline**
   (`.env.example` documents this — 不要把密钥放到客户端). For the admin media
   upload feature (2026-10-22): `BLOB_READ_WRITE_TOKEN` is auto-injected when
   the Blob store is connected; `UPLOAD_ADMIN_TOKEN` must be added MANUALLY
   (Settings → Environment Variables → Production, mark Sensitive) — see §8.
   Without them the feature fails closed and the public app is unaffected.
4. Deploy. Record the URL in `docs/ReleaseChecklist.md`.
5. Custom domain (optional): Project → Settings → Domains → add
   `recovermate.example.org` → follow DNS instructions. HTTPS is automatic.

CLI alternative: `npm i -g vercel && vercel` (personal scope) → `vercel --prod`.

## 2. vercel.json — intentionally absent

The allowlist permits it "仅在需要时". Defaults already give us: Next.js
auto-detection, correct caching for static assets, `x-content-type-options`,
and HSTS at the edge. No rewrite/redirect/header overrides are needed today.
If a custom domain later needs extra headers, add them there with a comment
and re-run the smoke suite (security-header test guards the baseline).

## 3. Environment separation

| env | value |
|---|---|
| Preview (branch deploys) | automatic per-PR URL |
| Production | main branch → production URL |
| Local demo | `npm run build && npx next start -p 3100` (see `docs/OfflineDemo.md`) |

The PUBLIC app has no env-driven behavior (grep-verified S24 for the baseline;
the 2026-10-22 admin-upload additions are env-driven but admin-only and fail
closed). 日志最小化：the public app logs nothing and sends nothing
(no analytics); Vercel's default request logs contain URLs only — the app's
public URLs never encode health data (the only param is `?done=1`), satisfying
生产日志不记录部位选择 by construction. `/admin/*` URLs are unlisted, noindex,
and carry no health data either (exercise ids are already public content ids).

## 4. Production smoke (automated)

```powershell
$env:PRODUCTION_SMOKE_URL = "https://<your-app>.vercel.app"
npm run test:smoke
```

Covers: home/deep links (`/body/ankle`, exercise detail, `/flow/basketball`),
placeholder marking still visible in production, 404 handling, zero client
JS errors, security headers (`nosniff`, HSTS), and **zero third-party runtime
requests** (privacy posture). Without the env var the suite skips loudly, never
silently tests localhost. Capture output into `docs/release-S27.txt`.

## 5. Local demo copy (演示副本)

The offline/local demo is already part of the repo — no separate build needed:
`npm run build && npx next start -p 3100`, then follow `docs/OfflineDemo.md`.
Optionally zip the repo (minus `node_modules`/`.next`) as the demo fallback
copy on the presentation machine.

## 6. Rollback

See `docs/RecoveryGuide.md` — one-click via Vercel dashboard; rehearse BEFORE
the demo (学生手册工作: 演练回滚). Never delete previous deployments
(不要删除前一稳定部署).

## 7. Evidence to collect (student)

- `release-S27.txt` — smoke output against the real URL.
- `production-smoke-S27.pdf` — printout of the passing smoke run.
- `rollback-S27.mp4` — screen recording of the rollback rehearsal.
- Real-device/real-network checks per `docs/OfflineDemo.md` + ReleaseChecklist.

## 8. Admin media uploads (2026-10-22) — deploy checklist

The `/admin/upload` surface stores exercise media in the connected Vercel Blob
store; uploads go live on `/exercise/[id]` WITHOUT a Git commit or redeploy
(Blob overlay manifest, merged at request time).

| Var | Vercel | Local dev |
|---|---|---|
| `BLOB_READ_WRITE_TOKEN` | auto-injected when the store is connected (Storage tab) | `.env.local` (copy from dashboard → Storage → store) |
| `UPLOAD_ADMIN_TOKEN` | **MANUAL**: Settings → Environment Variables → Production (optionally Preview), value from `openssl rand -hex 32`, mark **Sensitive** | `.env.local` |

Steps:

1. Verify the Blob store shows **CONNECTED** to the project (Storage tab).
2. Add `UPLOAD_ADMIN_TOKEN` (see table), then **REDEPLOY** — Vercel does not
   hot-apply env changes to existing deployments.
3. Smoke: `https://<app>/admin/upload` → token login works → part pages list
   exercises → upload one small kind (e.g. captions `.vtt`) → the public
   exercise page shows it on the next visit, no redeploy.
4. Negative checks: `POST /api/admin/upload` without credentials → 401;
   unknown `exerciseId` → 400; `/admin/upload` responds `noindex` and is not
   linked from any public page.
5. Record the token in the password manager. Rotation = update the env var +
   redeploy + log in again (old cookies die: the hash no longer matches).
6. Rollback: the feature is additive — redeploying any previous deployment
   restores the pre-upload behavior (public pages render base JSON content;
   blobs/manifest can stay in the store harmlessly).

Without either env var the feature **fails closed**: admin endpoints answer
503 and public pages render base content unchanged (no crashes, offline demo
intact).

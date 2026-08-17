# RecoverMate Deployment Guide (S27)

**Status: procedure READY; the actual Vercel connection is student manual
work** (account/auth is yours — the partner must not hold deployment
credentials). Everything below is runnable from the repo as-is.

## 0. What deploys

Static-first Next.js App Router. Build output: `/` + `/body/[part]` ×6 SSG +
`/exercise/[id]` (dynamic, reads `?done=`) + `/flow/[sport]` ×8 SSG. No
database, no API routes, no server state — any Vercel Hobby project works.
**All shipped exercise content is clearly-marked DRAFT** (S11 review pending);
the app labels this on every affected page, which is acceptable for a demo
deployment and required to stay truthful.

## 1. Deploy to Vercel (first time)

1. Push the repo to GitHub (main branch).
2. vercel.com → Add New… → Project → import the repo. Framework preset:
   **Next.js** (auto). Build command / output: defaults.
3. Environment variables: **none required** (`.env.example` documents this —
   no secrets exist in the baseline; do not invent any. 不要把密钥放到客户端).
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

No env-driven behavior exists in the app (grep-verified S24: zero `fetch`, zero
`console.*` in app code). 日志最小化：the app logs nothing and sends nothing
(no analytics); Vercel's default request logs contain URLs only — the app's
URLs never encode health data (the only param is `?done=1`), satisfying
生产日志不记录部位选择 by construction.

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

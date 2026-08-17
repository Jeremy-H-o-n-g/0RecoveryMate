# RecoverMate Recovery / Rollback Guide (S27)

**Status: procedure READY; the rollback REHEARSAL (回滚演练) is student manual
work** — do it at least once before the demo and record `rollback-S27.mp4`.

## Principles

- Never delete previous stable deployments (不要删除前一稳定部署) — Vercel keeps
  them; rollback is instant and reversible.
- The app is stateless (no DB/accounts): rollback is purely "serve a previous
  build", so it is always safe.
- The local demo copy (`docs/OfflineDemo.md`) is the final fallback if BOTH
  production and its previous version misbehave.

## A. One-click rollback via Vercel dashboard (primary)

1. vercel.com → your project → **Deployments**.
2. Find the last known-good deployment (green ✓, before the problematic one).
3. Its ⋯ menu → **Promote to Production**. (~10–30 s; no rebuild.)
4. Verify: open the production URL → home renders → `/body/ankle` renders →
   run the smoke suite:
   ```powershell
   $env:PRODUCTION_SMOKE_URL = "https://<your-app>.vercel.app"
   npm run test:smoke
   ```
5. Record what happened in `docs/ReleaseChecklist.md` §incident log.

## B. Roll forward via Git (when the fix is ready)

`git revert <bad-commit>` → push → Vercel builds a new production deployment
automatically. Prefer revert over force-push (history stays honest).

## C. Local emergency demo (offline fallback)

If the network or Vercel itself is down at demo time:

```powershell
npm run build
npx next start -p 3100
```

Then present from `http://127.0.0.1:3100` following `docs/OfflineDemo.md`
(ankle loop). The demo copy lives in the repo — also keep a zip on the
presentation machine (see DeploymentGuide §5).

## D. Rehearsal script (record as rollback-S27.mp4)

1. Note the current production deployment URL + timestamp.
2. Trigger a deliberate test: deploy a scratch commit (e.g., README change) →
   wait for it to go live.
3. Dashboard → previous deployment → Promote to Production.
4. Show the production URL back on the previous content.
5. Run the smoke suite against the restored URL (must pass).
6. Clean up: delete ONLY the scratch deployment if desired; keep the two real
   ones. State in the recording: "rollback completed in under a minute, no
   data at risk".

## E. What NOT to do

- Do not delete old deployments to "tidy up".
- Do not roll back by force-pushing main (use Promote or revert).
- Do not change dependency versions during a rollback (不要在最后时刻升级依赖).
- Do not attempt to "fix" production by editing files on the server — there
  are none; the repo is the only source of truth.

import { defineConfig } from "@playwright/test";

/**
 * S23 release-regression browser config. Projects:
 * - e2e   : core-path flows (incl. keyboard-only navigation), local server.
 * - a11y  : axe scans of every core route; serious/critical = failure.
 * - smoke : S27 PRODUCTION smoke — runs ONLY when PRODUCTION_SMOKE_URL is set
 *           (e.g. the deployed Vercel URL). No local webServer is started; the
 *           suite hits the live deployment (routes, deep links, 404, security
 *           headers, no-console-error).
 *
 * e2e/a11y use the production `next build` + `next start` server (webServer) so
 * the scans run against real output, not a dev server.
 */
const smokeUrl = process.env.PRODUCTION_SMOKE_URL;

export default defineConfig({
  testDir: "./tests/browser",
  timeout: 60_000,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: smokeUrl ?? "http://127.0.0.1:3100",
    trace: "off",
  },
  webServer: smokeUrl
    ? undefined
    : {
        command: "npx next start -p 3100",
        port: 3100,
        reuseExistingServer: true,
        timeout: 120_000,
      },
  projects: [
    { name: "e2e", testMatch: /core-path\.spec\.ts/ },
    { name: "a11y", testMatch: /a11y-scan\.spec\.ts/ },
    {
      name: "smoke",
      testMatch: /production-smoke\.spec\.ts/,
    },
  ],
});

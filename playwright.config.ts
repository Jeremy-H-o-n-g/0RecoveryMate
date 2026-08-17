import { defineConfig } from "@playwright/test";

/**
 * S23 release-regression browser config. Two projects:
 * - e2e  : core-path flows (incl. keyboard-only navigation).
 * - a11y : axe scans of every core route; serious/critical = failure.
 *
 * Both use the production `next build` + `next start` server (webServer) so
 * the scans run against real output, not a dev server. `npm run test:e2e` /
 * `npm run test:a11y` select the project.
 */
export default defineConfig({
  testDir: "./tests/browser",
  timeout: 60_000,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "off",
  },
  webServer: {
    command: "npx next start -p 3100",
    port: 3100,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: "e2e", testMatch: /core-path\.spec\.ts/ },
    { name: "a11y", testMatch: /a11y-scan\.spec\.ts/ },
  ],
});

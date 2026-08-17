import { expect, test } from "@playwright/test";

/**
 * S27 PRODUCTION smoke suite. Runs ONLY against a real deployment:
 *   PRODUCTION_SMOKE_URL=https://<app>.vercel.app npm run test:smoke
 * (playwright.config.ts skips the local webServer when the env var is set —
 * hitting the live URL is the whole point.) Without the env var the tests SKIP
 * (with instructions) so local suites stay green — they must never silently
 * fall back to testing localhost.
 */

const required = process.env.PRODUCTION_SMOKE_URL;

test.beforeEach(() => {
  test.skip(
    !required,
    "PRODUCTION_SMOKE_URL is not set — see docs/DeploymentGuide.md §smoke"
  );
});

test.describe("production smoke (S27)", () => {
  test("home + deep links + 404 + placeholder marking", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));

    await page.goto("/");
    await expect(page.getByRole("heading", { name: "RecoverMate" })).toBeVisible();

    // SSG deep links.
    await page.goto("/body/ankle");
    await expect(
      page.getByRole("heading", { name: "脚踝", exact: true })
    ).toBeVisible();

    await page.goto("/exercise/ankle-inversion-stretch");
    await expect(page.getByText(/Stop signals/i)).toBeVisible();
    // Placeholder content stays clearly marked in production (S02/S20).
    await expect(page.getByText(/\[Placeholder/i).first()).toBeVisible();

    await page.goto("/flow/basketball");
    await expect(
      page.getByRole("heading", { name: /篮球恢复流程/ })
    ).toBeVisible();

    // 404 handling.
    const res = await page.goto("/exercise/does-not-exist");
    expect(res?.status()).toBe(404);

    // No client errors surfaced during the walk (日志最小化 + no broken JS).
    expect(errors).toEqual([]);
  });

  test("security headers present on the deployment", async ({ request }) => {
    const res = await request.get("/");
    const headers = res.headers();
    // Vercel always sets these; we assert so a config regression is visible.
    expect(headers["x-content-type-options"]).toContain("nosniff");
    // HSTS is terminated at Vercel's edge for *.vercel.app (and custom domains).
    expect(headers["strict-transport-security"] ?? "").toMatch(/max-age/);
    // We do NOT set a reporting/analytics beacon anywhere (privacy posture).
    expect(headers["report-to"] ?? "none").toBe("none");
  });

  test("no third-party runtime requests on the home page (privacy)", async ({
    page,
  }) => {
    const thirdParty: string[] = [];
    page.on("request", (req) => {
      const u = new URL(req.url());
      const base = required ? new URL(required) : null;
      const isSelf =
        u.hostname === "localhost" ||
        u.hostname === "127.0.0.1" ||
        (base && (u.hostname === base.hostname || u.hostname.endsWith(".vercel.app") && base.hostname.endsWith(".vercel.app")));
      if (!isSelf && !u.protocol.startsWith("data:")) thirdParty.push(req.url());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(thirdParty, "no external runtime requests allowed").toEqual([]);
  });
});

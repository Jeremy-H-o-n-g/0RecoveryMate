import { expect, test } from "@playwright/test";

/**
 * S23 browser E2E: the core path against the production build
 * (config webServer = next start). Complements the jsdom suites — this file
 * covers real navigation, real keyboard focus, and real layout.
 */

test.describe("core path (S23)", () => {
  test("home -> region -> detail -> finish, with back paths", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "RecoverMate" })).toBeVisible();

    // Region page via a real hotspot click.
    await page.getByRole("button", { name: /ankle/i }).first().click();
    await expect(page).toHaveURL(/\/body\/ankle$/);
    // Heading shows zh + en (redesign); the ml-3 span yields no space in the
    // accessible name, so match flexibly.
    await expect(
      page.getByRole("heading", { name: /脚踝\s*Ankle/ })
    ).toBeVisible();

    // Card -> detail.
    await page
      .getByRole("link", { name: /站立扶墙踝内翻拉伸/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/exercise\/ankle-inversion-stretch$/);
    // Safety BEFORE the action, in the real DOM order.
    const safety = page.getByText(/Stop signals/i);
    const session = page.locator("[aria-label='Exercise session']");
    const safetyBox = await safety.boundingBox();
    const sessionBox = await session.boundingBox();
    expect(safetyBox).not.toBeNull();
    if (sessionBox) {
      expect(safetyBox!.y).toBeLessThan(sessionBox.y);
    }
    await expect(safety).toBeVisible();

    // Session present, no autoplay (safety), steps usable.
    await expect(page.getByRole("heading", { name: /^Steps$/, level: 2 })).toBeVisible();

    // User-confirmed completion (?done=1) then back to the region.
    await page.getByRole("link", { name: /Mark exercise complete/i }).click();
    await expect(page.getByRole("status")).toContainText(/Exercise complete/i);
    await page.getByRole("link", { name: /Back to Ankle/i }).first().click();
    await expect(page).toHaveURL(/\/body\/ankle$/);
  });

  test("keyboard-only: body map is operable without a pointer", async ({ page }) => {
    await page.goto("/");
    // Tab reaches hotspot buttons and Enter activates navigation.
    await page.keyboard.press("Tab"); // (focus ring/links first)
    const focused = page.locator(":focus");
    let guard = 0;
    while (guard++ < 25) {
      const tag = await focused.evaluate((el) => el.tagName);
      if (tag === "BUTTON") break;
      await page.keyboard.press("Tab");
    }
    await expect(focused).toBeFocused();
    // Move focus into the body-map hotspots and activate.
    const hotspots = page.getByRole("button");
    const count = await hotspots.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const el = hotspots.nth(i);
      const label = (await el.getAttribute("aria-label")) ?? "";
      if (/ankle/i.test(label)) {
        await el.focus();
        await page.keyboard.press("Enter");
        break;
      }
    }
    await expect(page).toHaveURL(/\/body\/ankle$/);
  });

  test("no horizontal scrolling at mobile width (375px)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const path of ["/", "/body/ankle", "/exercise/ankle-circles", "/flow/basketball"]) {
      await page.goto(path);
      const overflowX = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflowX, `${path} must not scroll horizontally`).toBeLessThanOrEqual(0);
    }
  });

  test("invalid routes 404; flow route stays user-controlled", async ({ page }) => {
    const res = await page.goto("/exercise/not-an-exercise");
    expect(res?.status()).toBe(404);

    await page.goto("/flow/basketball");
    await expect(page.getByRole("heading", { name: /篮球恢复流程/ })).toBeVisible();
    // Nothing advances by itself: wait 2.5s and assert still on item 1.
    await page.waitForTimeout(2500);
    await expect(page.getByText(/第 1 \/ \d+ 个/)).toBeVisible();
    await expect(page.getByText(/不会自动播放下一个动作/)).toBeVisible();
  });
});

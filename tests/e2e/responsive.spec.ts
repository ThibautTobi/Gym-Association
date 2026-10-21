import { expect, test } from "@playwright/test";

test.describe("Responsive", () => {
  test("affiche correctement le site sur mobile", async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();

    /**
     * Le menu desktop ne doit pas être utilisé comme
     * navigation principale sur petit écran.
     *
     * Le bouton du menu mobile doit être accessible.
     */
    await expect(
      page.getByRole("button", {
        name: /menu|ouvrir/i,
      }),
    ).toBeVisible();
  });

  test("permet d'ouvrir la navigation mobile", async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto("/");

    const menuButton = page.getByRole("button", {
      name: /menu|ouvrir/i,
    });

    await menuButton.click();

    await expect(
      page.getByRole("navigation", { name: /mobile/i }),
    ).toBeVisible();
  });

  test("affiche correctement le site sur tablette", async ({ page }) => {
    await page.setViewportSize({
      width: 768,
      height: 1024,
    });

    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();
  });

  test("affiche correctement le site sur desktop", async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 900,
    });

    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();
  });
});

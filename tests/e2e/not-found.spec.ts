import { expect, test } from "@playwright/test";

test("affiche une page 404 pour une URL inexistante", async ({ page }) => {
  await page.goto("/page-qui-nexiste-pas");

  await expect(page).toHaveTitle(/val de sa.ne/i);

  await expect(
    page.getByRole("heading", {
      level: 1,
    }),
  ).toBeVisible();
});

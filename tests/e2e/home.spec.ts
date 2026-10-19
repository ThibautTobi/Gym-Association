import { expect, test } from "@playwright/test";

test.describe("Page d'accueil", () => {
  test("affiche correctement la page d'accueil", async ({ page }) => {
    await page.goto("/");

    /**
     * Vérifie que la page possède un titre HTML.
     */
    await expect(page).toHaveTitle(/val de sa.ne/i);

    /**
     * Vérifie la présence du titre principal.
     */
    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();
  });

  test("permet d'accéder à la page des activités", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("link", {
        name: /activités/i,
      })
      .first()
      .click();

    await expect(page).toHaveURL(/\/activites$/);

    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();
  });
});

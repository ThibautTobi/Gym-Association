import { expect, test } from "@playwright/test";

test.describe("Activités", () => {
  test("affiche la liste des activités", async ({ page }) => {
    await page.goto("/activites");

    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();

    /**
     * Le site doit présenter plusieurs activités.
     */
    await expect(page.getByRole("article")).toHaveCount(6);
  });

  test("permet d'ouvrir une activité", async ({ page }) => {
    await page.goto("/activites");

    const firstActivity = page.getByRole("article").first();

    await firstActivity.getByRole("link").click();

    await expect(page).toHaveURL(/\/activites\/.+/);

    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();
  });
});

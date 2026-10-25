import { expect, test } from "@playwright/test";

import { activities } from "../../lib/data/activities";

test.describe("Activités", () => {
  test("affiche la liste des activités", async ({ page }) => {
    await page.goto("/activites");

    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();

    /**
     * Le site doit présenter toutes les activités de `activities.ts`.
     * Le nombre suit automatiquement les données : plus besoin de
     * modifier ce test à chaque ajout d'activité.
     */
    await expect(page.getByRole("article")).toHaveCount(activities.length);
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

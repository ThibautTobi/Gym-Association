import { expect, test } from "@playwright/test";

test.describe("Horaires", () => {
  test("affiche les horaires des cours", async ({ page }) => {
    await page.goto("/horaires");

    // Titre principal de la page.
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    /**
     * On vérifie des informations réelles de la saison plutôt qu'une
     * structure HTML : le test résiste ainsi à un changement de
     * présentation (tableau, cartes, liste...).
     * .first() : le même texte peut apparaître plusieurs fois.
     */
    await expect(page.getByText("Baby Gym").first()).toBeVisible();
    await expect(page.getByText(/10 h – 10 h 45/).first()).toBeVisible();
    await expect(page.getByText(/Pilates/).first()).toBeVisible();
  });
});

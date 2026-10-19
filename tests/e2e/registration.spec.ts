import { expect, test } from "@playwright/test";

test.describe("Formulaire de pré-inscription", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/essai");
  });

  test("affiche correctement le formulaire", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();

    await expect(page.getByLabel(/prénom/i)).toBeVisible();

    await expect(page.getByLabel(/^nom/i)).toBeVisible();

    await expect(page.getByLabel(/date de naissance/i)).toBeVisible();

    await expect(page.getByLabel(/e-mail/i)).toBeVisible();

    await expect(page.getByLabel(/téléphone/i)).toBeVisible();

    await expect(page.getByLabel(/activité/i)).toBeVisible();

    await expect(page.getByLabel(/niveau/i)).toBeVisible();
  });

  test("refuse une pré-inscription vide", async ({ page }) => {
    await page
      .getByRole("button", {
        name: /demander une séance d'essai/i,
      })
      .click();

    await expect(
      page.getByText(/le prénom doit contenir au moins 2 caractères/i),
    ).toBeVisible();

    await expect(
      page.getByText(/le nom doit contenir au moins 2 caractères/i),
    ).toBeVisible();
  });

  test("refuse une date de naissance dans le futur", async ({ page }) => {
    await page.getByLabel(/prénom/i).fill("Jean");

    await page.getByLabel(/^nom/i).fill("Dupont");

    await page.getByLabel(/date de naissance/i).fill("2099-01-01");

    await page.getByLabel(/e-mail/i).fill("jean.dupont@example.com");

    await page.getByLabel(/téléphone/i).fill("06 12 34 56 78");

    await page.getByLabel(/activité/i).selectOption("gymnastique-loisir");

    await page.getByLabel(/niveau/i).selectOption("debutant");

    await page.getByRole("checkbox").check();

    await page
      .getByRole("button", {
        name: /demander une séance d'essai/i,
      })
      .click();

    await expect(page.getByText(/date de naissance valide/i)).toBeVisible();
  });

  test("refuse un numéro de téléphone invalide", async ({ page }) => {
    await page.getByLabel(/prénom/i).fill("Jean");

    await page.getByLabel(/^nom/i).fill("Dupont");

    await page.getByLabel(/date de naissance/i).fill("1995-06-15");

    await page.getByLabel(/e-mail/i).fill("jean.dupont@example.com");

    await page.getByLabel(/téléphone/i).fill("123456");

    await page.getByLabel(/activité/i).selectOption("gymnastique-loisir");

    await page.getByLabel(/niveau/i).selectOption("debutant");

    await page.getByRole("checkbox").check();

    await page
      .getByRole("button", {
        name: /demander une séance d'essai/i,
      })
      .click();

    await expect(
      page.getByText(/numéro de téléphone français valide/i),
    ).toBeVisible();
  });

  test("accepte une pré-inscription valide", async ({ page }) => {
    await page.route("https://formspree.io/**", async (route) => {
      const corsHeaders = {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "*",
      };

      // Répond à la requête de vérification CORS du navigateur.
      if (route.request().method() === "OPTIONS") {
        await route.fulfill({
          status: 204,
          headers: corsHeaders,
        });
        return;
      }

      // Simule une réponse de succès compatible avec Formspree.
      await route.fulfill({
        status: 200,
        headers: corsHeaders,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          next: "https://formspree.io/thanks",
        }),
      });
    });

    await page.getByLabel(/prénom/i).fill("Jean");

    await page.getByLabel(/^nom/i).fill("Dupont");

    await page.getByLabel(/date de naissance/i).fill("1995-06-15");

    await page.getByLabel(/e-mail/i).fill("jean.dupont@example.com");

    await page.getByLabel(/téléphone/i).fill("06 12 34 56 78");

    await page.getByLabel(/activité/i).selectOption("gymnastique-loisir");

    await page.getByLabel(/niveau/i).selectOption("debutant");

    await page.getByRole("checkbox").check();

    await page
      .getByRole("button", {
        name: /demander une séance d'essai/i,
      })
      .click();

    await expect(page.getByRole("status")).toContainText(
      /demande.*envoyée|séance d'essai.*envoyée/i,
      {
        timeout: 10_000,
      },
    );
  });
});

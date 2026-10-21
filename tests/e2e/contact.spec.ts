import { expect, test } from "@playwright/test";

test.describe("Formulaire de contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("affiche correctement le formulaire", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();

    await expect(page.getByLabel(/prénom/i)).toBeVisible();

    await expect(page.getByLabel(/^nom/i)).toBeVisible();

    await expect(page.getByLabel(/e-mail/i)).toBeVisible();

    await expect(page.getByLabel(/sujet/i)).toBeVisible();

    await expect(page.getByLabel(/message/i)).toBeVisible();

    await expect(page.getByRole("checkbox")).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: /envoyer/i,
      }),
    ).toBeVisible();
  });

  test("affiche les erreurs lorsque le formulaire est vide", async ({
    page,
  }) => {
    await page
      .getByRole("button", {
        name: /envoyer/i,
      })
      .click();

    await expect(
      page.getByText(/le prénom doit contenir au moins 2 caractères/i),
    ).toBeVisible();

    await expect(
      page.getByText(/le nom doit contenir au moins 2 caractères/i),
    ).toBeVisible();

    await expect(page.getByText(/adresse e-mail valide/i)).toBeVisible();
  });

  test("valide les champs avant la soumission", async ({ page }) => {
    await page.getByLabel(/prénom/i).fill("Jean");

    await page.getByLabel(/^nom/i).fill("Dupont");

    await page.getByLabel(/e-mail/i).fill("email-invalide");

    await page.getByLabel(/sujet/i).fill("Demande d'information");

    await page
      .getByLabel(/message/i)
      .fill("Bonjour, je souhaite obtenir des informations.");

    await page.getByRole("checkbox").check();

    await page
      .getByRole("button", {
        name: /envoyer/i,
      })
      .click();

    await expect(page.getByText(/adresse e-mail valide/i)).toBeVisible();
  });

  test("accepte un formulaire correctement rempli", async ({ page }) => {
    /**
     * Intercepte la requête Formspree.
     *
     * Le test ne dépend donc pas du réseau externe.
     */
    await page.route("https://formspree.io/**", async (route) => {
      /**
       * En-têtes CORS : sans eux, le navigateur bloque la fausse
       * réponse, car la requête part vers un autre domaine.
       */
      const corsHeaders = {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "*",
      };

      /**
       * Requête de vérification ("preflight") envoyée par le
       * navigateur AVANT le vrai envoi : on l'accepte simplement.
       */
      if (route.request().method() === "OPTIONS") {
        await route.fulfill({ status: 204, headers: corsHeaders });
        return;
      }

      // Vraie requête d'envoi : on simule le succès de Formspree.
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

    await page.getByLabel(/e-mail/i).fill("jean.dupont@example.com");

    await page.getByLabel(/sujet/i).fill("Demande d'information");

    await page
      .getByLabel(/message/i)
      .fill("Bonjour, je souhaite obtenir des informations.");

    await page.getByRole("checkbox").check();

    await page
      .getByRole("button", {
        name: /envoyer/i,
      })
      .click();

    /**
     * On attend la réponse de Formspree.
     */
    await expect(page.getByRole("status")).toContainText(
      /message envoyé avec succès/i,
      {
        timeout: 10_000,
      },
    );
  });
});

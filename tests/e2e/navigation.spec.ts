import { expect, test } from "@playwright/test";

/**
 * Tests e2e de la navigation.
 *
 * Emplacement : tests/e2e/navigation.spec.ts
 *
 * CONSTAT (d'après error-context.md) : le menu principal contient
 * uniquement : Accueil, L'association, Activités, Horaires,
 * Actualités, Contact.
 * Les pages "Événements" et "Galerie" n'ont PAS de lien dans le menu :
 * le test précédent cherchait donc des liens qui n'existent pas
 * (d'où l'attente de 30 s puis le timeout).
 *
 * Solution : on sépare les deux cas.
 *  1. Pages du menu      -> on clique sur le lien.
 *  2. Pages hors du menu -> on ouvre directement l'adresse.
 */

/**
 * Pages accessibles depuis le menu principal.
 * `name` est le texte EXACT du lien dans le menu.
 */
const menuRoutes = [
  { name: "Activités", url: "/activites" },
  { name: "Horaires", url: "/horaires" },
  { name: "Actualités", url: "/actualites" },
  { name: "Contact", url: "/contact" },
];

/**
 * Pages qui existent mais ne sont pas dans le menu.
 *
 * Si tu ajoutes un jour ces liens au menu, déplace-les simplement
 * vers `menuRoutes`.
 */
const pagesOutsideMenu = [
  { name: "Événements", url: "/evenements" },
  { name: "Galerie", url: "/galerie" },
];

test.describe("Navigation principale", () => {
  /**
   * Un test PAR page (plutôt qu'une boucle dans un seul test) :
   * si une page échoue, le rapport indique laquelle, et les autres
   * sont quand même testées.
   */
  for (const route of menuRoutes) {
    test(`le menu permet d'accéder à la page ${route.name}`, async ({
      page,
    }) => {
      await page.goto("/");

      /**
       * exact: true -> le nom doit être EXACTEMENT "Activités"
       * (casse ignorée) : "Nos activités" et "Découvrir nos activités"
       * ne correspondent donc pas.
       *
       * .first() -> si le même texte existe aussi ailleurs (pied de page),
       * on prend le premier, donc celui de l'en-tête.
       */
      await page
        .getByRole("link", { name: route.name, exact: true })
        .first()
        .click();

      // L'URL doit se terminer par la page attendue.
      await expect(page).toHaveURL(new RegExp(`${route.url}$`));

      // La nouvelle page doit afficher son titre principal.
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

test.describe("Pages hors du menu principal", () => {
  for (const route of pagesOutsideMenu) {
    test(`la page ${route.name} s'affiche`, async ({ page }) => {
      // On ouvre directement l'adresse : pas besoin d'un lien de menu.
      await page.goto(route.url);

      await expect(page).toHaveURL(new RegExp(`${route.url}$`));

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

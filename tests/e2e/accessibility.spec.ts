import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pagesToTest = [
  {
    name: "Accueil",
    url: "/",
  },
  {
    name: "Activités",
    url: "/activites",
  },
  {
    name: "Horaires",
    url: "/horaires",
  },
  {
    name: "Actualités",
    url: "/actualites",
  },
  {
    name: "Événements",
    url: "/evenements",
  },
  {
    name: "Galerie",
    url: "/galerie",
  },
  {
    name: "Inscription",
    url: "/inscription",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];

test.describe("Accessibilité", () => {
  for (const currentPage of pagesToTest) {
    test(`${currentPage.name} ne présente pas de violation critique`, async ({
      page,
    }) => {
      await page.goto(currentPage.url);

      const accessibilityScanResults = await new AxeBuilder({
        page,
      }).analyze();

      const criticalViolations = accessibilityScanResults.violations.filter(
        (violation) => violation.impact === "critical",
      );

      expect(
        criticalViolations,
        `Violations critiques détectées sur ${currentPage.name}`,
      ).toEqual([]);
    });
  }
});

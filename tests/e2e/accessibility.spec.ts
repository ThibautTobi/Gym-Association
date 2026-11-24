import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pagesToTest = [
  { name: "Accueil", url: "/" },
  { name: "Activites", url: "/activites" },
  { name: "Activite Pilates", url: "/activites/pilates" },
  { name: "Horaires", url: "/horaires" },
  { name: "Actualites", url: "/actualites" },
  { name: "Evenements", url: "/evenements" },
  { name: "Galerie", url: "/galerie" },
  { name: "Essai", url: "/essai" },
  { name: "Contact", url: "/contact" },
];

test.describe("Accessibilite", () => {
  for (const currentPage of pagesToTest) {
    test(`${currentPage.name} ne presente pas de violation grave`, async ({
      page,
    }) => {
      await page.goto(currentPage.url);

      const accessibilityScanResults = await new AxeBuilder({
        page,
      }).analyze();

      const seriousViolations = accessibilityScanResults.violations.filter(
        (violation) =>
          violation.impact === "critical" || violation.impact === "serious",
      );

      const report = seriousViolations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        help: violation.help,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      }));

      expect(
        report,
        `Violations graves detectees sur ${currentPage.name} : ${JSON.stringify(report, null, 2)}`,
      ).toEqual([]);
    });
  }
});

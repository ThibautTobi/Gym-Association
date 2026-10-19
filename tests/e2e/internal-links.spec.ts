import { expect, test } from "@playwright/test";

test("les principaux liens de navigation ne renvoient pas vers une page 404", async ({
  page,
}) => {
  await page.goto("/");

  const links = await page.getByRole("link").evaluateAll((elements) =>
    elements
      .map((element) => element.getAttribute("href"))
      .filter(
        (href): href is string =>
          // CORRIGÉ : comparaison explicite avec null, que TypeScript comprend.
          // (href !== null) garantit ensuite que href est une chaîne.
          href !== null && href.startsWith("/") && !href.startsWith("//"),
      ),
  );

  // Set supprime les doublons : chaque lien n'est testé qu'une fois.
  const uniqueLinks = [...new Set(links)];

  for (const href of uniqueLinks) {
    const response = await page.request.get(href);

    expect(
      response.status(),
      `Le lien ${href} renvoie le statut ${response.status()}`,
    ).toBeLessThan(400);
  }
});

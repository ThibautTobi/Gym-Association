import { expect, test } from "@playwright/test";

test.describe("SEO", () => {
  test("la page d'accueil possède les éléments SEO essentiels", async ({
    page,
  }) => {
    await page.goto("/");

    /**
     * Une page doit avoir un <title>.
     */
    const title = await page.title();

    expect(title.trim().length).toBeGreaterThan(0);

    /**
     * Une meta description doit être présente.
     */
    const description = page.locator('meta[name="description"]');

    await expect(description).toHaveCount(1);

    const descriptionContent = await description.getAttribute("content");

    expect(descriptionContent).not.toBeNull();
    expect(descriptionContent?.trim().length).toBeGreaterThan(0);

    /**
     * Vérifie la présence d'un H1.
     */
    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toHaveCount(1);
  });

  test("la page d'accueil possède un canonical", async ({ page }) => {
    await page.goto("/");

    const canonical = page.locator('link[rel="canonical"]');

    await expect(canonical).toHaveCount(1);

    const href = await canonical.getAttribute("href");

    expect(href).not.toBeNull();
    expect(href).toMatch(/^https?:\/\//);
  });

  test("les fichiers robots.txt et sitemap.xml sont accessibles", async ({
    request,
  }) => {
    const robotsResponse = await request.get("/robots.txt");

    expect(robotsResponse.ok()).toBe(true);

    const robotsContent = await robotsResponse.text();

    expect(robotsContent).toMatch(/user-agent/i);

    const sitemapResponse = await request.get("/sitemap.xml");

    expect(sitemapResponse.ok()).toBe(true);

    const sitemapContent = await sitemapResponse.text();

    expect(sitemapContent).toContain("<urlset");
  });
});

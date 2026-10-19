import { defineConfig, devices } from "@playwright/test";

/**
 * Configuration des tests End-to-End avec Playwright.
 */
export default defineConfig({
  /**
   * Emplacement de tous les tests E2E.
   */
  testDir: "./tests/e2e",

  /**
   * Exécute les tests de manière séquentielle en local.
   *
   * En CI, Playwright pourra paralléliser davantage selon
   * la configuration de la machine.
   */
  fullyParallel: true,

  /**
   * Empêche accidentellement de laisser passer des tests
   * en échec dans une CI.
   */
  forbidOnly: !!process.env.CI,

  /**
   * Nombre de tentatives supplémentaires en CI.
   */
  retries: process.env.CI ? 2 : 0,

  /**
   * Nombre de workers.
   */
  workers: process.env.CI ? 1 : undefined,

  /**
   * Rapport HTML permettant d'analyser les résultats.
   */
  reporter: [["html", { open: "never" }]],

  /**
   * Options communes à tous les tests.
   */
  use: {
    /**
     * Adresse locale de l'application.
     */
    baseURL: "http://127.0.0.1:3000",

    /**
     * Capture une trace uniquement lorsqu'un test échoue
     * après une nouvelle tentative.
     */
    trace: "on-first-retry",

    /**
     * Capture une image en cas d'échec.
     */
    screenshot: "only-on-failure",

    /**
     * Enregistre une vidéo uniquement en cas d'échec.
     */
    video: "retain-on-failure",
  },

  /**
   * Navigateurs utilisés.
   *
   * Nous commençons volontairement avec Chromium.
   * Firefox et WebKit pourront être ajoutés ensuite.
   */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  /**
   * Lance automatiquement Next.js avant les tests.
   *
   * Cela évite de devoir faire `npm run dev` manuellement.
   */
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

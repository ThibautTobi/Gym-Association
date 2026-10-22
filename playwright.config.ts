import { defineConfig, devices } from "@playwright/test";

/**
 * Configuration des tests End-to-End avec Playwright.
 *
 * Emplacement : playwright.config.ts (racine du projet)
 */
export default defineConfig({
  /**
   * Emplacement de tous les tests E2E.
   */
  testDir: "./tests/e2e",

  /**
   * Les tests de fichiers différents s'exécutent en parallèle.
   * Le nombre de workers est réglé plus bas.
   */
  fullyParallel: true,

  /**
   * Empêche de laisser passer un `test.only` oublié dans une CI.
   */
  forbidOnly: !!process.env.CI,

  /**
   * Nombre de tentatives supplémentaires en CI.
   */
  retries: process.env.CI ? 2 : 0,

  /**
   * Nombre de workers :
   * - en CI : 1 (machine peu puissante, résultats plus stables) ;
   * - en local : valeur par défaut de Playwright (la moitié des cœurs).
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
   * Lance automatiquement le site avant les tests.
   *
   * CHANGEMENT : on teste la version COMPILÉE du site
   * (`build` puis `start`) au lieu du mode développement (`dev`).
   *
   * Pourquoi :
   * - en mode développement, chaque page est compilée à sa première
   *   visite : avec plusieurs tests en parallèle, cela provoque des
   *   échecs aléatoires (timeouts) ;
   * - en production, toutes les pages sont déjà générées : les tests
   *   sont stables, et plus proches de ce que verront les visiteurs.
   *
   * Le premier démarrage est plus long (build), d'où le timeout élevé.
   */
  webServer: {
    command: "npm run build && npm run start",
    url: "http://127.0.0.1:3000",

    /**
     * En local, réutilise un serveur déjà lancé sur le port 3000.
     * ⚠ Dans ce cas, le bloc `env` ci-dessous n'est PAS appliqué :
     * arrête ton `npm run dev` avant de lancer les tests.
     */
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,

    /**
     * Identifiants Formspree FACTICES, réservés aux tests.
     *
     * Pourquoi : `.env.local` n'existe pas sur GitHub (il est ignoré par
     * Git). Sans ces valeurs, les formulaires afficheraient
     * « temporairement indisponible » et n'enverraient jamais rien.
     *
     * Les tests simulent la réponse de Formspree : la valeur importe peu,
     * il faut seulement qu'elle existe. Ainsi, aucun vrai message ne peut
     * partir pendant les tests.
     *
     * ⚠ Les noms doivent être EXACTEMENT ceux lus par tes composants
     * (cherche `process.env` dans ContactForm.tsx et RegistrationForm.tsx).
     * Ils sont intégrés au site pendant le `build` : c'est pourquoi ce bloc
     * s'applique bien à la commande ci-dessus.
     */
    env: {
      NEXT_PUBLIC_FORMSPREE_CONTACT_ID: "test-contact-id",
      NEXT_PUBLIC_FORMSPREE_REGISTRATION_ID: "test-registration-id",
    },
  },
});

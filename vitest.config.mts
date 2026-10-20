import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // Correspond à l'alias @/* défini dans tsconfig.json.
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },

  test: {
    // Simule un environnement navigateur pour les tests React.
    environment: "jsdom",

    // Charge les matchers et la configuration de test.
    setupFiles: ["./vitest.setup.ts"],

    // Les tests E2E sont exécutés exclusivement avec Playwright.
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
});

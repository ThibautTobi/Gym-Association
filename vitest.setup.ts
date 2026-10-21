// Enregistre les matchers jest-dom dans expect ET les déclare à TypeScript.
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Démonte les composants après chaque test (nécessaire sans `globals`).
afterEach(() => {
  cleanup();
});

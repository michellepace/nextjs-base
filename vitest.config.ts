import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({ babel: { plugins: [["babel-plugin-react-compiler"]] } }),
  ],
  test: {
    allowOnly: !process.env.CI, // Block .only() in CI (explicit, matches Playwright forbidOnly)
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    // Exclude e2e tests (Playwright handles those)
    exclude: ["**/node_modules/**", "**/e2e/**", "**/.next/**"],
  },
});

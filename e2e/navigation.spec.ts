import { expect, test } from "@playwright/test";

/**
 * Navigation Tests - Standard Implementation
 *
 * Tests navigation between pages using Playwright's recommended locator patterns.
 * This implementation follows current Playwright best practices (2024).
 *
 * Locator Strategy:
 * - getByRole() - Accessibility-focused locators (ARIA roles)
 * - Semantic, user-centric element selection
 *
 * Why these locators:
 * 1. More resilient to HTML structure changes
 * 2. Encourage accessible web design (if the test finds it, screen readers can too)
 * 3. Self-documenting and readable
 * 4. Official Playwright recommendation
 *
 * Note: For comparison with Next.js official docs pattern, see navigation-nextjs-docs.spec.ts
 */

test("should navigate to the about page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");

  // Find the About link using its accessible role and name
  // Using getByRole verifies the element is actually a clickable link
  await page.getByRole("link", { name: "About" }).click();

  // Verify navigation occurred
  await expect(page).toHaveURL("/about");

  // Verify the About page heading using semantic role selector
  await expect(page.getByRole("heading", { level: 1 })).toContainText("About");
});

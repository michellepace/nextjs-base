import { expect, test } from "@playwright/test";

/**
 * Next.js Official Documentation Reference Implementation
 *
 * This test follows the exact pattern shown in Next.js official documentation.
 * Reference: https://nextjs.org/docs/pages/guides/testing/playwright
 *
 * Purpose: Kept as a reference to show the official Next.js testing pattern.
 * Note: This uses older locator patterns (page.click("text=..."), page.locator("h1")).
 * For the recommended modern Playwright approach, see navigation.spec.ts
 */

test("should navigate to the about page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  // Find an element with the text 'About' and click on it
  await page.click("text=About");
  // The new URL should be "/about" (baseURL is used there)
  await expect(page).toHaveURL("/about");
  // The new page should contain an h1 with "About"
  await expect(page.locator("h1")).toContainText("About");
});

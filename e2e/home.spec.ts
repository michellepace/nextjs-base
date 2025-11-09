import { expect, test } from "@playwright/test";

/**
 * Home page tests using modern Playwright locators.
 *
 * These tests demonstrate:
 * - getByRole() for accessibility-focused element selection
 * - getByText() for semantic content matching
 * - Testing beyond simple navigation (content, structure, links)
 *
 * All locators follow Playwright's recommended best practices for 2024.
 */

test("should display the main heading", async ({ page }) => {
  await page.goto("/");

  // Verify the main heading is visible using semantic role selector
  const heading = page.getByRole("heading", {
    level: 1,
    name: /To get started/i,
  });
  await expect(heading).toBeVisible();
  await expect(heading).toContainText("To get started, edit the page.tsx file");
});

test("should display the Next.js logo", async ({ page }) => {
  await page.goto("/");

  // Verify logo is present using img role and alt text
  const logo = page.getByRole("img", { name: "Next.js logo" });
  await expect(logo).toBeVisible();
});

test("should display all navigation links", async ({ page }) => {
  await page.goto("/");

  // Verify all three main navigation links are visible
  await expect(page.getByRole("link", { name: "Deploy Now" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Documentation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "About" })).toBeVisible();
});

test("should display inline text links in paragraph", async ({ page }) => {
  await page.goto("/");

  // Verify inline links within the descriptive paragraph
  await expect(page.getByRole("link", { name: "Templates" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Learning" })).toBeVisible();
});

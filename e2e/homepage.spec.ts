import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect exact title.
  await expect(page).toHaveTitle("Next.js 16 Template");
});

// Test the documentation link attributes
test("documentation link", async ({ page }) => {
  await page.goto("/");

  // Locate the Documentation link
  const docLink = page.getByRole("link", { name: "Documentation" });

  // Verify link is visible
  await expect(docLink).toBeVisible();

  // Verify correct href (points to Next.js docs)
  await expect(docLink).toHaveAttribute("href", /nextjs.org\/docs/);

  // Verify opens in new tab (security best practice)
  await expect(docLink).toHaveAttribute("target", "_blank");

  // Verify has security attributes
  await expect(docLink).toHaveAttribute("rel", "noopener noreferrer");
});

// Test the counter
test("counter buttons", async ({ page }) => {
  await page.goto("/");

  // Initial state should be 0.
  await expect(page.getByText("Quantity: 0")).toBeVisible();

  // Click the increment button.
  await page.getByRole("button", { name: "+" }).click();

  // Expects the quantity to update to 1.
  await expect(page.getByText("Quantity: 1")).toBeVisible();

  // Click the decrement button.
  await page.getByRole("button", { name: "-" }).click();

  // Expects the quantity to return to 0.
  await expect(page.getByText("Quantity: 0")).toBeVisible();
});

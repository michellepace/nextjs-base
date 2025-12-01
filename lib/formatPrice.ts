/**
 * Demo utility for CI/CD purposes - can be safely deleted.
 * This file demonstrates a testable utility function.
 *
 * Formats a number as a British pound price with thousand separators.
 * @param price - The price value to format
 * @returns Formatted price string (e.g., "£1,234.50")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
}

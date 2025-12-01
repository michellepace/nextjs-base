/**
 * Demo test for CI/CD purposes - can be safely deleted.
 * This file demonstrates Vitest unit testing setup.
 */

import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/formatPrice";

describe("formatPrice", () => {
  it("formats basic prices with pounds and pence", () => {
    expect(formatPrice(1234.5)).toBe("£1,234.50");
  });

  it("formats zero correctly", () => {
    expect(formatPrice(0)).toBe("£0.00");
  });

  it("formats large numbers with proper thousand separators", () => {
    expect(formatPrice(1000000)).toBe("£1,000,000.00");
  });

  it("formats decimals to two decimal places", () => {
    expect(formatPrice(99.9)).toBe("£99.90");
  });
});

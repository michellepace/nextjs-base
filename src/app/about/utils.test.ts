import { describe, expect, test } from "vitest";
import { formatPageTitle } from "./utils";

describe("formatPageTitle", () => {
  test("converts text to uppercase", () => {
    expect(formatPageTitle("page information")).toBe("PAGE INFORMATION");
  });

  test("handles empty string", () => {
    expect(formatPageTitle("")).toBe("");
  });
});

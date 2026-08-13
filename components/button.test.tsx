/**
 * Demo test for CI/CD purposes - can be safely deleted.
 * This file demonstrates React Testing Library + jest-dom component testing.
 *
 * Complements lib/formatPrice.test.ts, which covers plain functions.
 * This one renders a component in jsdom and asserts with jest-dom matchers,
 * exercising the setup wired up in vitest.config.ts and vitest.setup.ts.
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/button";

describe("Button", () => {
  it("renders its children as an accessible link", () => {
    render(<Button href="https://nextjs.org">Read docs</Button>);

    const link = screen.getByRole("link", { name: "Read docs" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://nextjs.org");
  });

  it("opens external links safely in a new tab", () => {
    render(<Button href="https://vercel.com">Deploy</Button>);

    const link = screen.getByRole("link", { name: "Deploy" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders an icon alongside the label when given one", () => {
    render(
      <Button href="/docs" icon={<span data-testid="icon">→</span>}>
        Continue
      </Button>,
    );

    expect(screen.getByTestId("icon")).toBeVisible();
    expect(screen.getByRole("link")).toHaveTextContent("Continue");
  });

  it("applies secondary variant styles", () => {
    render(
      <Button href="/about" variant="secondary">
        About
      </Button>,
    );

    expect(screen.getByRole("link")).toHaveClass("border");
  });
});

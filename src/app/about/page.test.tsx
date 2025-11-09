import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "./page";

describe("About Page", () => {
  it("renders the page title", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("About");
  });

  it("renders the subtitle with uppercase formatting", () => {
    render(<Page />);

    expect(screen.getByText("PAGE INFORMATION")).toBeInTheDocument();
  });

  it("renders the page description", () => {
    render(<Page />);

    expect(
      screen.getByText(/This page exists as an example for Playwright/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/It demonstrates navigation between pages/i),
    ).toBeInTheDocument();
  });

  it("renders a home navigation link", () => {
    render(<Page />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("has proper semantic structure", () => {
    render(<Page />);

    // Check for main landmark
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    // Verify the heading is a level 1 heading
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});

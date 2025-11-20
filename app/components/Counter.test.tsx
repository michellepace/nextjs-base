import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("renders initial quantity and price", () => {
    render(<Counter unitPrice={10} />);

    expect(screen.getByText("Quantity: 0")).toBeInTheDocument();
    expect(screen.getByText("Total: £0.00")).toBeInTheDocument();
  });

  it("increments quantity and updates price when + button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter unitPrice={10} />);

    const incrementButton = screen.getByRole("button", { name: "+" });
    await user.click(incrementButton);

    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    expect(screen.getByText("Total: £10.00")).toBeInTheDocument();
  });

  it("decrements quantity and updates price when - button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter unitPrice={10} />);

    // Increment first so we have something to decrement
    const incrementButton = screen.getByRole("button", { name: "+" });
    await user.click(incrementButton);
    await user.click(incrementButton); // quantity is now 2

    const decrementButton = screen.getByRole("button", { name: "-" });
    await user.click(decrementButton);

    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    expect(screen.getByText("Total: £10.00")).toBeInTheDocument();
  });

  it("prevents quantity from going below zero", async () => {
    const user = userEvent.setup();
    render(<Counter unitPrice={10} />);

    const decrementButton = screen.getByRole("button", { name: "-" });
    await user.click(decrementButton);

    expect(screen.getByText("Quantity: 0")).toBeInTheDocument();
    expect(screen.getByText("Total: £0.00")).toBeInTheDocument();
  });
});

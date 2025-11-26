"use client";

// Demo component — not from a UI library. Replace as needed.

import { useState } from "react";
import { formatPrice } from "@/lib/formatPrice";

interface CounterProps {
  unitPrice: number;
}

export function Counter({ unitPrice }: CounterProps) {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const totalPrice = quantity * unitPrice;

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-muted rounded-lg shadow-lg border border-border">
      <h2 className="text-2xl font-bold text-foreground">Hello Counter</h2>
      <div className="text-lg text-muted-foreground">Quantity: {quantity}</div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={decrement}
          className="px-6 py-2 text-xl font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="-"
        >
          -
        </button>
        <button
          type="button"
          onClick={increment}
          className="px-6 py-2 text-xl font-bold bg-success hover:bg-success/90 text-success-foreground rounded-lg transition-colors"
          aria-label="+"
        >
          +
        </button>
      </div>
      <div className="text-2xl font-bold text-foreground">
        Total: {formatPrice(totalPrice)}
      </div>
    </div>
  );
}

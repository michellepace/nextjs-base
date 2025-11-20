"use client";

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
    <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Hello Counter
      </h2>
      <div className="text-lg text-zinc-700 dark:text-zinc-300">
        Quantity: {quantity}
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={decrement}
          className="px-6 py-2 text-xl font-bold bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="-"
        >
          -
        </button>
        <button
          type="button"
          onClick={increment}
          className="px-6 py-2 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          aria-label="+"
        >
          +
        </button>
      </div>
      <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Total: {formatPrice(totalPrice)}
      </div>
    </div>
  );
}

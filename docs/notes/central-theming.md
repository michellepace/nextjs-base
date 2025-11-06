# About Centralised Theming: Tailwind 4 together with shadcn/ui

Imagine building a website where changing one colour automatically updates every button, card, and component across your entire application. That's the power of centralised theming with Tailwind CSS 4 and shadcn/ui. Instead of hunting through hundreds of files to make design changes, you control everything from a single source—making your website consistent, maintainable, and beautiful by design.

## What is Centralised Theming?

**Centralised theming** means controlling all your design decisions from one place—your `globals.css` file. Instead of scattered values throughout your codebase, everything flows from central **design tokens** (your theme variables) through Tailwind's utility classes to your components.

```text
┌─────────────────┐    ┌──────────────┐     ┌─────────────────┐
│   globals.css   │───▶│ Utility      │───▶│ Your Components│
│                 │    │ Classes      │     │                 │
│ Design Tokens   │    │ bg-primary   │     │ <Button         │
│ + Connections   │    │ text-primary │     │   className=    │
│                 │    │ font-sans    │     │   "bg-primary"  │
│                 │    │              │     │ />              │
└─────────────────┘    └──────────────┘     └─────────────────┘
```

## Why Centralised Theming?

### **Consistency Everywhere**

Every button, card, and text element uses the exact same colours, fonts, and spacing. No more "slightly different blues" or inconsistent shadows scattered across your app.

### **Change Once, Update Everything**

```
Before: Hunt through 47 files to update #3B82F6
After:  Change one variable → entire app updates instantly
```

### **Effortless Maintenance**

- **Dark mode?** Just swap CSS variables
- **Rebrand?** Update a few values in `globals.css`  
- **New team member?** They only need to learn one file

### **Superior Performance**

Tailwind 4 generates only the classes you actually use, resulting in smaller bundles and build times up to 5x faster than previous versions.

## How It Works: The Complete Setup

Everything happens in your `globals.css` file using a simple two-step process:

### **Step 1: Import and Configure**

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
```

### **Step 2: Define and Connect**

```css
/* Define your design tokens */
:root {
  --background: oklch(1 0 0);
  --primary: oklch(0.577 0.245 27.325);
  --foreground: oklch(0.145 0 0);
  --font-geist-sans: "Geist", "Inter", sans-serif;
  --radius: 0.625rem;
}

/* Connect them to Tailwind utilities */
@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --radius-lg: var(--radius);
}

/* Dark mode variations */
.dark {
  --background: oklch(0.147 0.004 49.25);
  --foreground: oklch(0.985 0.001 106.423);
}
```

🌸 **What happens:** When you define `--primary` and connect it via `--color-primary`, Tailwind automatically generates `bg-primary`, `text-primary`, `border-primary`, and `ring-primary` utility classes. *(These custom utilities only exist after you create them - built-ins like `bg-red-500` work immediately.)*

In fact, Tailwind ships with a [default theme](https://tailwindcss.com/docs/theme#default-theme-variable-reference) containing hundreds of theme variables already defined. From these, it generates thousands of utility classes organized into logical groups like [backgrounds](https://tailwindcss.com/docs/background-color), [typography](https://tailwindcss.com/docs/font-size), and [spacing](https://tailwindcss.com/docs/padding). These utility classes are available to use within your app immediately. When you add your own theme variables (as described above), you get additional utility classes generated just for you.

## Practical Examples

### **Typography That Updates Everywhere**

```css
/* One font change updates your entire app */
:root {
  --font-display: "Cal Sans", serif;
  --font-body: "Inter", sans-serif;
}

@theme inline {
  --font-sans: var(--font-body);     /* Updates all font-sans usage */
  --font-serif: var(--font-display); /* Updates all font-serif usage */
}
```

### **Effortless Dark Mode**

The `@custom-variant dark` setup means when someone adds the `dark` class to your `<html>` element, all components using `bg-background` and `text-foreground` automatically switch themes:

```css
/* Light mode */           /* Dark mode */
--background: white   →    --background: black
--foreground: black   →    --foreground: white

/* Same components, different appearance automatically! */
```

### **Component Theming**

shadcn/ui components use these exact patterns:

```jsx
// Button component uses your connected design tokens
<Button className="bg-primary text-primary-foreground">
  Click me
</Button>

// Change --primary once, all buttons update
```

## Getting Started

### **1. Set Up Your Design System**

Define your brand's core values in `:root`:

```css
:root {
  /* Colors */
  --brand-blue: oklch(0.6 0.2 220);
  --neutral-50: oklch(0.98 0.002 247.839);
  
  /* Typography */
  --font-brand: "Your Font", sans-serif;
  
  /* Spacing */
  --space-unit: 0.25rem;
}
```

### **2. Connect to Tailwind**

Use `@theme inline` to make them available as utilities:

```css
@theme inline {
  --color-brand: var(--brand-blue);
  --color-gray-50: var(--neutral-50);
  --font-sans: var(--font-brand);
  --spacing-1: var(--space-unit);
}
```

### **3. Use Everywhere**

Now use `bg-brand`, `text-gray-50`, `font-sans`, and `p-1` throughout your components. Change the source values once, and everything updates.

## Key Principles

1. **Single Source of Truth**: All design decisions live in `globals.css`
2. **Two-Step Process**: Define design tokens, then connect with `@theme inline`  
3. **Utility-First**: Use Tailwind classes instead of custom CSS
4. **No Config File**: Tailwind 4 handles everything through CSS

---

## Essential Concepts

### **@theme vs @theme inline**

- **`@theme`**: Creates entirely new design tokens and utilities
- **`@theme inline`**: Connects existing CSS variables to Tailwind utilities

### **Design Tokens**

Your design decisions stored as CSS variables—colors, fonts, spacing, etc. Think of them as your brand's DNA.

### **Tailwind's Built-in System**

You still get all of Tailwind's defaults (`bg-red-500`, `text-lg`, `p-4`, etc.) plus your custom connected utilities.

### **shadcn/ui Integration**

shadcn/ui components are pre-built to use this exact pattern. Install any component and it automatically respects your centralised theme.

**The result:** A maintainable, consistent, performant design system where one change updates everything. Your design tokens cascade automatically through Tailwind's utility classes to create a cohesive user interface that's effortless to maintain and delightful to use.

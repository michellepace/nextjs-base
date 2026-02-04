---
paths:
  - "**/*.css"
  - "app/**/*.tsx"
  - "components/**/*.tsx"
---

# Tailwind 4.x Rules

1. **Centralised Theming** – `app/globals.css`
   - Define all design tokens inside `@theme { … }`
   - Use `@theme inline` when referencing CSS variables: `--color-primary: var(--primary)`
   - Never hardcode hex/px/arbitrary values outside the theme

2. **Layer Order** (before imports)
   - Declare `@layer base, components, utilities;` before `@import "tailwindcss"`
   - Required for third-party CSS specificity control

3. **Utility-First**
   - Prefer Tailwind classes directly in JSX
   - Use `@apply` sparingly in globals.css for truly reusable patterns only

4. **Mobile-First**
   - Base styles = mobile (no prefix)
   - Enhance with `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

5. **Colour Tokens**
   - Use OKLCH format: `oklch(L C H)` — predictable lightness for dark mode
   - Create foreground pairs: `--primary` + `--primary-foreground`

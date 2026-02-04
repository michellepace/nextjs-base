---
paths:
  - "components/**/*.tsx"
  - "app/**/*.tsx"
---

## UI Components Rules

**Build small, compose big, customise last.**

1. **Favour Composition over Monoliths**
   - Create small, focused primitives → combine them flexibly.
   - Avoid giant "mega-components" that do everything.

2. **Two-Layer Architecture**
   - `components/ui/` — pure primitives (Button, Card, Input, Dialog…)
   - `components/{feature}/` — feature compositions grouped by domain

   Example structure (adapt to project needs):

   ```text
   components/
   ├── ui/              # Layer 1: Primitives (pure, reusable)
   │   ├── button.tsx
   │   ├── dialog.tsx
   │   └── input.tsx
   ├── auth/            # Layer 2: Feature compositions
   │   ├── sign-in.tsx
   │   └── sign-up.tsx
   ├── navigation/
   │   ├── topbar.tsx
   │   ├── sidebar.tsx
   │   ├── mobile-nav.tsx
   │   └── theme-toggle.tsx
   ├── search/
   │   ├── search-input.tsx
   │   └── search-results.tsx
   └── tag-link.tsx     # Cross-cutting single file → root OK
   ```

   **Note:** If cross-cutting components grow to 2+ related files, create a folder or find a feature home.

3. **Composition-First APIs**
   - Use slots / `asChild` (Radix/shadcn) or `as` (Catalyst) / children for flexibility.
   - Prefer wrapping primitives over editing them. Only add variants to primitives when the pattern is reused across 2+ features. Avoid thin wrappers that just pass props with no added value — use `className` directly instead.

4. **Styling: Layout vs Visual**
   - Utility classes for layout (margin, padding, flex, grid)
   - Variants/props for visual styling (colours, borders, shadows)

5. **Variants & Compound Pattern**
   - Variants via cva for styling flexibility.
   - Compound components (e.g., `<Tabs> → <TabsList> + <TabsTrigger>`) for related parts.

6. **Keep Primitives "Dumb"**
   - Low-level: presentation + a11y only.
   - Never embed mock data (inject rather e.g. use `data/mock` instead)
   - Higher-level: add logic / data (leverage Server Components).

7. **Customisation Hierarchy** (in order of preference)
   1. `className` — one-off styling adjustments
   2. Existing props/variants — use what's already exposed
   3. New prop on primitive — only if genuinely reusable
   4. New CVA variant — for new visual states across multiple uses
   5. CSS variable override — last resort for deep customisation

   **Note:** Props suit content/behaviour (e.g., `icon`, `loading`). Variants suit named visual states (e.g., `variant="destructive"`). Prefer simpler props before formal variants.

**One-Line Rule:** Small primitives + flexible composition = scalable, reusable UI without massive files.

# CLAUDE.md

This is a modern Next.js 16 base template following current best practices.

The project uses British English - strictly.

## Tech Stack

- **Next.js 16** with App Router (not Pages Router)
- **React 19.2.0** (latest with new features like Actions, `use` hook)
- **TypeScript 5** with strict mode
- **Tailwind CSS v4** with PostCSS
- **Biome** for linting/formatting (replaces ESLint + Prettier)
- **React Compiler** enabled for automatic optimisations

## Architecture Notes

- Tailwind v4 uses `@import "tailwindcss"` syntax (not `@tailwind` directives)

## Coding Practices

- Only add `"use client"` when interactivity is needed - Server Components are the default
- Avoid manual `useMemo`/`useCallback` unless profiling shows need
- Always use `@/` import aliases, even for siblings (`@/app/fonts` not `./fonts`)

## Key Commands

```bash
npm run check       # Lint (Biome, auto-fixes) + typecheck
npm run lint:md     # Lint markdown files

npm run test:unit   # Vitest
npm run test:e2e    # Playwright
npm run test        # All tests (Vitest + Playwright)
```

## Common Additions for New Projects

When starting a new project from this template, you'll typically add:

- State management (Zustand, Jotai, or React Context)
- Data fetching (React Query, SWR, or native fetch with Server Components)
- Forms (React Hook Form, Zod for validation)
- UI components (shadcn/ui, Radix, Tailwind UI kit, or Headless UI)
- Authentication (NextAuth.js, Clerk, or Supabase Auth)
- Database/ORM (Prisma, Drizzle, or Supabase)

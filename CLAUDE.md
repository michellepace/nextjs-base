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

## Key Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Production build
npm start          # Start production server
npm run lint       # Lint and format with Biome (auto-fixes)
npm run lint:md    # Lint markdown files
npm run typecheck  # TypeScript type checking
npm run check      # Run both lint and typecheck
npm run test:unit  # Run Vitest unit tests
npm run test:e2e   # Run Playwright e2e tests
```

## Architecture Notes

- App Router: All components in `/app` are Server Components by default (use `"use client"` for interactivity)
- React Compiler enabled: Provides automatic memoisation (avoid manual `useMemo`/`useCallback` unless needed)
- Tailwind v4: Uses `@import "tailwindcss"` syntax (not `@tailwind` directives)
- Import alias: `@/*` maps to `./*` (e.g., `import { foo } from "@/lib/utils"`)

## Common Additions for New Projects

When starting a new project from this template, you'll typically add:

- State management (Zustand, Jotai, or React Context)
- Data fetching (React Query, SWR, or native fetch with Server Components)
- Forms (React Hook Form, Zod for validation)
- UI components (shadcn/ui, Radix, Tailwind UI kit, or Headless UI)
- Authentication (NextAuth.js, Clerk, or Supabase Auth)
- Database/ORM (Prisma, Drizzle, or Supabase)
- Testing (Vitest, Playwright)

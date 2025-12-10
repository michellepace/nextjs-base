# CLAUDE.md

The project uses British English - strictly.

## Tech Stack

- **Next.js 16** with App Router (not Pages Router)
- **React 19.2.0** (latest with new features like Actions, `use` hook)
- **React Compiler** enabled for automatic optimisations
- **TypeScript 5** with strict mode
- **Tailwind CSS v4** with PostCSS
- **CI/CD** Vitest, PlayWright, GitHub Actions, Vercel
- **Biome** for linting/formatting (replaces ESLint + Prettier)
- **Lefthook** for Git hooks (pre-commit: lint, typecheck, unit tests; pre-push: E2E tests)

## Key Commands

```bash
npm run check       # Lint (Biome, auto-fixes) + typecheck
npm run lint:md     # Lint markdown files

npm run test:unit   # Vitest
npm run test:e2e    # Playwright
npm run test        # All tests (Vitest + Playwright)

vercel list         # List project deployments
```

## Coding Practices

- Only add `"use client"` when interactivity is needed
- Avoid manual `useMemo`/`useCallback` unless profiling shows need
- Always use `@/` import aliases, even for siblings (`@/app/fonts` not `./fonts`)

## Breaking Changes

- Tailwind v4 uses `@import "tailwindcss"` syntax (not `@tailwind` directives)
- Next.js 16 Dynamic route `params` is a Promise - must await: `{ params }: { params: Promise<{ id: string }> }`
- Next.js 16 Middleware renamed to Proxy - `middleware.ts` → `proxy.ts`, export `proxy()` not `middleware()`

## Common Additions for New Projects

When starting a new project from this template, you'll typically add:

- State management (Zustand, Jotai, or React Context)
- Data fetching (React Query, SWR, or native fetch with Server Components)
- Forms (React Hook Form, Zod for validation)
- UI components (shadcn/ui, Radix, Tailwind UI kit, or Headless UI)
- Authentication (NextAuth.js, Clerk, or Supabase Auth)
- Database/ORM (Neon or Supabase with Prisma or Drizzle. Or try Convex!)

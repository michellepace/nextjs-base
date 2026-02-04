# CLAUDE.md

The project uses British English - strictly.

## Project Overview

A starter template repository — not a product. Clone it, add a UI component library, and build from there.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React Compiler, TypeScript strict)
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + Testing Library (unit), Playwright (E2E)
- **Quality**: Biome (lint + format, replaces ESLint/Prettier), Lefthook (git hooks)
- **Deployment**: Vercel (Preview on PR, Production on merge)

## Breaking Changes (Next.js 16 / Tailwind 4)

- Tailwind v4: `@import "tailwindcss"` syntax (not `@tailwind` directives)
- Dynamic route `params` is a Promise - must await: `{ params }: { params: Promise<{ id: string }> }`
- Middleware renamed to Proxy: `proxy.ts` (not `middleware.ts`)
- `cacheComponents` enabled: uncached async data must be in `<Suspense>` or marked `"use cache"`
- `cacheComponents` enabled: route segment configs deprecated (`dynamic`, `revalidate`, `fetchCache`)

## Code Conventions

- Always use `@/` import aliases, even for siblings (`@/app/fonts` not `./fonts`)
- Only add `"use client"` when interactivity is needed
- Avoid manual `useMemo`/`useCallback` - React Compiler handles this
- Use `type` over `interface` for TypeScript definitions (enforced by Biome)

## Key Commands

```bash
# Quality Checks
npm run check       # Lint + typecheck
npm run lint:md     # Markdown linting

# Testing
npm run test        # All tests (unit + e2e)
npm run test:unit   # Vitest only
npm run test:e2e    # Playwright only

# Vercel
vercel --help       # All Vercel CLI commands
vercel list         # Recent deployments
vercel env ls       # Check env vars

# Utilities
fuser -k 3000/tcp 2>/dev/null; rm -f .next/dev/lock  # Kill stuck dev server
```

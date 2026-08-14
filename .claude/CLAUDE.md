# CLAUDE.md

@../AGENTS.md

A GitHub template repository, see `README.md` for template details.

## Tech Stack

Exact versions live in `package.json`. Numbers appear below only where the
version changes how you write code — a stale number here misleads, so do not
add precision that has to be maintained.

- **Runtime**: Node.js 24 LTS (pinned by `.nvmrc`; `engines` bounds it to the 24 line)
- **Framework**: Next.js 16.3 (React 19, App Router, React Compiler, TypeScript 7)
- **Styling**: Tailwind CSS 4.3 (centralised theme `app/globals.css`)
- **Testing**: Vitest + Testing Library (unit), Playwright (E2E)
- **Quality**: Biome
- **Git Hooks**: Lefthook
- **Deployment**: Vercel

## Traps Tooling Does Not Catch

Only mistakes that survive lint, typecheck and build are listed — everything
else already fails with an actionable message and needs no note. Ground truth
is the version-matched docs in `node_modules/next/dist/docs/` (see `AGENTS.md`).

- **Dynamic route `params` is a Promise**: `{ params }: { params: Promise<{ slug: string }> }`, then `await` it. The old sync form type-checks clean, builds clean, and renders `undefined` at runtime. Nothing catches it.
- **Tailwind v4 uses `@import "tailwindcss"`**, not `@tailwind` directives. This one does fail the build, but the error reads `Cannot apply unknown utility class` and points at an unrelated line, so it wastes time unless you know.

Verified against Next.js 16.3 by testing each case. Removed from this list
because the build already reports them clearly: route segment configs under
`cacheComponents`, uncached data outside `<Suspense>`, and `middleware.ts`
(deprecated in favour of `proxy.ts`, warns at build with a codemod command).

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

# Browser Automation (use playwright-cli skill)
playwright-cli open http://localhost:3000

# Kill stuck dev server
fuser -k 3000/tcp 2>/dev/null; rm -f .next/dev/lock

# Vercel
vercel list           # Recent deployments
vercel inspect <url>  # Deployment details, build output
vercel logs <url>     # Runtime logs for a deployment
vercel build          # Local production build
vercel env ls         # Env vars
```

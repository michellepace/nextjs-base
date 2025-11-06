# 🚀 Tech Stack Overview

**Updated:** November 2, 2025

---

## Frontend & UI

**⚡ Next.js 16**  
React framework with Turbopack as default bundler (5-10x faster builds than Webpack). Includes file-based routing, server-side rendering, static generation, and API routes. Native integration with Vercel for deployment.

**🎨 Tailwind CSS 4.1**  
Utility-first CSS framework with performance engine providing 5x faster builds. Supplies pre-built CSS classes for rapid UI development. Version 4.1 adds text shadows, mask utilities, and improved browser compatibility.

**💎 Tailwind UI (Plus Licence)**  
Component library with production-ready, accessible UI components. Reduces development time for common interface patterns.

**📘 TypeScript**  
JavaScript with static typing. Catches type errors at compile-time. Provides IDE autocompletion and improves code documentation through type definitions.

---

## Development Tools

**⚙️ Biome**  
Rust-based linter and formatter replacing ESLint and Prettier. Single unified configuration. Performance: 25x faster than Prettier, 15x faster than ESLint. 97% compatible with Prettier.

---

## State & Data

**🐻 Zustand**  
Lightweight React state management library with localStorage persistence. Minimal boilerplate. Useful for prototyping before moving state to database.

**🔷 Prisma**  
Type-safe ORM generating TypeScript types from database schema. Includes schema-first design, VS Code integration, and Prisma Studio GUI for database management.

**🐘 Neon Postgres**  
Serverless PostgreSQL via Vercel Marketplace. Replaced "Vercel Postgres" branding in 2025. Features: auto-scaling, scale-to-zero, connection pooling, database branching. Free tier: 20 projects, 100 CU-hours/project/month, 0.5 GB storage per branch, 5 GB egress. Billing through Vercel matches direct Neon pricing.

---

## Authentication

**🔐 Neon Auth**  
Authentication service integrated with Neon Postgres, powered by Stack Auth. Syncs user profiles to database via `neon_auth.users_sync` table. Supports Google, GitHub, and Microsoft OAuth. Includes pre-built UI components (`<SignIn />`, `<SignUp />`, `<AccountSettings />`) that integrate with shadcn/ui. No vendor lock-in—transferable to external Stack Auth account. Currently beta, free.

---

## Testing

**⚡ Vitest**
Next generation testing framework powered by Vite. Native ESM and TypeScript support out-of-the-box. Watch mode enabled by default with smart instant rerun of related tests. Officially supported by Next.js.

**⚛️ React Testing Library**
Testing utility library that works with Vitest to test React components. Provides utilities for rendering components and simulating user interactions (`render()`, `screen`, `fireEvent`, `userEvent`). Focuses on testing from user perspective rather than implementation details. Officially recommended by React team.

**🎭 Playwright**
Browser automation for end-to-end testing across Chrome, Firefox, and Safari. Auto-waiting reduces flaky tests. Includes trace viewer for debugging.

---

## Deployment & CI/CD

**▲ Vercel**  
Cloud platform with native Next.js integration. Automatic deployments from Git with preview URLs for pull requests. Global edge network for content delivery.

**⚙️ GitHub Actions**
CI/CD automation running tests and deployments on Git push. Free with GitHub. YAML configuration. Runs Biome linting, Vitest + React Testing Library tests, and Playwright E2E tests before deployment.

---

## Analytics

**📊 PostHog**  
Open-source product analytics platform. Includes user tracking, session replay, feature flags, and A/B testing. 1 million events/month free tier. Self-hosting available.

---

## Summary Table

| Tool | Purpose | Status |
|------|---------|--------|
| Next.js 16 | React framework | ✅ Latest |
| Tailwind 4.1 | CSS framework | ✅ Latest |
| TypeScript | Type safety | ✅ Stable |
| Biome | Linting/formatting | ✅ Stable |
| Zustand | State management | ⚠️ Temporary |
| Prisma | Database ORM | ✅ Production |
| Neon Postgres | Database | ✅ Free tier available |
| Neon Auth | Authentication | ⚠️ Beta (free) |
| Vitest | Unit testing | ✅ Stable |
| React Testing Library | Component testing | ✅ Stable |
| Playwright | E2E testing | ✅ Stable |
| Vercel | Hosting | ✅ Production |
| GitHub Actions | CI/CD | ✅ Integrated |
| PostHog | Analytics | ✅ Production |

---

## Key Points

- **Modern Stack:** Next.js 16 with Turbopack, Tailwind CSS 4.1
- **Type Safety:** TypeScript with Prisma ORM
- **Integrated Auth:** Neon Auth syncs users to database (free, beta)
- **Free Tier:** Neon provides 20 projects with scale-to-zero
- **Testing:** Vitest + React Testing Library for component tests, Playwright for E2E
- **Migration Path:** Plan transition from Zustand to database storage

# Next.js 16 Template

![Next.js 16 - a modern template repo](docs/images/nextjs-hero.png)

*A Next.js 16 template with modern tooling and CI/CD automation. Code quality checks (linting, formatting, type checking, testing) run via Lefthook locally and GitHub Actions on PRs. Dependency updates automated via Dependabot. Deployments handled by Vercel: Preview for PRs, Production for main. Assumes Claude Code.*

<div align="left">
  <a href="docs/images/app-screenshot.jpg" target="_blank">
    <img src="docs/images/app-screenshot.jpg" alt="Homepage in light and dark modes with UI library guidance" width="750">
  </a>
  <p><em>Template homepage with light/dark mode setup — UI component library still needed</em></p>
</div>

*See this template live — https://nextjs-base-hello.vercel.app*

## 🎯 Use This Template

**(1) Get This Repo.** Click "Use this template" → creates a new repository on your GitHub with no commit history — a fresh start. Then clone it locally:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO

# Install dependencies
npm install

# For Claude Code typescript-lsp plugin (uses the project's TypeScript)
npm install -g typescript-language-server

# Claude Code uses for browser exploration (Global chosen)
npm install -g @playwright/cli@latest

# Ensure latest Playwright CLI skill
playwright-cli install --skills

# Open http://localhost:3000 to see app running
npm run dev
```

**(2) Install Extensions.** In VSCode/Cursor install the extensions shown in [`.vscode/extensions.json`](.vscode/extensions.json). When VS Code asks to use the workspace TypeScript version, click Allow — this turns on the Next.js editor checks.

**(3) GitHub + Vercel Setup.** Follow [`docs/project-setup.md`](docs/project-setup.md) to set up GitHub and Vercel.

**(4) Housekeeping.** Modify [`.claude/CLAUDE.md`](.claude/CLAUDE.md), [`.mcp.json`](.mcp.json), and [`.claude/settings.json`](.claude/settings.json) as preferred — note the latter lists my plugins and marketplaces, see [Claude Code Plugins](#-claude-code-plugins) to install them.

**(5) Choose UI Library.** Choose one that supports Tailwind 4. [shadcn/ui](https://ui.shadcn.com/) (free) and [HeroUI v3](https://heroui.com/) (free) are both LLM friendly and use semantic tokens — which makes theming easy. shadcn is ubiquitous so theme it well to stand out — [tweak-cn](https://tweakcn.com/) and [theme-generator](https://shadcnstudio.com/theme-generator) are helpful. HeroUI is more visually distinct and extremely LLM friendly; it ships with agent skills too. [Tailwind Plus](https://tailwindcss.com/plus) (paid) offers components ([Catalyst](https://tailwindcss.com/plus/ui-kit)), assembled UI blocks, and full site templates, but doesn't include semantic tokens so centralised theming takes more manual work.

**(6) Decide on Icons.** Each UI library above ships with icons — shadcn/ui uses [Lucide React](https://lucide.dev/guide/react/), Tailwind Plus (Catalyst) uses [Heroicons](https://heroicons.com/), HeroUI uses [Iconify](https://iconify.design/). All three let you swap to a different icon library.

**(7) Replace Template Files.** Replace [`app/page.tsx`](app/page.tsx), [`app/layout.tsx`](app/layout.tsx), [`components/button.tsx`](components/button.tsx), [`app/globals.css`](app/globals.css) (centralised theming), [`app/fonts.ts`](app/fonts.ts), and [`components/theme-toggle.tsx`](components/theme-toggle.tsx) (use an icon).

## 🧩 Claude Code Plugins

When you first open the repo, Claude Code asks you to trust it, then offers to install the plugins in [`.claude/settings.json`](.claude/settings.json). If you skipped that, run these once inside your project folder:

```bash
# Add the two plugin marketplaces
claude plugin marketplace add anthropics/claude-plugins-official --scope project
claude plugin marketplace add michellepace/my-claude-marketplace --scope project

# Install the plugins
claude plugin install typescript-lsp@claude-plugins-official --scope project
claude plugin install alwayson-misc@my-claude-marketplace --scope project
claude plugin install git-utils@my-claude-marketplace --scope project
claude plugin install mattpocock-skills@claude-plugins-official --scope project

# Disable Matt Pocock's skills for now
claude plugin disable mattpocock-skills@claude-plugins-official --scope project
# To enable it when you need it:
# claude plugin enable mattpocock-skills@claude-plugins-official --scope project
```

**mattpocock-skills** is disabled because there are many skills that pepper the context window and can trigger when you don't want them. Enable the plugin when you want it.

**[git-utils](https://github.com/michellepace/my-claude-marketplace/tree/main/plugins/git-utils)** is my own plugin and optional. Ask Claude to either remove it or disable it.

## What's Installed?

For exact list see [`package.json`](package.json)

| Category | Tool | What it does |
| :------- | :--- | :----------- |
| Runtime | [Node.js 24 LTS](https://nodejs.org) | Pinned via [`.nvmrc`](.nvmrc); `engines` in [`package.json`](package.json) bounds it to the 24 line |
| Framework | [Next.js 16.4](https://nextjs.org) | Core webapp foundation — routing, rendering, API routes, optimisation, and builds |
| Language | [TypeScript 6](https://www.typescriptlang.org) | Static type checking with strict mode enabled — not 7 yet, which can't run the Next.js editor plugin |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS framework for rapid styling |
| | [next-themes](https://github.com/pacocoursey/next-themes) | Light/dark mode theming provider |
| Linting | [Biome](https://biomejs.dev) | Fast linter and formatter (replaces ESLint + Prettier) |
| | [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) | Lints markdown files for consistent formatting |
| Testing | [Vitest](https://vitest.dev) | Fast unit test runner (Vite-native, Jest-compatible) |
| | [Playwright](https://playwright.dev) | E2E browser testing (Chromium, Mobile Safari) |
| | [Testing Library](https://testing-library.com) | React component testing utilities |
| Git Hooks | [Lefthook](https://lefthook.dev) | Runs checks on commit (lint, typecheck, unit tests) and push (build, E2E tests) |
| Optimisation | [React Compiler](https://react.dev/learn/react-compiler) | Automatic memoisation and performance optimisations |
| Analytics | [Vercel Speed Insights](https://vercel.com/docs/speed-insights) | Real user performance metrics viewable on Vercel |
| | [Vercel Web Analytics](https://vercel.com/docs/analytics) | Privacy-friendly visitor analytics viewable on Vercel |

## Common Additions for New Projects

When starting a new project from this template, you'll typically add:

- UI components (shadcn/ui, HeroUI v3, Tailwind Plus, etc.)
- State management (Zustand, Jotai, or React Context)
- Data fetching (React Query, SWR, or native fetch with Server Components)
- Forms (React Hook Form, Zod for validation)
- Authentication (NextAuth.js, Clerk, or Supabase Auth)
- Database/ORM (Neon or Supabase with Prisma or Drizzle. Or try Convex!)

![Explained banner](docs/images/template-explained.png)

## Next.js Installation Explained

This template was initialised with the following options and then updated:

```bash
# Next.js installer
$ npx create-next-app@latest

Would you like to use TypeScript?      ✔️ Yes
Which linter would you like to use?    ✔️ Biome
Would you like to use React Compiler?  ✔️ Yes
Would you like to use Tailwind CSS?    ✔️ Yes
Would you like your code inside a src/ directory?  ❌ No
Would you like to use App Router? (recommended)    ✔️ Yes
Would you like to use Cache Components?            ✔️ Yes
Would you like to customise the import alias (@/* by default)? ❌ No
Would you like to include AGENTS.md to guide coding agents?    ✔️ Yes
Would you like to help improve Next.js by letting agents prepare anonymised feedback?  ❌ No

# Update all dependencies to latest versions
npm outdated                # Check outdated packages (2025-11-20)
npx npm-check-updates -u    # Rewrite package.json with latest
npm install                 # Install updated versions
```

## Config Files Explained

*Key: 🌺 Claude Code · 🅽 Next.js · 🧪 Checks and tests · 🚀 GitHub CI/CD*

| File | What | Generally In This Project Template |
| :----- | :----- | :------------------ |
| 🌺 [`.claude/rules/`](.claude/rules/) | Claude Code rules | Auto-injected when editing matching file paths |
| 🌺 [`.claude/CLAUDE.md`](.claude/CLAUDE.md) | Claude Code project context | Documents tech stack (customise!) |
| 🌺 [`.claude/settings.json`](.claude/settings.json) | Claude Code project settings | Allow/Deny permissions, plus enabled plugins and marketplaces |
| 🚀 [`.github/workflows/check-lint-type.yml`](.github/workflows/check-lint-type.yml) | GitHub Actions CI workflow | Runs Biome linting/formatting checks and TypeScript type checking on PRs |
| 🚀 [`.github/workflows/test-e2e-vercel.yml`](.github/workflows/test-e2e-vercel.yml) | GitHub Actions CI workflow | Runs Playwright E2E tests against Vercel Preview deployments (triggered by Vercel) |
| 🚀 [`.github/workflows/test-e2e.yml`](.github/workflows/test-e2e.yml) | GitHub Actions CI workflow | Runs Playwright E2E tests on PRs (builds production, tests browsers, uploads reports) |
| 🚀 [`.github/workflows/test-unit.yml`](.github/workflows/test-unit.yml) | GitHub Actions CI workflow | Runs Vitest unit tests on PRs (uses jsdom environment, React Testing Library) |
| 🚀 [`.github/dependabot.yml`](.github/dependabot.yml) | Dependabot config | Automated dependency update PRs weekly (npm + GitHub Actions) |
| 🧪 [`.playwright/`](.playwright/) | Playwright outputs + CLI settings | Playwright test outputs `test-results/` and `playwright-report/` (moved from root). Plus `cli.config.json` for playwright-cli (its default location) |
| 🧪 `.playwright-cli/` | playwright-cli output | Page snapshots and screenshots Claude takes |
| [`.vscode/extensions.json`](.vscode/extensions.json) | VS Code extension recommendations | Useful extensions to use in this Next.js project |
| [`.vscode/settings.json`](.vscode/settings.json) | VS Code workspace settings | Enables auto-formatting and configures Biome and Tailwind extensions |
| [`.gitattributes`](.gitattributes) | Git line ending and file type handling | Normalises line endings across platforms for consistent Git diffs |
| [`.gitignore`](.gitignore) | Files and directories Git should ignore | Prevents build outputs and dependencies from being committed |
| 🧪 [`.markdownlint-cli2.yaml`](.markdownlint-cli2.yaml) | Markdown linter config | Disables strict linting rules for practical writing; supports file ignores |
| 🌺 [`.mcp.json`](.mcp.json) | Claude Code MCP config | Ref MCP for docs search |
| [`.nvmrc`](.nvmrc) | Node.js version pin | Single source for the Node major — CI reads it via `node-version-file`, `nvm use` reads it locally |
| 🧪 [`biome.json`](biome.json) | Biome lint + format config | Sets linting rules, formatting style, and import organisation |
| 🧪 [`lefthook.yml`](lefthook.yml) | Git hooks config | Automates code quality checks on commit and build + E2E tests on push |
| 🅽 [`next.config.ts`](next.config.ts) | Next.js config | Enables React Compiler and customises Next.js build settings |
| 🅽 [`package.json`](package.json) | Project dependencies and npm scripts | Defines project dependencies, scripts, and npm package metadata |
| 🧪 [`playwright.config.ts`](playwright.config.ts) | Playwright E2E test config | Sets test browsers (desktop + mobile), parallel execution, and base URLs |
| 🅽 [`postcss.config.mjs`](postcss.config.mjs) | CSS processing config | Enables Tailwind CSS v4 processing via PostCSS plugin |
| 🧪 [`tsconfig.json`](tsconfig.json) | TypeScript compiler settings | Configures TypeScript compiler options and module resolution behaviour |
| 🧪 [`vitest.config.ts`](vitest.config.ts) | Vitest unit test config | Sets up React component testing environment and references [`vitest.setup.ts`](vitest.setup.ts) |
| 🧪 [`vitest.setup.ts`](vitest.setup.ts) | Global test setup | Adds helpful test assertions like `expect(element).toBeVisible()` |

---

## CI/CD Workflow Explained

This diagram shows how CI automation integrates into a typical development workflow:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 💻 LAPTOP: Create a new branch (tests on local dev machine)
└─────────────────────────────────────────────────────────────────────────────┘

  git checkout -b feature/add-dark-mode
  │
  ├─ Commit 1: Add light/dark mode          ⚡ pre-commit hook runs (3s)
  │  ├─ 🎨 Biome lint and format                ✅ Auto-fixed & staged
  │  ├─ 🔍 TypeScript type check                ✅ Pass
  │  └─ 🧪 Vitest unit tests                    ✅ Pass
  │                                               (then committed on all pass)
  │
  ├─ Commit 2: (some more work here)        ⚡ pre-commit hook runs again
  │
  └─ Commit 3: (some more work here)        ⚡ pre-commit hook runs again

  git push origin feature/add-dark-mode     ⚡ pre-PUSH hook runs (~20s)
     ├─ 🏗️  Next.js production build             ✅ Pass
     └─ 🎭 Playwright E2E tests                 ✅ Pass (then pushed to GH)

┌─────────────────────────────────────────────────────────────────────────────┐
│ ☁️  GITHUB: Workflows kickoff on GitHub machines when PR is created
└─────────────────────────────────────────────────────────────────────────────┘

  Create Pull Request → GitHub Actions triggered automatically
  │
  ├─ 🤖 Workflow 1: Lint & Type (biome, tsc)
  │  ├─ Checkout code
  │  ├─ Setup Node.js (from .nvmrc)
  │  ├─ Install dependencies (npm ci)
  │  ├─ Run Biome checks                        ✅ Pass
  │  └─ Run TypeScript checks                   ✅ Pass
  │
  ├─ 🤖 Workflow 2: Unit Tests (vitest)
  │  ├─ Checkout code
  │  ├─ Setup Node.js (from .nvmrc)
  │  ├─ Install dependencies (npm ci)
  │  └─ Run Vitest tests                        ✅ Pass
  │
  └─ 🤖 Workflow 3: E2E Tests (playwright)
     ├─ Checkout code
     ├─ Setup Node.js (from .nvmrc)
     ├─ Install dependencies (npm ci)
     ├─ Install Playwright browsers
     ├─ Build Next.js production
     └─ Run Playwright tests                    ✅ Pass

  ── Meanwhile, Vercel deploys Preview ──────────────────────────

  🚀 Vercel: Preview deployment ready
     ├─ ✅ Vercel deployment status check        (required to merge)
     └─ Sends repository_dispatch event to GitHub

  └─ 🤖 Workflow 4: E2E Tests (Vercel Preview)
     ├─ Triggered by Vercel (not PR event)
     ├─ Runs Playwright against live Preview URL
     ├─ Tests real Vercel deployment             ✅ Pass
     └─ Reports status back to PR commit

  GITHUB PR Status: ✅ All checks passed

  🐰 CodeRabbit AI Review Complete
  └─ 3 nitpick comments posted:
     ├─ "Consider using const instead of let" (Button.tsx:12)
     ├─ "Add JSDoc comment" (ThemeContext.tsx:8)
     └─ "Extract magic string to constant" (utils.ts:45)

┌─────────────────────────────────────────────────────────────────────────────┐
│ 💻 Back to Laptop (Addressing 1 out of 3 nitpick comments on open PR)
└─────────────────────────────────────────────────────────────────────────────┘

  ├─ Commit 4: Use const instead of let     ⚡ pre-commit hook runs

  git push origin feature/add-dark-mode     ⚡ pre-push hook runs (~20s)
     ├─ 🏗️  Next.js production build             ✅ Pass
     └─ 🎭 Playwright E2E tests                 ✅ Pass (then pushed to GH)

┌─────────────────────────────────────────────────────────────────────────────┐
│ ☁️  GITHUB (Workflows kick off again on any PR changes)
└─────────────────────────────────────────────────────────────────────────────┘

  New commits pushed → GitHub Actions re-run automatically
  │
  ├─ 🤖 Lint & Type                             ✅ Pass
  ├─ 🤖 Unit Tests                              ✅ Pass
  └─ 🤖 E2E Tests                               ✅ Pass

  PR Status: ✅ All checks passed (1 new commit)
  🐰 CodeRabbit: "Looks good! 1 issue resolved."

  Okay I'm ready! [Merge Pull Request] ← Click! 🎉

  ┌─────────────────────────────────────────────┐
  │ Ruleset Verified: "Protect main branch"     │
  │ ✅ All 5 required status checks passed      │
  │ ✅ Branch is up to date with main           │
  └─────────────────────────────────────────────┘

  main branch updated (merge commit preserves 4 commits)
  └─ 🚀 Vercel deployment triggered → Production
```

Key CI Takeaways

- Local Hooks — Catch issues before commit or reaching GitHub
- GitHub Actions — Validate every PR with fresh environment (reproducible CI)
- GitHub Ruleset — Prevents merging broken code (all checks must pass)
- Fast Feedback — Pre-commit catches 90% of issues locally in ~3s vs ~2min CI wait
- Quality Gates — Code is validated 2× (local + CI) before reaching production

![Quick rough notes](docs/images/rough-notes.png)

## Quick Notes

(1) How Vitest Pieces Work Together

```markdown
1. When you run `npm run test:unit`, Vitest loads vitest.config.ts
2. The config tells Vitest to use jsdom and load `vitest.setup.ts`
3. Your test files can use global test functions and extended matchers
4. The @/* import alias works in tests thanks to `resolve.tsconfigPaths` in the config
5. React components are compiled with React Compiler (matching prod)
```

(2) GitHub - A branch ruleset to be set up to protect main. Includes checks for GitHub workflow jobs to pass before merging PR to main. See [`docs/project-setup.md`](docs/project-setup.md).

(3) Vercel For Deploys - When you raise a PR it automatically deploys to Vercel Preview and Playwright e2e tests run on that too in addition to GitHub servers. When you merge the PR into main, you are deploying to Vercel prod. See [`docs/project-setup.md`](docs/project-setup.md).

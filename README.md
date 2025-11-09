# nextjs-base

*WORK IN PROGRESS - TARGET: Next.js 16 template repo using modern tooling and CI/CD automation. For continuous integration: code quality checks (linting, formatting, type checking, testing) run automatically via Lefthook (locally) and GitHub Actions (on PRs). For continuous deployment: uses Vercel (handles deployments across environments: Preview for PRs, Production for main).*

## 📦 Next.js Initial Installation

| Core Tech | Type | Why |
|:----------|:-----|:--------|
| ✔️ Next.js 16 + App Router | React Framework | Core |
| ✔️ TypeScript | Type Checking | Catch errors before runtime |
| ✔️ Tailwind 4 | UI Styling | Great for centralised theming |
| ✔️ React Compiler | Compiler | Reduces re-renders, faster ux |
| ✔️ `/src` | Source Directory | Clear project organisation |

This template was initialised with the following options:

```bash
# Installed on 2025-11-05
$ npx create-next-app@latest

Would you like to use TypeScript? Yes
Which linter would you like to use? Biome
Would you like to use React Compiler? Yes
Would you like to use Tailwind CSS? Yes
Would you like your code inside a src/ directory? Yes
Would you like to use App Router? (recommended) Yes
Would you like to customise the import alias (@/* by default)? No
```

## 🛠️ Development Tools

Tools for code quality and formatting.

| Tool | Purpose | Why This Choice | Config File |
|:-----|:--------|:----------------|:------------|
| 🎯 TypeScript | Type checking | Static type safety | [tsconfig.json](tsconfig.json) |
| 🎯 Biome | Formatter + Linter | Replaces ESLint + Prettier | [biome.json](biome.json) |
| 🎯 Lefthook | Git hooks manager | Automate quality checks before commit | [lefthook.yml](lefthook.yml) |
| 🧪 Playwright | E2E browser testing | Chromium, WebKit, Mobile Safari | [playwright.config.ts](playwright.config.ts) |
| 🧪 Vitest | Unit testing | Modern, fast Jest alternative | [vitest.config.mts](vitest.config.mts) |
| ❔ UI Library | UI component library | (to be decided) | ([TW UI kit](https://tailwindcss.com/plus/ui-kit) or shadcn/ui) |

## ✅ CI/CD Quality Pipeline

Automated checks run at two stages: locally before commit/push, and remotely on GitHub before merge.

```text
┌──────────────────────────────────────────────────────┐
│  LOCAL (Lefthook)                                    │
│  • Pre-commit: Lint, format, type-check, unit tests  │
│  • Pre-push: E2E tests                               │
│  • Skipped for merge commits, rebase, CI environment │
│  • Can be bypassed (git commit/push --no-verify)     │
└──────────────────────┬───────────────────────────────┘
                       │ git push
                       ▼
┌──────────────────────────────────────────────────────┐
│  REMOTE (GitHub Actions)                             │
│  • Code Quality: Lint Check, Type Check              │
│  • Unit Tests: Vitest                                │
│  • E2E Tests: Playwright (production build)          │
│  • Cannot be bypassed - required for merge           │
└──────────────────────────────────────────────────────┘
```

Local hooks (Lefthook) run before commits and pushes, auto-fixing issues where possible. Anyone can bypass these with `--no-verify`. GitHub Actions workflows run on every PR to main and cannot be bypassed—all checks must pass before merge. Unlike local hooks, CI workflows only validate without auto-fixing.

| Stage | Runs Via | Hook/Workflow | Check | Tool | Behavior |
|:------|:---------|:--------------|:------|:-----|:---------|
| **Local** | Lefthook | [pre-commit](lefthook.yml) | Code format & lint | Biome | Auto-fixes |
| | | | Type checking | TypeScript | Blocks on errors |
| | | | Unit tests | Vitest | Blocks on failures |
| | | [pre-push](lefthook.yml) | E2E tests | Playwright | Runs tests |
| **Remote** | GitHub Workflow | [code-quality.yml](.github/workflows/code-quality.yml) | Code quality | Biome, TypeScript | Check only |
| | | [e2e-tests.yml](.github/workflows/e2e-tests.yml) | E2E tests | Playwright (production build) | Check only |
| | | [unit-tests.yml](.github/workflows/unit-tests.yml) | Unit tests | Vitest | Check only |

## 📂 Project Structure

Key project files and directories:

```text
nextjs-base/
├── .claude/             # Claude Code commands and settings
├── .github/workflows/   # GitHub Actions CI/CD workflows
├── .vscode/             # VSCode settings & recommended extensions
├── docs/notes/          # Reference documentation
├── e2e/                 # Playwright E2E tests
├── public/              # Static assets
├── src/
│   └── app/
│       └── globals.css  # Tailwind v4 config (via @theme)
├── .nvmrc               # Node version pinning (24.11.0)
├── biome.json           # Biome formatter/linter config
├── lefthook.yml         # Git hooks configuration
├── next.config.ts       # Next.js configuration
├── package.json         # Dependencies and scripts
├── package-lock.json    # Dependency locking of versions
├── playwright.config.ts # Playwright E2E test configuration
├── postcss.config.mjs   # PostCSS for Tailwind CSS
├── tsconfig.json        # TypeScript configuration
├── vitest.config.mts    # Vitest unit test configuration
└── vitest.setup.ts      # Testing Library setup & cleanup
```

Available Scripts ([package.json](package.json)):

| Script | Description |
|:-------|:------------|
| **Development** | |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| **Testing** | |
| `npm test` | Run unit tests (watch mode) |
| `npm run test:unit:run` | Run unit tests once (for CI) |
| `npm run test:e2e` | Run E2E tests (headless) |
| `npm run test:e2e:ui` | Run tests with UI mode |
| `npm run test:e2e:headed` | Run tests in headed browser |
| `npm run test:e2e:debug` | Debug tests with PW Inspector |
| `npm run test:e2e:codegen` | Generate tests using PW Codegen |
| `npm run test:e2e:report` | View HTML test report |
| **Code Quality** | |
| `npm run format` | Format code with Biome |
| `npm run lint` | Lint, format, and fix imports with Biome |
| `npm run type-check` | Run TypeScript type checker |
| `npm run check` | All checks (Biome CI mode + TypeScript) |
| `npm run lint:md` | Lint and auto-fix markdown files (optional) |

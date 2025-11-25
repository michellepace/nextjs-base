![Next.js 16 - a modern template repo](docs/images/github-social-thin.jpg)

*WORK IN PROGRESS - TARGET: Next.js 16 template repo using modern tooling and CI/CD automation. For continuous integration: code quality checks (linting, formatting, type checking, testing) run automatically via Lefthook (locally) and GitHub Actions (on PRs). For continuous deployment: uses Vercel (handles deployments across environments: Preview for PRs, Production for main).*

## 📦 What Was Initially Installed?

This template was initialised with the following options and then updated:

```bash
# Next.js installer
$ npx create-next-app@latest

Would you like to use TypeScript? ✔️Yes
Which linter would you like to use? ✔️Biome
Would you like to use React Compiler? ✔️Yes
Would you like to use Tailwind CSS? ✔️Yes
Would you like your code inside a src/ directory? ❌ No
Would you like to use App Router? (recommended) ✔️Yes
Would you like to customise the import alias (@/* by default)? ❌ No

# Update all dependencies to latest versions
npm outdated                # Check outdated packages (2025-11-20)
npx npm-check-updates -u    # Rewrite package.json with latest
npm install                 # Install updated versions
```

## ⚙️ Config Files Explained

| File | What | Generally In This Project Template |
| :----- | :----- | :------------------ |
| ▢ [.gitattributes](.gitattributes) | Git line ending and file type handling | Normalises line endings across platforms for consistent Git diffs |
| ▢ [.gitignore](.gitignore) | Files and directories Git should ignore | Prevents build outputs and dependencies from being committed |
| ▢ [.markdownlint.yaml](.markdownlint.yaml) | Markdownlint configuration | Disables strict linting rules for practical writing |
| ▢ [.vscode/extensions.json](.vscode/extensions.json) | VS Code extension recommendations | Useful extensions to use in this Next.js project |
| ▢ [.vscode/settings.json](.vscode/settings.json) | VS Code editor and formatting settings | Enables auto-formatting and configures Biome and Tailwind extensions |
| 🌺 [.claude/commands/](.claude/commands) | Claude Code repeatable prompts | Repeatable prompts like /commit |
| 🌺 [.claude/settings.json](.claude/settings.json) | Claude Code permissions | Allow/Deny permissions for files, commands, websearch etc |
| 🌺 [.mcp.json](.mcp.json) | Claude Code MCP config | e.g. Playwright MCP so Claude Code can "see" app and adjust |
| 🌺 [CLAUDE.md](CLAUDE.md) | Claude Code project context | Documents tech stack for Claude Code (customise!) |
| 🅽 [next.config.ts](next.config.ts) | Next.js framework configuration | Enables React Compiler and customises Next.js build settings |
| 🅽 [package.json](package.json) | Project dependencies and npm scripts | Defines project dependencies, scripts, and npm package metadata |
| 🅽 [postcss.config.mjs](postcss.config.mjs) | PostCSS plugins config for CSS processing | Enables Tailwind CSS v4 processing via PostCSS plugin |
| 🧪 [biome.json](biome.json) | Biome linter and formatter | Sets linting rules, formatting style, and import organisation |
| 🧪 [lefthook.yml](lefthook.yml) | Git hooks manager | Automates code quality checks on commit and E2E tests on push |
| 🧪 [tsconfig.json](tsconfig.json) | TypeScript compiler settings | Configures TypeScript compiler options and module resolution behaviour |
| 🧪 [playwright.config.ts](playwright.config.ts) | Playwright E2E test runner configuration | Sets test browsers (desktop + mobile), parallel execution, and base URLs |
| 🧪 [.playwright/](.playwright/) | Playwright test outputs (custom organisation) | Contains test artifacts in `test-results/` and HTML `playwright-report/` (all Playwright outputs nested under `/.playwright/` for clean structure) |
| 🧪 [vitest.config.ts](vitest.config.ts) | Vitest test runner config | Sets up React component testing environment and references [vitest.setup.ts](vitest.setup.ts) |
| 🧪 [vitest.setup.ts](vitest.setup.ts) | Global test setup | Adds helpful test assertions like `expect(element).toBeVisible()` |
| 🚀 [.github/workflows/check-lint-type.yml](.github/workflows/check-lint-type.yml) | GitHub Actions CI workflow | Runs Biome linting/formatting checks and TypeScript type checking on PRs |
| 🚀 [.github/workflows/test-e2e.yml](.github/workflows/test-e2e.yml) | GitHub Actions CI workflow | Runs Playwright E2E tests on PRs (builds production, tests browsers, uploads reports) |
| 🚀 [.github/workflows/test-e2e-vercel.yml](.github/workflows/test-e2e-vercel.yml) | GitHub Actions CI workflow | Runs Playwright E2E tests against Vercel Preview deployments (triggered by Vercel) |
| 🚀 [.github/workflows/test-unit.yml](.github/workflows/test-unit.yml) | GitHub Actions CI workflow | Runs Vitest unit tests on PRs (uses jsdom environment, React Testing Library) |

---

## 🔄 CI/CD Workflow in Action

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

  git push origin feature/add-dark-mode     ⚡ pre-PUSH hook runs
     └─ 🎭 Playwright E2E tests                 ✅ Pass (then pushed to GH)

┌─────────────────────────────────────────────────────────────────────────────┐
│ ☁️  GITHUB: Workflows kickoff on GitHub machines when PR is created
└─────────────────────────────────────────────────────────────────────────────┘

  Create Pull Request → GitHub Actions triggered automatically
  │
  ├─ 🤖 Workflow 1: Lint & Type (biome, tsc)
  │  ├─ Checkout code
  │  ├─ Setup Node.js LTS
  │  ├─ Install dependencies (npm ci)
  │  ├─ Run Biome checks                        ✅ Pass
  │  └─ Run TypeScript checks                   ✅ Pass
  │
  ├─ 🤖 Workflow 2: Unit Tests (vitest)
  │  ├─ Checkout code
  │  ├─ Setup Node.js LTS
  │  ├─ Install dependencies (npm ci)
  │  └─ Run Vitest tests                        ✅ Pass
  │
  └─ 🤖 Workflow 3: E2E Tests (playwright)
     ├─ Checkout code
     ├─ Setup Node.js LTS
     ├─ Install dependencies (npm ci)
     ├─ Install Playwright browsers
     ├─ Build Next.js production
     └─ Run Playwright tests                    ✅ Pass

  ── Meanwhile, Vercel deploys Preview ──────────────────────────

  🚀 Vercel: Preview deployment ready
     └─ Sends repository_dispatch event to GitHub

  └─ 🤖 Workflow 4: E2E Tests on Vercel Preview
     ├─ Triggered by Vercel (not PR event)
     ├─ Runs Playwright against live Preview URL
     └─ Tests real Vercel deployment             ✅ Pass

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

  git push origin feature/add-dark-mode     ⚡ pre-push hook runs
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
  │ Branch Protection Verified:                 │
  │ ✅ All status checks passed                │
  │ ✅ Branch is up to date with main          │
  └─────────────────────────────────────────────┘

  main branch updated with 4 commits (squash merge)
  └─ 🚀 Vercel deployment triggered → Production
```

🎯 Key CI Takeaways

- Local Hooks — Catch issues before commit or reaching GitHub
- GitHub Actions — Validate every PR with fresh environment (reproducible CI)
- Branch Protection — Prevents merging broken code (all checks must pass)
- Fast Feedback — Pre-commit catches 90% of issues locally in ~3s vs ~2min CI wait
- Quality Gates — Code is validated 2× (local + CI) before reaching production

---

## Quick Notes

(1) Use Ngrok to Test App From Phone

```markdown
1. Sign up and follow https://dashboard.ngrok.com/get-started/setup/linux
2. Then: (Terminal 1: `npm run dev`) + (Terminal 2: `ngrok http 3000`)
3. Ngork gives a url to connect from phone (shareable)
```

(2) How Vitest Pieces Work Together

```markdown
1. When you run npm test, Vitest loads vitest.config.ts
2. The config tells Vitest to use jsdom and load `vitest.setup.ts`
3. Your test files can use global test functions and extended matchers
4. The @/* import alias works in tests thanks to `vite-tsconfig-paths`
5. React components are compiled with React Compiler (matching prod)
```

(3) GitHub - Protect branch and check GitHub Workflows (ie jobs!) passed before allowing to merge the PR

```markdown
# Go Do This In GitHub on Repo

Create GitHub Branch Ruleset:
- name: "Protect main branch"
- enforced status: Active
- target branch: include default branch (main)
- Rules:
    - Restrict deletions
    - Require a pull request before merging
        - Allowed merge methods: Merge (only)
    - Require status checks to pass 🔥
        - Require branches to be up to date before merging
        - Status Checks that are required
          - Search to add "Run Lint & Type Checks" job
          - Search to add "Run Unit Tests" job
          - Search to add "Run E2E Tests" job
    - Block force pushes
```

*Rough - GitHub things to do: See notes in [docs/github-setup.md](docs/github-setup.md)*

(4) Vercel For Deploys

```text
1. Sign in > New Project > connect to this repo > deploy it
2. Check Vercel Speed Insights and Web Analytics are enabled (see `layout.tsx`)
3. [Optional] GitHub > Branch ruleset > Add "Vercel" status check
   - This requires Vercel deployment to succeed before merge (separate from E2E tests)
4. E2E tests on Vercel Preview deployments:
   - Vercel auto-triggers `test-e2e-vercel.yml` via repository_dispatch on each Preview deploy
   - To bypass Deployment Protection, create the bypass secret:
     - Vercel → Project Settings → Deployment Protection → Protection Bypass for Automation
     - GitHub → Repository Settings → Secrets → Actions → New repository secret:
       Name: VERCEL_AUTOMATION_BYPASS_SECRET
       Value: (the generated secret from Vercel)
```

# README: Next.js Base

![Next.js 16 - a modern template repo](docs/images/github-social-thin.jpg)

## 📦 Next.js Initial Installation

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

| File | What | Generally In This Template |
|:-----|:-----|:-----------------|
| [.claude/commands/*.md](.claude/commands) | Claude Code repeatable prompts | Project-level commands like /commit for structured Git workflows |
| [.claude/settings.json](.claude/settings.json) | Claude Code permissions | Controls which commands, domains, and files Claude Code can access |
| [.gitattributes](.gitattributes) | Git line ending and file type handling | Normalises line endings across platforms for consistent Git diffs |
| [.gitignore](.gitignore) | Files and directories Git should ignore | Prevents build outputs and dependencies from being committed |
| [.vscode/extensions.json](.vscode/extensions.json) | VS Code extension recommendations | Useful extensions to use in this Next.js project |
| [.vscode/settings.json](.vscode/settings.json) | VS Code editor and formatting settings | Enables auto-formatting and configures Biome and Tailwind extensions |
| [biome.json](biome.json) | Biome linter and formatter | Sets linting rules, formatting style, and import organisation |
| [CLAUDE.md](CLAUDE.md) | Claude Code project context | Documents tech stack for Claude Code (customise!) |
| [lefthook.yml](lefthook.yml) | Git hooks manager configuration | Runs Biome and TypeScript checks on pre-commit |
| [next.config.ts](next.config.ts) | Next.js framework configuration | Enables React Compiler and customises Next.js build settings |
| [package.json](package.json) | Project dependencies and npm scripts | Defines project dependencies, scripts, and npm package metadata |
| [postcss.config.mjs](postcss.config.mjs) | PostCSS plugins configuration for CSS processing | Enables Tailwind CSS v4 processing via PostCSS plugin |
| [tsconfig.json](tsconfig.json) | TypeScript compiler settings | Configures TypeScript compiler options and module resolution behaviour |
| [vitest.config.ts](vitest.config.ts) | Vitest test runner config | Sets up React component testing environment and references vitest.setup.ts |
| [vitest.setup.ts](vitest.setup.ts) | Global test setup (loaded by vitest.config.ts) | Adds helpful test assertions like `expect(element).toBeVisible()` |

---

## Quick Notes

How Vitest Pieces Work Together

```markdown
1. When you run npm test, Vitest loads vitest.config.ts
2. The config tells Vitest to use jsdom and load `vitest.setup.ts`
3. Your test files can use global test functions and extended matchers
4. The @/* import alias works in tests thanks to `vite-tsconfig-paths`
5. React components are compiled with React Compiler (matching prod)
```

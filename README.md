# nextjs-base

*WORK IN PROGRESS: Next.js 16 template repo with modern tooling, automated testing, CI/CD to Vercel with GitHub Actions*

## 📦 Next.js Initial Installation

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

What this gives you:

| Category | Technology | Why |
|----------|-----------|---------|
| ✔️ React Framework | Next.js 16 + App Router | Core |
| ✔️ Type Checking | TypeScript | Catch errors before runtime |
| ✔️ UI Styling | Tailwind 4 | Great for centralised theming |
| ✔️ Compiler | React Compiler  | Reduces re-renders, faster ux |
| ✔️ Source Directory | `/src` | Clear project organisation |
| ❓ UI Library | (to be decided) | ([TW UI kit](https://tailwindcss.com/plus/ui-kit) or shadcn/ui) |

## 🛠️ Added Development Tools

Tools added for automated code quality.

| Tool | Purpose | Why This Choice | Config File |
|------|---------|-----------------| ------------|
| 🎯 Markdownlint | Markdown linting | Reduces CodeRabbit comments | [.markdownlint.yaml](.markdownlint.yaml) |
| 🎯 Biome | Formatter + Linter | Replaces ESLint + Prettier | [biome.json](biome.json) |
| 🎯 Lefthook | Git hooks manager | Automate quality checks before commit | [lefthook.yml](lefthook.yml) |

Pre-commit hooks (Lefthook runs before every `git commit`):

- ✓ Markdownlint → auto-fixes markdown
- ✓ Biome → auto-fixes code formatting
- ✓ TypeScript → blocks on type errors (via `tsc`)

## 📂 Project Structure

Key project files and directories:

```
nextjs-base/
├── .claude/            # Claude Code commands and settings
├── .vscode/            # VSCode settings & recommended extensions
├── src/
│   └── app/
│       └── globals.css # Tailwind v4 config (via @theme)
├── public/             # Static assets
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── next.config.ts      # Next.js configuration
├── postcss.config.mjs  # PostCSS for Tailwind CSS
├── lefthook.yml        # Git hooks configuration
├── .markdownlint.yaml  # Markdown linting rules
└── biome.json          # Biome formatter/linter config
```

Available Scripts ([package.json](package.json)):

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Lint, format, and organise imports with Biome |
| `npm run type-check` | Run TypeScript type checker |
| `npm run lint:md` | Lint and format markdown files |

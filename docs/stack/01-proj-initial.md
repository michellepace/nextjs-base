# Project Setup

## Setup Summary

**Next.js 16.0.1 Project** (January 2025)

## Core Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Bundler**: Turbopack (Rust-based, Next.js default) - NOT Vite
- **UI**: React 19.2.0 with React Compiler enabled
- **Styling**: Tailwind CSS v4
- **Linting/Formatting**: Biome 2.2.0 (replaces ESLint + Prettier)

## Development Tooling

- **Pre-commit Hooks**: Lefthook 2.0.2
  - TypeScript type checking (tsc --noEmit)
  - Biome linting/formatting with auto-fix
  - Markdownlint-cli2 for documentation
  - All run in parallel (~0.8s execution time)
- **Editor**: VS Code configured with format-on-save

## Build System

- Next.js uses Turbopack for bundling (dev and production)
- No Vite, no webpack, no separate build tooling

## Testing

None installed yet

**Context for Testing Framework Choice:** This is a Next.js + Turbopack project with TypeScript and Biome already configured for code quality. No Vite in the stack.

## Initial Next.js Installation

```bash
~/projects/nextjs 
$ npx create-next-app@latest nextjs-base
✔ Would you like to use the recommended Next.js defaults? Yes
✔ Would you like to use TypeScript? Yes
✔ Which linter would you like to use? › Biome
✔ Would you like to use React Compiler? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like your code inside a src/ directory? Yes
✔ Would you like to use App Router - recommended? Yes
✔ Would you like to use Turbopack - recommended? Yes
✔ Would you like to customize the import alias - @/* by default? No
Creating a new Next.js app in /home/mp/projects/nextjs/nextjs-base.

Using npm.

Initializing project with template: app-tw 

Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- babel-plugin-react-compiler
- typescript
- @types/node
- @types/react
- @types/react-dom
- @tailwindcss/postcss
- tailwindcss
- @biomejs/biome

added 108 packages, and audited 109 packages in 21s

Success! Created nextjs-base at /home/mp/projects/nextjs/nextjs-base
```

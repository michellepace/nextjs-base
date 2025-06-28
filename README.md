# 🚀 Next.js Base

**A modern Next.js 15 starter with shadcn/ui, TypeScript, and modern tooling.** Clone, install, and start building immediately.

## ✨ Features

### ✅ Ready Now
- **Next.js 15** with App Router & React 19
- **TypeScript** for type safety
- **Tailwind CSS 4** for utility-first styling
- **shadcn/ui** components with stone theme
- **Lucide React** icon library
- **ESLint** & **Turbopack** for development

### 🚧 Coming Soon
- **Clerk Authentication**
- **Dark Mode Toggle**
- **Centralized Theming**

## ⚡ Quick Start

**Requirements:** Node.js 18.18+

```bash
# Clone with your project name
git clone https://github.com/michellepace/nextjs-base my-app-name
cd my-app-name

# Install dependencies
npm install

# Start development server
npm run dev
```

**🎉 Open [localhost:3000](http://localhost:3000) to see your app!**

Edit `src/app/page.tsx` to start building your application.

### Available Scripts

```bash
npm run dev     # Development server (with Turbopack)
npm run build   # Production build
npm run start   # Production server
npm run lint    # Code quality check
```

## 📁 Project Structure

```
nextjs-base/
├── src/app/              # App Router pages & layouts
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Homepage component
│   └── globals.css       # Global styles & Tailwind
├── src/components/ui/    # shadcn/ui components
├── src/lib/              # Shared utilities
├── public/               # Static assets
└── package.json          # Dependencies & scripts
```

**Key Files:**
- `src/app/page.tsx` - Your homepage component (start editing here!)
- `src/app/layout.tsx` - Root layout that wraps all pages (header, footer, etc.)
- `src/app/globals.css` - Global styles, Tailwind CSS imports, and CSS variables
- `src/components/ui/` - Pre-built UI components from shadcn/ui
- `src/lib/utils.ts` - Helper functions (including `cn` for merging CSS classes)
- `package.json` - Project dependencies, scripts, and metadata
- `components.json` - Configuration for shadcn/ui component installation
- `next.config.ts` - Next.js configuration and build settings

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.3.4 | React framework that handles routing, server-side rendering, and builds |
| **React** | 19.1.0 | JavaScript (TypeScript) library that makes websites interactive |
| **TypeScript** | 5.8.3 | Catches errors while coding and gives better autocomplete |
| **Tailwind CSS** | 4.1.11 | Style with classes like `text-center` instead of writing CSS |
| **ESLint** | 9.30.0 | Catches coding mistakes and keeps your code style consistent |
| **shadcn/ui** | Latest | Copy-paste beautiful components (buttons, forms, modals, etc.) |
| **Radix UI** | 1.2.3 | Provides accessible foundation that shadcn/ui is built on |
| **Lucide React** | 0.525.0 | Clean, consistent icon library with 1000+ SVG icons |

## 🎯 What Makes This Special

- **Zero Configuration** - Everything pre-configured and ready to use
- **Modern Stack** - Latest versions of Next.js, React, and TypeScript
- **Developer Experience** - ESLint, TypeScript, and Turbopack for fast development
- **Production Ready** - Optimised build settings and best practices
- **Extensible** - Easy to add authentication, database, and other features

---

**Happy coding! 🎉** Start building your next great project with this modern, type-safe foundation.
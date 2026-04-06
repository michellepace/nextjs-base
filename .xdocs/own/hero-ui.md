# 🦸 HeroUI v3 Evaluation Report

> **Date:** 31 March 2026
> **Purpose:** Evaluate HeroUI v3.0.1 as an alternative to shadcn/ui for this Next.js 16 starter template
> **Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript (strict) · Biome

---

## 🎯 TL;DR

HeroUI v3 is a **feasible alternative** to shadcn/ui. It ships polished, accessible components out of the box with excellent Tailwind v4 and React 19 support. The key trade-off: HeroUI is a **living npm dependency** (automatic updates, less control) whereas shadcn/ui is **copy-paste code you own** (full control, more maintenance). HeroUI suits teams who want beautiful defaults fast; shadcn/ui suits teams who want total ownership and flexibility. Both have strong AI tooling. Community size and ecosystem maturity still favour shadcn/ui significantly.

---

## 📊 Table 1: Stack Compatibility

| Requirement | HeroUI v3 | shadcn/ui | Notes |
|---|:---:|:---:|---|
| React 19 | ✅ | ✅ | HeroUI built *for* React 19; shadcn fully updated |
| Next.js 16 (App Router) | ✅ | ✅ | Both provide Next.js integration examples |
| Tailwind CSS v4 | ✅ Full | ✅ Full | Both use `@theme`, CSS variables, OKLCH colours |
| TypeScript (strict) | ✅ | ✅ | Both fully typed with IntelliSense |
| Biome (lint/format) | ✅ | ✅ | Neither conflicts — no ESLint dependency |
| React Server Components | ⚠️ Partial | ⚠️ Partial | Both need `"use client"` for interactive components |
| `next-themes` | ✅ Native | ✅ Native | Both document next-themes integration |
| Dynamic `params` (Promise) | ➖ N/A | ➖ N/A | Component library doesn't affect routing |

**Verdict:** Both are fully compatible with this project's stack. No blockers either way.

---

## 📊 Table 2: Feature Comparison

| Feature | HeroUI v3 | shadcn/ui |
|---|---|---|
| **Architecture** | npm package ("living library") — install, import, use | CLI copies code into your project — you own it entirely |
| **Underlying primitives** | React Aria Components (Adobe) | Radix UI (+ Base UI option since CLI v4) |
| **Component count** | ~50–75 (+ 220 in paid Pro tier) | ~50+ (community registries add more) |
| **Variant model** | Semantic: `primary`, `secondary`, `tertiary`, `danger` | Visual: `default`, `destructive`, `outline`, `ghost` |
| **Component pattern** | Compound components (`Alert.Icon`, `Alert.Title`) | Composable primitives (flat imports) |
| **Theming** | CSS variables (OKLCH) + Theme Builder UI tool | CSS variables (OKLCH) + manual token editing |
| **Built-in themes** | 2 (light/dark) + custom theme support | 8 base themes + community themes |
| **Accessibility** | WCAG 2.1 AA via React Aria (automatic) | WAI-ARIA via Radix (solid, but less automated) |
| **Animations** | CSS + GPU-accelerated (no JS runtime) | CSS transitions (manual, minimal by default) |
| **Bundle impact** | Tree-shaken npm dep; mid-range size | Zero runtime dep; you control what ships |
| **Customisation** | 10 styling approaches (Tailwind, BEM, CSS-in-JS, variant fns) | Full source code ownership; modify anything |
| **Updates** | Automatic via npm (bug fixes, new features) | Manual — you patch your own copied code |
| **Styles separation** | `@heroui/styles` is framework-agnostic (usable with Vue/Svelte) | React-only (Radix dependency) |
| **Figma kit** | ✅ Official v3 kit | ✅ Community kits available |
| **Pricing** | Free (MIT) core; Pro tier is paid | Fully free (MIT) |

---

## 📊 Table 3: AI Tooling

| AI Feature | HeroUI v3 | shadcn/ui |
|---|---|---|
| **LLMs.txt** | ✅ Multiple files: full docs, components-only, patterns-only | ❌ No dedicated llms.txt (docs are open though) |
| **MCP Server** | 🔜 Coming soon (announced) | ✅ Available since Aug 2025 |
| **Agent Skills** | ✅ `heroui-react` skill with scripts (`list_components`, `get_docs`, `get_theme`, etc.) | ✅ `shadcn/skills` covering both Radix and Base UI |
| **Text-to-App** | ✅ HeroUI Chat (natural language → app) | ✅ v0.dev (Vercel's AI-powered UI generator) |
| **Claude Code integration** | ✅ Add llms.txt to `.claude` file or reference URL | ✅ MCP server + skills for component search/install |
| **Cursor/Windsurf** | ✅ Documented integration via `@Docs` and `.windsurfrules` | ✅ Native support in most AI editors |
| **Design System AI** | Theme Builder UI | shadcn/create for visual presets |

**Verdict:** Both invest heavily in AI developer tooling. HeroUI's `llms.txt` files are more structured for LLM consumption. shadcn's MCP server is already live. Roughly equal — different strengths.

---

## 📊 Table 4: Ecosystem & Community

| Metric | HeroUI v3 | shadcn/ui |
|---|---|---|
| **npm weekly downloads** | ~81K–120K | ~560K+ |
| **GitHub stars** | ~24K–27K | ~104K+ |
| **Website adoption** | ~39 sites (BuiltWith) | ~14,900 sites (BuiltWith) |
| **First release** | 2021 (as NextUI) | 2023 |
| **Maturity** | v3 is new (2025–2026); rewrite from v2 | 3+ years in production; stable iteration |
| **Stack Overflow coverage** | Limited | Extensive |
| **Third-party integrations** | Growing | Large ecosystem of registries and extensions |
| **Documentation quality** | Thorough; praised by reviewers | Extensive with many examples |
| **Discord/community** | Active Discord + GitHub Discussions | Large community, many tutorials |
| **Backing** | HeroUI Inc. (startup) | Vercel ecosystem (shadcn is a Vercel employee) |

**Verdict:** shadcn/ui has ~5–14× larger adoption across every metric. This means more answered questions, more community components, and faster bug discovery. HeroUI's community is growing but significantly smaller.

---

## ✅ Advantages of HeroUI over shadcn/ui

- **🎨 Beautiful out of the box** — Polished defaults with smooth animations; less design work needed to look professional. shadcn requires more customisation to avoid the "every shadcn app looks the same" problem.

- **♿ Stronger accessibility foundation** — React Aria (Adobe) provides automatic ARIA attributes, keyboard navigation, focus management, and screen reader support. Radix is solid but React Aria is considered more comprehensive.

- **🔄 Automatic updates** — Bug fixes and new components arrive via `npm update`. With shadcn, you must manually patch your copied components when upstream fixes land.

- **🏗️ Compound component pattern** — `Alert.Icon`, `Alert.Title`, `Alert.Close` — intuitive, discoverable API. shadcn uses flat imports which are more flexible but less self-documenting.

- **🎭 Semantic variant naming** — `primary`, `secondary`, `danger` communicate *intent*, not appearance. Easier to maintain a consistent design language across a team.

- **⚡ CSS-only animations** — GPU-accelerated, no JavaScript runtime overhead. v2's Framer Motion dependency is gone. Lighter bundles.

- **🧩 Framework-agnostic styles** — `@heroui/styles` can be used with Vue, Svelte, or plain HTML. Useful if the project ever needs a non-React sibling.

- **📚 Superior LLM documentation** — Dedicated `llms.txt`, `llms-full.txt`, `llms-components.txt`, `llms-patterns.txt` files purpose-built for AI assistants. Well-structured for context-limited models.

- **🎯 Lower learning curve** — Install, import, use. No CLI ceremony to add each component. Better for beginners and rapid prototyping.

---

## ❌ Disadvantages of HeroUI vs shadcn/ui

- **📉 Much smaller community** — 5–14× fewer downloads, stars, and production sites. Fewer blog posts, tutorials, and Stack Overflow answers. When you hit an edge case, you're more likely to be on your own.

- **🔒 Less code ownership** — Components live in `node_modules`. You can customise via props, classes, and variant functions, but you can't modify the component internals without forking. shadcn gives you the actual source.

- **🐛 v3 known bugs** — Table component lags with 50+ rows (missing `React.memo` on primitives). Chrome-specific bug where Modal/Dropdown leaves popovers stuck on screen. These are documented GitHub issues.

- **🔀 Migration churn** — NextUI → HeroUI rename + v2 → v3 breaking changes frustrated existing users. GitHub issues show styling regressions (Button colour/radius, modal styles). Track record of disruptive version changes.

- **💰 Paid Pro tier** — HeroUI Pro (April 2026) introduces paid components and AI tooling. Core remains MIT, but advanced components (220+) cost money. shadcn is entirely free with no premium tier.

- **📦 208 third-party dependencies** — Larger dependency tree creates security and maintenance surface area. shadcn's copy-paste model has zero runtime dependencies.

- **🎨 Limited built-in themes** — Only 2 themes (light/dark) vs shadcn's 8+ base themes. Custom themes require manual CSS variable configuration.

- **⚠️ RSC support incomplete** — Complex interactive components still require `"use client"`. While this is true of both libraries, HeroUI's React Aria foundation means more client-side JavaScript than shadcn's minimal approach.

- **📋 Smaller component catalogue (free tier)** — ~50–75 free components vs shadcn's 50+ with extensive community registries adding hundreds more. The gap widens when factoring in the shadcn ecosystem.

---

## 🌐 What the Web Says (2026)

### Positive Sentiment (majority of independent sources)

> *"Well-designed and intuitive API for beginner and advanced developers"*
> — Shipped.club (ranked HeroUI #6 of 11 best React libraries)

> *"Beautiful websites regardless of your design experience... gorgeous defaults"*
> — Product Hunt reviews (unanimously 5-star)

> *"Over 120,000 downloads on npm each week with strong growth"*
> — DEV Community

> *"Reduces cognitive load for beginners by offering ready-to-use components"*
> — LinkedIn developer testimonial

### Critical Sentiment (minority but substantive)

> *"Being a newer library, the community is smaller compared to more established options"*
> — Untitled UI (ranked HeroUI #11 of 14 libraries)

> *"HeroUI is only React-dependent... 208 third-party dependencies create security and maintenance risk"*
> — daisyUI comparison analysis

> *"More complex pieces still need client components despite v3 improvements"*
> — Product Hunt reviewer on RSC support

### Comparison Consensus

- **For rapid shipping and beautiful defaults:** HeroUI wins
- **For customisation and code ownership:** shadcn/ui wins
- **For enterprise scale:** Neither — MUI or Ant Design preferred
- **For this template project:** Both viable; depends on philosophy preference

### Sources Consulted

- Builder.io: "15 Best React UI Libraries for 2026"
- DEV Community: "5 Best React UI Libraries for 2026"
- Untitled UI: "14 Best React UI Component Libraries in 2026"
- daisyUI: "HeroUI vs shadcn/ui" and "daisyUI Alternative to HeroUI"
- Subframe: "NextUI vs Shadcn: Which One is Better" and "NextUI Alternatives"
- Zenn.dev: React component libraries comparison (JP)
- Medium (Hitesh Saha): "Top 5 UI Libraries Compared for 2025"
- Product Hunt: HeroUI/NextUI reviews
- GitHub: heroui-inc/heroui issues and discussions

---

## ⚠️ Known Issues & Risks (HeroUI v3)

| Issue | Severity | Status |
|---|---|---|
| Table component performance degrades at 50+ rows (missing `React.memo`) | 🟡 Medium | Open on GitHub; wasn't an issue in v2 |
| Chrome: Modal/AlertDialog opened from Dropdown leaves popover stuck | 🟡 Medium | Reported; Chrome-specific |
| Input text cursor jumps to end after mid-text deletion | 🟢 Low | Reported |
| Styling regressions after v2→v3 migration (Button colour/radius) | 🟡 Medium | Multiple reports |
| RSC support not seamless for all interactive components | 🟡 Medium | Partial; ongoing work |
| NextUI → HeroUI rename caused confusion and migration friction | 🟢 Low | One-time; settled now |

---

## 💡 Recommendation

**Both are viable for this starter template.** The choice comes down to philosophy:

| If you value... | Choose |
|---|---|
| Beautiful defaults with minimal effort | 🦸 HeroUI |
| Full code ownership and transparency | 🎨 shadcn/ui |
| Automatic bug fixes and updates | 🦸 HeroUI |
| Larger community and ecosystem | 🎨 shadcn/ui |
| Strongest accessibility out of the box | 🦸 HeroUI |
| Zero runtime dependencies | 🎨 shadcn/ui |
| AI-first documentation (llms.txt) | 🦸 HeroUI |
| Mature, battle-tested in production | 🎨 shadcn/ui |
| Everything free, no paid tier | 🎨 shadcn/ui |

**For this specific project** (a starter template others will clone and build upon), shadcn/ui's copy-paste model arguably fits better — template users get full ownership of every component and can modify anything without fighting a library's API. However, if the goal is to ship polished UIs quickly with less maintenance overhead, HeroUI v3 is a genuinely strong contender that's worth serious consideration.

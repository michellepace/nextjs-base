# Tailwind CSS 4 Theme Resources

Resources for semantic theming in `globals.css` for Next.js + Tailwind v4 projects.

Tailwind themes that I found later: [https://tailkits.com/](https://tailkits.com/)

---

## Official

**shadcn/ui Themes** — [ui.shadcn.com/themes](https://ui.shadcn.com/themes)  
Hand-picked themes you can copy and paste directly into your project.

---

## Free Theme Editors

**tweakcn** — [tweakcn.com](https://tweakcn.com)  
Interactive editor supporting Tailwind CSS v4 and shadcn UI. Modify properties, preview changes, and get code in real time. Open-source with beautiful presets.

**themecn**  
Import existing globals.css files (v3/v4, HSL/OKLCH supported), real-time preview, dark mode support. Download generated CSS for manual addition.

**Shadcn Studio** — [shadcnstudio.com/theme-generator](https://shadcnstudio.com/theme-generator)  
Advanced editor with pre-built themes, AI-powered generation, save and share. Free & pro tiers.

---

## Theme Collections

**ui.jln.dev** — [ui.jln.dev](https://ui.jln.dev)  
10,000+ themes for shadcn/ui. Browse, copy, or create from scratch.

**Shadcnblocks Themes** — [shadcnblocks.com/themes](https://www.shadcnblocks.com/themes)  
Hundreds of professionally designed themes. Tailwind 4 compatible—apply by replacing `:root` and `.dark` CSS variables.

**shadcn-ui-themes** (GitHub)  
Explore themes, preview, then copy `:root` and `.dark` selectors to your globals.css.

---

## Color Palette Generators

**shadcn.io Generator** — [shadcn.io/theme-generator](https://www.shadcn.io/theme-generator)  
Preview theme changes across components and layouts, export CSS variables.

**UI Colors** — [uicolors.app](https://uicolors.app)  
1-click shadcn UI theme generator that creates color scales from a base color.

**UI Colorful** — [uicolorful.com](https://uicolorful.com)  
Create themes from images or colors. Export in HSL, RGB, HEX formats.

**Gradient.page** — [gradient.page/tools/shadcn-ui-theme-generator](https://gradient.page/tools/shadcn-ui-theme-generator)  
Auto-generates CSS variable palettes for shadcn/Tailwind.

**tints.dev** — [tints.dev](https://tints.dev)  
11-color palette generator with API. Outputs in OKLCH format for Tailwind v4's `@theme` directive.

**Tailwind Ink**  
Neural network trained on Tailwind palette to generate color shades.

---

## CLI Tools

**shadcn-custom-theme**  
Generate custom themes from Tailwind color names:

```bash
npx shadcn-custom-theme primary=COLOR
```

Outputs CSS variables to paste into globals.css.

---

## Pre-Built Theme Systems

**daisyUI** — [daisyui.com](https://daisyui.com)  
35 built-in themes that instantly transform your site. Semantic color names (`primary`, `secondary`, `base-content`) using CSS variables. Create custom themes or customize built-in ones.

---

## Premium Marketplaces

| Marketplace | Notes |
| ------------- | ------- |
| **Tailkits** | 250+ templates, UI kits, components. Free & premium, v4-ready. |
| **ThemeForest** | Tailwind templates, $9–29 |
| **Envato Elements** | Subscription-based, includes Tailwind v4 templates |
| **Windy Toolbox** | Premium Tailwind themes and templates |

---

## Tailwind v4 Multi-Theme Strategy

Tailwind CSS v4 drastically simplifies defining themable CSS variables. You can define multiple themes using data attributes like `[data-theme='ocean']` and `[data-theme='rainforest']` with different `--color-primary` values, making it easy to switch themes dynamically.

---

## Recommendations

| Use Case | Best Option |
| ---------- | ------------- |
| shadcn/ui style theming | **tweakcn** or **themecn** |
| Complete semantic system with many themes | **daisyUI** |

## More Recommendations

- **For shadcn/ui projects:** Start with **tweakcn** or the **official shadcn/ui themes** for quick setup. Use **ui.jln.dev** if you want massive variety.
- **For custom color palettes:** Use **UI Colors** or **tints.dev** (especially for oklch format in v4).
- **For complete semantic theming:** Consider **daisyUI** if you want a full semantic color system with many pre-built themes out of the box.
- **For importing existing themes:** Use **themecn** to import and modify existing globals.css files.

---

## Summary Table

| Category | Resource | Price | Best For |
| ---------- | ---------- | ------- | ---------- |
| 🎨 **Official** | shadcn/ui Themes | 🆓 Free | Quick copy-paste themes |
| ✏️ **Editor** | tweakcn | 🆓 Free | Interactive v4 editing |
| ✏️ **Editor** | themecn | 🆓 Free | Importing existing CSS |
| ✏️ **Editor** | Shadcn Studio | 🆓/💎 Freemium | AI-powered generation |
| 📚 **Collection** | ui.jln.dev | 🆓 Free | Massive variety (10k+ themes) |
| 📚 **Collection** | Shadcnblocks Themes | 🆓 Free | Professional designs |
| 🎨 **Palette** | UI Colors | 🆓 Free | Quick color scales |
| 🎨 **Palette** | tints.dev | 🆓 Free | OKLCH for Tailwind v4 |
| 🎨 **Palette** | UI Colorful | 🆓 Free | Image-based themes |
| 🎨 **Palette** | Gradient.page | 🆓 Free | Auto CSS variables |
| ⚙️ **CLI** | shadcn-custom-theme | 🆓 Free | Terminal workflow |
| 🧩 **System** | daisyUI | 🆓 Free | Full semantic theming |
| 💰 **Premium** | Tailkits | 💵 Paid | Templates & UI kits |
| 💰 **Premium** | ThemeForest | 💵 $9–29 | Budget templates |
| 💰 **Premium** | Envato Elements | 💵 Subscription | All-access library |

---
purpose: Draft of the copy in `app/page.tsx`. Edit here first, then port changes there only once confirmed.
---

# Choose a UI Library

**This template is plain Tailwind CSS, with no UI components yet.** Its colours
in `globals.css` are semantic tokens (`--background`, `--primary`, `--muted`,
etc.): plain CSS variables named after shadcn/ui's convention, each with an
`oklch` colour for light mode and another for dark. If you want _centralised
theming_, shadcn/ui and HeroUI are the easiest, as both are built on semantic
tokens. What you do with the template's tokens depends on which library you
pick.

## [shadcn/ui](https://ui.shadcn.com/docs/installation/next)

**Keep the tokens:** shadcn/ui uses the same names, so its components and your
existing classes share one set of colours. Once shadcn/ui is installed, change
a colour by editing its values under `:root` (light mode) and `.dark` (dark
mode) in `globals.css`, and every component follows. The
[theming docs](https://ui.shadcn.com/docs/theming) list what each token
controls, such as `--primary` for buttons and `--accent` for hover states.

## [HeroUI v3](https://heroui.com/en/docs/react/getting-started)

**Replace the tokens:** HeroUI brings its own, and some shared names mean
different things. Its `--accent`, for example, is your brand colour, not a
hover state. Give Claude Code this prompt, then choose colours with the
[Theme Builder](https://heroui.com/en/themes) and paste its CSS into
`globals.css`.

```text
Set up HeroUI v3 in this project, following its current docs at https://heroui.com/en/docs/react/getting-started. Replace the shadcn tokens in app/globals.css with HeroUI's, update every class that used them, and put dark mode colours under .dark, which the theme toggle sets.
```

## [Tailwind Plus](https://tailwindcss.com/plus)

**Colours live in each component:** unlike shadcn/ui and HeroUI, there are no
shared tokens to edit in one place. Tailwind Plus UI Blocks and Catalyst (the
UI kit) write Tailwind's built-in colours into each component, such as
`bg-indigo-600 dark:bg-indigo-500`. Copy the light-and-dark version of a block
so it follows the theme toggle, and install its dependencies (such as Headless
UI and Heroicons). Put Catalyst in `components/ui` and follow
[its docs](https://catalyst.tailwindui.com/docs) to set it up.

Before pasting your first block, give Claude Code this prompt so your own code
uses the same built-in colours:

```text
I'm using Tailwind Plus, so remove the semantic colour tokens from app/globals.css. Switch their uses to Tailwind's built-in colours with dark: variants, keep @custom-variant dark (the theme toggle needs it), and update .claude/rules/tailwind.md to match. Skip app/page.tsx; I'll replace it.
```

To change a colour, swap it in each component (`indigo` → `emerald`). Or, in
`globals.css`, override every shade the components use, or add your own brand
colour and switch components to it (`bg-indigo-600` → `bg-brand-600`):

```css
@theme {
  /* override indigo with green */
  --color-indigo-500: oklch(0.72 0.22 150);
  --color-indigo-600: oklch(0.63 0.19 149);

  /* or add your own pink */
  --color-brand-500: oklch(0.66 0.24 354);
  --color-brand-600: oklch(0.59 0.25 1);
}
```

---

Buttons: [Deploy Now](https://vercel.com/new) ·
[Documentation](https://nextjs.org/docs)

import Image from "next/image";
import { Button } from "@/components/button";
import { ThemeToggle } from "@/components/theme-toggle";

const prose = "text-lg leading-8 text-muted-foreground";

export default function Home() {
  return (
    <main className="flex flex-col gap-12">
      <header className="flex w-full items-center justify-between">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <ThemeToggle />
      </header>

      <article className="flex flex-col gap-6">
        <h1 className="leading-10 tracking-tight">Choose a UI Library</h1>

        <p className={prose}>
          <strong className="text-foreground">
            This template is plain Tailwind CSS, with no UI components yet.
          </strong>{" "}
          Its colours in <code>globals.css</code> are semantic tokens (
          <code>--background</code>, <code>--primary</code>,{" "}
          <code>--muted</code>, etc.): plain CSS variables named after
          shadcn/ui&apos;s convention, each with an <code>oklch</code> colour
          for light mode and another for dark. If you want{" "}
          <em className="text-foreground">centralised theming</em>, shadcn/ui
          and HeroUI are the easiest, as both are built on semantic tokens. What
          you do with the template&apos;s tokens depends on which library you
          pick.
        </p>

        <h2 className="mt-4">
          <a href="https://ui.shadcn.com/docs/installation/next">shadcn/ui</a>
        </h2>
        <p className={prose}>
          <strong className="text-foreground">Keep the tokens:</strong>{" "}
          shadcn/ui uses the same names, so its components and your existing
          classes share one set of colours. Once shadcn/ui is installed, change
          a colour by editing its values under <code>:root</code> (light mode)
          and <code>.dark</code> (dark mode) in <code>globals.css</code>, and
          every component follows. The{" "}
          <a href="https://ui.shadcn.com/docs/theming">theming docs</a> list
          what each token controls, such as <code>--primary</code> for buttons
          and <code>--accent</code> for hover states.
        </p>

        <h2 className="mt-4">
          <a href="https://heroui.com/en/docs/react/getting-started">
            HeroUI v3
          </a>
        </h2>
        <p className={prose}>
          <strong className="text-foreground">Replace the tokens:</strong>{" "}
          HeroUI brings its own, and some shared names mean different things.
          Its <code>--accent</code>, for example, is your brand colour, not a
          hover state. Give Claude Code this prompt, then choose colours with
          the <a href="https://heroui.com/en/themes">Theme Builder</a> and paste
          its CSS into <code>globals.css</code>.
        </p>
        <pre className="wrap-break-word whitespace-pre-wrap">
          <code>{`Set up HeroUI v3 in this project, following its current docs at https://heroui.com/en/docs/react/getting-started. Replace the shadcn tokens in app/globals.css with HeroUI's, update every class that used them, and put dark mode colours under .dark, which the theme toggle sets.`}</code>
        </pre>

        <h2 className="mt-4">
          <a href="https://tailwindcss.com/plus">Tailwind Plus</a>
        </h2>
        <p className={prose}>
          <strong className="text-foreground">
            Colours live in each component:
          </strong>{" "}
          For centralised theming, shadcn/ui and HeroUI are easier. Tailwind
          Plus UI Blocks and Catalyst (the UI kit) write Tailwind&apos;s
          built-in colours into each component, such as{" "}
          <code className="whitespace-nowrap">
            bg-indigo-600 dark:bg-indigo-500
          </code>
          . Copy the light-and-dark version of a block so it follows the theme
          toggle, and install its dependencies (such as Headless UI and
          Heroicons). Put Catalyst in <code>components/ui</code> and follow{" "}
          <a href="https://catalyst.tailwindui.com/docs">its docs</a> to set it
          up.
        </p>
        <p className={prose}>
          Before pasting your first block, give Claude Code this prompt so your
          own code uses the same built-in colours:
        </p>
        <pre className="wrap-break-word whitespace-pre-wrap">
          <code>{`I'm using Tailwind Plus, so remove the semantic colour tokens from app/globals.css. Switch their uses to Tailwind's built-in colours with dark: variants, keep @custom-variant dark (the theme toggle needs it), and update .claude/rules/tailwind.md to match. Skip app/page.tsx; I'll replace it.`}</code>
        </pre>
        <p className={prose}>
          To change a colour, swap it in each component (<code>indigo</code> →{" "}
          <code>emerald</code>). Or, in <code>globals.css</code>, override every
          shade the components use, or add your own brand colour and switch
          components to it (<code>bg-indigo-600</code> →{" "}
          <code>bg-brand-600</code>):
        </p>
        <pre>
          <code>{`@theme {
  /* override indigo with green */
  --color-indigo-500: oklch(0.72 0.22 150);
  --color-indigo-600: oklch(0.63 0.19 149);

  /* or add your own pink */
  --color-brand-500: oklch(0.66 0.24 354);
  --color-brand-600: oklch(0.59 0.25 1);
}`}</code>
        </pre>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button
            href="https://vercel.com/new"
            icon={
              <Image
                className="h-4 w-4 dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={16}
                height={16}
              />
            }
          >
            Deploy Now
          </Button>
          <Button variant="secondary" href="https://nextjs.org/docs">
            Documentation
          </Button>
        </div>
      </article>
    </main>
  );
}

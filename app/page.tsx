import Image from "next/image";
import { Button } from "@/components/button";
import { ThemeToggle } from "@/components/theme-toggle";

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
        <h1 className="leading-10 tracking-tight text-foreground">
          Choose a UI Library
        </h1>

        <p className="text-lg leading-8 text-muted-foreground">
          This template still needs a UI component library. Choose one like{" "}
          <a
            href="https://ui.shadcn.com/docs/installation/next"
            className="font-medium text-foreground underline"
          >
            shadcn/ui
          </a>{" "}
          or{" "}
          <a
            href="https://tailwindcss.com/plus"
            className="font-medium text-foreground underline"
          >
            Tailwind Plus
          </a>
          . The theme in <code>globals.css</code> uses shadcn&apos;s semantic
          colour naming convention. Your choice affects how to proceed.
        </p>

        <h2 className="mt-4 text-foreground">shadcn/ui</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          You&apos;re ready to go. The colour variables in{" "}
          <code>globals.css</code> already match shadcn&apos;s naming (
          <code>--background</code>, <code>--foreground</code>,{" "}
          <code>--primary</code>, <code>--muted</code>, etc.), so installed
          components inherit your theme automatically. To customise colours,
          change the values in <code>:root</code> and <code>.dark</code>
          —all components update instantly.
        </p>

        <h2 className="mt-4 text-foreground">Tailwind Plus</h2>
        <p className="text-lg leading-8 text-muted-foreground">
          Tailwind Plus includes UI Kit (Catalyst) and UI Blocks. The UI Kit
          typically goes into <code>components/ui</code>, whilst blocks go into{" "}
          <code>page.tsx</code> or <code>components/sections/</code>. Both use
          Tailwind&apos;s default palette (<code>zinc</code>, <code>gray</code>,{" "}
          <code>indigo</code>, etc.) rather than semantic names.
        </p>
        <p className="text-lg leading-8 text-muted-foreground">
          To theme them, either find-replace palette classes with semantic ones
          (<code>bg-zinc-900</code> → <code>bg-background</code>
          ), or override the palette in <code>@theme</code>
          —for example, <code>--color-zinc-900: oklch(...)</code>. Note that
          Blocks are often light-mode only.
        </p>

        <p className="text-lg leading-8 text-muted-foreground">
          With either library, colours remain centralised. The{" "}
          <code>@theme</code> override method requires no code changes;
          find-replace gives full control over naming but requires editing
          files.
        </p>

        <h3 className="mt-4 text-foreground">Advanced: Palette Remapping</h3>
        <p className="text-lg leading-8 text-muted-foreground">
          Instead of directly overriding <code>--color-zinc-900</code>, you can
          define your brand palette first, then remap Tailwind&apos;s colours to
          it:
        </p>
        <pre>
          <code>{`@theme {
  --color-brand-600: oklch(0.51 0.24 280);
}
:root {
  --color-indigo-600: var(--color-brand-600);
  --color-blue-600: var(--color-brand-600);  /* both now use your brand */
}`}</code>
        </pre>
        <p className="text-lg leading-8 text-muted-foreground">
          Benefits: define colours once with meaningful names, remap multiple
          Tailwind palettes to the same brand colour, clearer separation between
          your palette and Tailwind&apos;s naming.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button
            href="https://vercel.com/new"
            icon={
              <Image
                className="dark:invert"
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

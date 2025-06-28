import Image from "next/image";
import { Triangle, FileText, Monitor, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 pb-8 gap-8 sm:p-8 font-sans">
      <main className="flex flex-col gap-6 row-start-2 items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <p className="text-sm text-muted-foreground text-left">
          Built with centralised theming • Tailwind 4 • shadcn/ui
        </p>
        <ol className="list-inside list-decimal text-sm text-left font-mono space-y-2">
          <li className="tracking-tight">
            This page uses centralised theming with Tailwind design tokens
          </li>
          <li className="tracking-tight">
            Buttons are built with shadcn/ui components (composition over configuration)
          </li>
          <li className="tracking-tight">
            All styling follows our design system defined in globals.css
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="default" size="lg" asChild>
            <a
              href="https://tailwindcss.com/docs/styling-with-utility-classes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Triangle className="fill-current" />
              Tailwind 4 Styling
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://ui.shadcn.com/docs/components"
              target="_blank"
              rel="noopener noreferrer"
            >
              shadcn/ui Components
            </a>
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-4 flex-wrap items-center justify-center">
        <Button variant="link" asChild>
          <a
            href="https://tailwindcss.com/docs/theme#default-theme-variables"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText />
            Tailwind Defaults
          </a>
        </Button>
        <Button variant="link" asChild>
          <a
            href="https://ui.shadcn.com/docs/theming"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Monitor />
            Shadcn Theming
          </a>
        </Button>
        <Button variant="link" asChild>
          <a
            href="https://ui.shadcn.com/docs/components-json"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe />
            shadcn config →
          </a>
        </Button>
      </footer>
    </div>
  );
}
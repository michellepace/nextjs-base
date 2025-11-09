import Link from "next/link";
import { formatPageTitle } from "./utils";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          About
        </h1>
        <p className="text-sm font-medium tracking-wider text-zinc-500 dark:text-zinc-400">
          {formatPageTitle("page information")}
        </p>
        <div className="max-w-lg text-center">
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 mb-4">
            This page exists as an example for Playwright end-to-end testing.
          </p>
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
            It demonstrates navigation between pages and helps verify that
            routing works correctly in this Next.js application. The E2E tests
            check that users can navigate from the home page to this about page
            and back.
          </p>
        </div>
        <Link
          className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px] text-base font-medium"
          href="/"
        >
          Home
        </Link>
      </main>
    </div>
  );
}

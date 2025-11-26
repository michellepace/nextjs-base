import Image from "next/image";
import { Button } from "@/app/components/Button";
import { Counter } from "@/app/components/Counter";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-12 px-16 py-16 sm:items-start">
        <Image
          className="logo-adaptive"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 sm:items-start">
          <h2 className="text-4xl font-bold sm:text-5xl">Hello h2</h2>
          <Counter unitPrice={25.99} />
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Button
            href="https://vercel.com/new"
            icon={
              <Image
                className="logo-adaptive"
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
      </main>
    </div>
  );
}

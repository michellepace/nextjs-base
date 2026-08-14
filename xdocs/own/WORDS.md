# Next.js Words

## Client Component

If component requires browser interactivity, such as clicking buttons, navigating to different pages, and submitting forms, then you need to turn it into a client component. Client components are rendered on the client (browser) side.

## Nested Routes (child routes)

I need a dashboard page, and then within there two sub-pages "analytics" and "users". Is this clear to you?

- Yes, you said it clearly! You could also use Next.js terminology like "nested routes" or "child routes under dashboard", but "sub-pages within dashboard" is perfectly clear.

## Dynamic Routes

I want to create a dynamic route for user profiles and link to them from the dashboard page. (examples: `/dashboard/users/[userid]` / `/users/[userid]` / `/users/[userid]`)

```typescript
// Dynamic route `params` is a Promise** - Must be awaited in page components:
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>ID: {id}</div>;
};
```

## Route Groups

Route Groups are folders wrapped in parentheses like (root) or (dashboard) that:

- Do NOT appear in the URL path (this is the key feature)
- Organize your file structure without affecting routing
- Allow different layouts for different sections of your app
- Help group related routes together logically

Example:

```tsx
app/
├── (root)/           ← Route group (not in URL)
│   ├── layout.tsx    ← Layout for this group
│   ├── page.tsx      ← URL: /
│   └── about/
│       └── page.tsx  ← URL: /about (not /root/about)
└── (dashboard)/      ← Different route group
    ├── layout.tsx    ← Different layout
    └── analytics/
        └── page.tsx  ← URL: /analytics (not /dashboard/analytics)
```

## Asynchronous / Async / Promise / Await

Instead of holding up all execution, async functions allow other code (outside the function) to continue running while waiting. The code inside this function waits at each `await`. Most common use case: fetching data from APIs or databases (using ORMs like Prisma and Drizzle).

**Example 1:**

```tsx
const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
const { id } = await params; // ⏸️ ONLY THIS LINE WAITS!

    return ( // ⬇️ Everything below runs immediately AFTER
      <main>
        <h1 className="text-5xl font-bold">Dashboard - User Details</h1>
        <p className="mt-4">Viewing details for User #{id}</p>
      </main>
    );
};
```

1. Promise `params: Promise<{ id: string }>`: Next.js says "I promise I'll give you this data later, but I don't have it RIGHT NOW"
2. Await `await params`: "I'll wait for it now" (until you give me the actual params)
3. Async `async`: "This function knows how to wait" (marks the function as capable of using `await`)

*Asynchronous means not occurring at the same time. In general, it describes events or processes that don't happen in sync or in real-time, such as sending an email instead of making a phone call. In computing, it refers to operations that start independently without waiting for previous ones to finish.*

**Example 2:** Asynchronous = "Not in Sync" = Different Times

```tsx
// Things happen at DIFFERENT times (NOT in sync)
const getUser = async () => {
  console.log("1. Start");
  const promise = database.getUser();  // 🚀 Start the database query
  console.log("2. Query started");     // 👈 This runs WHILE database is still working!
  const user = await promise;          // ⏸️ Now wait for result
  console.log("3. Got user");
  return user;
};
```

## Data Fetching (Server vs Client Components)

**OLD terminology (Pages Router - outdated):** CSR (Client-Side Rendering), SSR (Server-Side Rendering), ISR (Incremental Static Regeneration)

**NEW approach (App Router - Next.js 16):** Next.js 16 doesn't use CSR/SSR/ISR terminology. Instead:

1. **Server Components** (default) - Fetch data on the server
   - Cached by default (like old "static generation")
   - Use `fetch(url, { cache: 'no-store' })` for dynamic rendering (like old SSR)
   - Use `fetch(url, { next: { revalidate: 60 } })` for revalidation (like old ISR)

2. **Client Components** - Fetch data in the browser (like old CSR)
   - Use `'use client'` directive
   - Use React's `use` hook or libraries like SWR/React Query

**Key insight:** You control caching with `fetch` options, not by choosing a rendering method upfront.

```tsx
// Server Component (default) - cached
export default async function Page() {
  const data = await fetch('https://api.example.com/posts')
  const posts = await data.json()
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}

// Server Component - dynamic (no cache)
export default async function Page() {
  const data = await fetch('https://api.example.com/posts', { cache: 'no-store' })
  const posts = await data.json()
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}

// Client Component
'use client'
import useSWR from 'swr'

export default function Page() {
  const { data } = useSWR('https://api.example.com/posts', fetcher)
  return <ul>{data?.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

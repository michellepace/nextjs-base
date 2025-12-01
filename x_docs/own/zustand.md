# Zustand

Zustand is a lightweight state management library that, with its persist middleware, leverages **Session Storage** ([see course-state.md](course-state.md#3-session-storage)) to implement a stateful demo/sandbox development pattern for rapid prototyping.

## What (statement)

Statement of what I want in early stages of project development:

<statement>

Use Zustand's persist middleware with sessionStorage to implement client-side session persistence where:

1. Store initial state - Define predefined dummy data as the store's initial state, which loads when sessionStorage is empty (new tab)
2. Session-scoped persistence - State persists during navigation and page refreshes within the same tab
3. Tab isolation - Each browser tab maintains independent state (sessionStorage is tab-scoped)
4. Ephemeral/transient data - State is cleared when the tab closes (sessionStorage lifecycle)
5. Interactive demo mode - Users interact with stateful mock data that "feels like a real application"

</statement>

## Why?

**Me:** This will "represent" a database with TypeScript interfaces. These are easier to refactor and change than a database. Whilst at the same time you can "play with the application." When the application is stable, I will migrate to a database.

**Claude Code 1:** This approach uses TypeScript interfaces to define the data model, which is easier to iterate on than database schemas during early development. Mock data in sessionStorage enables a functional, interactive prototype. Once the application structure stabilizes, the same TypeScript interfaces will guide the database schema design and migration.

**Claude Code 2:** — **Rationale:** TypeScript interfaces define the data structure, providing type safety and rapid iteration without database migration overhead. When the application stabilizes, replace sessionStorage with a database backend while keeping the same TypeScript interfaces as the data contract. This pattern enables:

- Fast prototyping with changing requirements
- Interactive development with stateful mock data
- Type-safe data operations from day one
- Smooth migration path (interfaces → database schema)

🎯 Key Improvements

| Issue | Fix |
|:---|:---|
| "Represent database" | → "Define data model/schema" |
| "Easier than a database" | → "Easier than database migrations" |
| "Play with application" | → "Interactive prototype" or "functional development" |
| Missing migration clarity | → Explicit migration path explanation |

## Save Prompt Response

Zustand Persist Middleware Evaluation (prompted with statement above)

<response>

## Executive Summary

✅ **Your idea is valid and well-supported by Zustand.**

The official documentation confirms that Zustand's persist middleware with sessionStorage can accomplish exactly what you've outlined for rapid prototyping with stateful demo data in your Next.js application.

---

## Validation Against Requirements

### 1. Store Initial State ✅

**Your requirement:** Define predefined dummy data as the store's initial state, which loads when sessionStorage is empty (new tab).

**Documentation confirms:**

```typescript
const useBearStore = create<BearStore>()(
  persist(
    (set, get) => ({
      bears: 0,  // Initial state defined here
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: 'food-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
```

(Source: `integrations-persisting-store-data.md`, lines 51-62)

**How it works:** When sessionStorage is empty (new tab), Zustand loads the initial state you define in the store creator. Your dummy data serves as this initial state.

---

### 2. Session-Scoped Persistence ✅

**Your requirement:** State persists during navigation and page refreshes within the same tab.

**Documentation confirms:**
The persist middleware automatically handles this. Using `sessionStorage` as the storage engine ensures data persists across:

- Page navigation
- Page refreshes
- Forward/back browser actions

All within the same browser tab session.

(Source: `middlewares-persist.md`, lines 9-10)

---

### 3. Tab Isolation ✅

**Your requirement:** Each browser tab maintains independent state (sessionStorage is tab-scoped).

**Documentation confirms:**
This is an inherent property of `sessionStorage` (vs. `localStorage`). Each browser tab has its own sessionStorage instance, providing automatic isolation between tabs.

**Default storage comparison:**

- `localStorage` → Shared across all tabs/windows (default)
- `sessionStorage` → Isolated per tab (what you need)

(Source: `integrations-persisting-store-data.md`, line 84)

---

### 4. Ephemeral/Transient Data ✅

**Your requirement:** State is cleared when the tab closes (sessionStorage lifecycle).

**Documentation confirms:**
sessionStorage automatically clears when the browser tab is closed. This is browser behavior that Zustand leverages, requiring no additional configuration.

---

### 5. Interactive Demo Mode ✅

**Your requirement:** Users interact with stateful mock data that "feels like a real application".

**Documentation confirms:**
The persist middleware provides seamless hydration and state updates. Users can:

- Interact with mock data
- See changes persist across navigation
- Experience a fully stateful application
- Have their changes cleared when they close the tab

---

## Critical Considerations for Next.js

⚠️ **You must handle Server-Side Rendering (SSR) hydration issues**

### The Problem

Next.js renders on both server and client. However:

- **Server:** sessionStorage does not exist (Node.js environment)
- **Client:** sessionStorage is available (browser environment)

This mismatch causes hydration errors:

- "Text content does not match server-rendered HTML"
- "Hydration failed because the initial UI does not match what was rendered on the server"

(Source: `integrations-persisting-store-data.md`, lines 513-523)

### The Solution (from official docs)

**Option 1: Custom Hook Pattern**

Create a hook that delays hydration until client-side:

```typescript
// useStore.ts
import { useState, useEffect } from 'react'

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}
```

(Source: `integrations-persisting-store-data.md`, lines 528-547)

**Option 2: Skip Hydration + Manual Rehydrate**

```typescript
const useBearStore = create(
  persist(
    (set, get) => ({
      bears: 0,
      // ...
    }),
    {
      name: 'food-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true, // Don't hydrate on server
    },
  ),
)

// Then in a client component:
useEffect(() => {
  useBearStore.persist.rehydrate()
}, [])
```

(Source: `middlewares-persist.md`, lines 850-884)

**Option 3: Check Hydration Status**

```typescript
const useBoundStore = create(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      }
    }
  )
);

// In your component:
export default function App() {
  const hasHydrated = useBoundStore(state => state._hasHydrated);

  if (!hasHydrated) {
    return <p>Loading...</p>
  }

  return (
    // ... your app
  );
}
```

(Source: `integrations-persisting-store-data.md`, lines 584-623)

---

## Recommended Architecture for Next.js 16

Based on the official Next.js guide (`guides-nextjs.md`), follow this pattern:

### 1. Create Store Factory (not global store)

```typescript
// src/stores/demo-store.ts
import { createStore } from 'zustand/vanilla'

export type DemoState = {
  users: User[]
  products: Product[]
  // ... your mock data types
}

export type DemoActions = {
  addUser: (user: User) => void
  updateProduct: (id: string, product: Product) => void
  // ... your actions
}

export type DemoStore = DemoState & DemoActions

// Your initial dummy data
export const defaultInitState: DemoState = {
  users: [
    { id: '1', name: 'Alice Demo', email: 'alice@demo.com' },
    { id: '2', name: 'Bob Demo', email: 'bob@demo.com' },
  ],
  products: [
    { id: '1', name: 'Widget', price: 9.99 },
    { id: '2', name: 'Gadget', price: 19.99 },
  ],
}

export const createDemoStore = (
  initState: DemoState = defaultInitState,
) => {
  return createStore<DemoStore>()(
    // Note: persist goes here when used with createStore
    (set) => ({
      ...initState,
      addUser: (user) => set((state) => ({
        users: [...state.users, user]
      })),
      updateProduct: (id, product) => set((state) => ({
        products: state.products.map(p =>
          p.id === id ? product : p
        )
      })),
    })
  )
}
```

### 2. Create Context Provider

```tsx
// src/providers/demo-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react'
import { useStore } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { type DemoStore, createDemoStore, defaultInitState } from '@/stores/demo-store'

export type DemoStoreApi = ReturnType<typeof createDemoStore>

export const DemoStoreContext = createContext<DemoStoreApi | undefined>(
  undefined,
)

export const DemoStoreProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const storeRef = useRef<DemoStoreApi | null>(null)

  if (storeRef.current === null) {
    // Create store with persist middleware
    storeRef.current = createStore<DemoStore>()(
      persist(
        (set) => ({
          ...defaultInitState,
          // ... your actions here
        }),
        {
          name: 'demo-storage',
          storage: createJSONStorage(() => sessionStorage),
          skipHydration: true, // Important for Next.js SSR
        },
      ),
    )
  }

  // Rehydrate on client
  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.persist.rehydrate()
    }
  }, [])

  return (
    <DemoStoreContext.Provider value={storeRef.current}>
      {children}
    </DemoStoreContext.Provider>
  )
}

export const useDemoStore = <T,>(
  selector: (store: DemoStore) => T,
): T => {
  const demoStoreContext = useContext(DemoStoreContext)

  if (!demoStoreContext) {
    throw new Error(`useDemoStore must be used within DemoStoreProvider`)
  }

  return useStore(demoStoreContext, selector)
}
```

### 3. Wrap App in Provider

```tsx
// src/app/layout.tsx
import { DemoStoreProvider } from '@/providers/demo-store-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <DemoStoreProvider>
          {children}
        </DemoStoreProvider>
      </body>
    </html>
  )
}
```

(Source: `guides-nextjs.md`, lines 106-155, 354-381)

---

## Additional Features You Can Leverage

### 1. Partial Persistence (partialize)

Only persist specific fields, exclude others:

```typescript
persist(
  (set) => ({
    users: [...],      // Will be persisted
    products: [...],   // Will be persisted
    _tempUI: {},       // Will NOT be persisted
  }),
  {
    name: 'demo-storage',
    storage: createJSONStorage(() => sessionStorage),
    partialize: (state) => ({
      users: state.users,
      products: state.products,
      // Exclude _tempUI
    }),
  },
)
```

(Source: `integrations-persisting-store-data.md`, lines 106-149)

### 2. Version Migration

Evolve your schema over time without breaking existing sessions:

```typescript
persist(
  (set) => ({
    users: [...],
  }),
  {
    name: 'demo-storage',
    version: 2, // Increment when schema changes
    migrate: (persistedState, version) => {
      if (version === 0) {
        // Migrate from version 0 to 1
        persistedState.users = persistedState.users.map(user => ({
          ...user,
          email: user.email || 'unknown@demo.com'
        }))
      }
      if (version === 1) {
        // Migrate from version 1 to 2
        persistedState.users = persistedState.users.map(user => ({
          ...user,
          createdAt: new Date().toISOString()
        }))
      }
      return persistedState
    },
  },
)
```

(Source: `middlewares-persist.md`, lines 550-660)

### 3. Custom Merge for Nested Objects

If you have deeply nested mock data:

```typescript
import createDeepMerge from '@fastify/deepmerge'

const deepMerge = createDeepMerge({ all: true })

persist(
  (set) => ({ /* ... */ }),
  {
    name: 'demo-storage',
    storage: createJSONStorage(() => sessionStorage),
    merge: (persisted, current) => deepMerge(current, persisted),
  },
)
```

(Source: `middlewares-persist.md`, lines 696-745)

---

## TypeScript Best Practices

Your approach of using TypeScript interfaces is excellent and aligns with Zustand's design:

```typescript
// 1. Define your data models
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

interface Product {
  id: string
  name: string
  price: number
  inventory: number
}

// 2. Define store state type
type DemoState = {
  users: User[]
  products: Product[]
}

// 3. Define actions type
type DemoActions = {
  addUser: (user: User) => void
  removeUser: (id: string) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
}

// 4. Combine into store type
type DemoStore = DemoState & DemoActions

// 5. Use in store creation
const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      // Type-safe state and actions
    }),
    { /* ... */ }
  )
)
```

(Source: `integrations-persisting-store-data.md`, lines 765-792)

---

## Is There a Better Way?

Your approach is sound, but here are some alternatives to consider:

### Alternative 1: Mock Service Worker (MSW)

For truly mimicking a backend API:

**Pros:**

- Intercepts network requests
- Can simulate delays, errors, success
- Easily switches to real backend

**Cons:**

- More complex setup
- Overkill if you just need stateful UI
- Requires separate mock definitions

**Verdict:** Use Zustand for your use case. MSW is better when you need to test API integrations.

### Alternative 2: localStorage (instead of sessionStorage)

**Pros:**

- Persists across browser sessions
- Survives tab/window close

**Cons:**

- Data persists indefinitely (not "demo-like")
- Shared across all tabs (breaks isolation)
- Users might forget they're in demo mode

**Verdict:** sessionStorage is the right choice for your demo/sandbox pattern.

### Alternative 3: Context + useState (no Zustand)

**Pros:**

- Simpler (no library)
- Built-in to React

**Cons:**

- No persistence (resets on refresh)
- More boilerplate for complex state
- No middleware ecosystem

**Verdict:** Zustand + persist is superior for your use case.

---

## Migration Path to Database

Your plan to use TypeScript interfaces as the foundation is excellent:

```
Phase 1 (Current): Mock Data in sessionStorage
├─ Define TypeScript interfaces (User, Product, etc.)
├─ Create Zustand stores with dummy data
└─ Build UI components against typed interfaces

Phase 2 (Later): Database Migration
├─ Interfaces → Database schema (Prisma, Drizzle, etc.)
├─ Replace Zustand actions with API calls
├─ Keep same component interfaces
└─ Minimal component changes
```

The interfaces serve as a contract between your UI and data layer, making the migration straightforward.

---

## Conclusion

### You Are On Track ✅

Your idea is:

1. **Technically sound** - Zustand's persist middleware with sessionStorage works exactly as you've described
2. **Well-documented** - Official support with comprehensive examples
3. **Next.js compatible** - With proper hydration handling
4. **TypeScript-friendly** - Strong typing throughout
5. **Migration-ready** - Clean path to database later

### Recommended Next Steps

1. **Implement the store factory pattern** (per Next.js guide)
2. **Use skipHydration: true** and manual rehydrate for Next.js SSR
3. **Define TypeScript interfaces first** (your data models)
4. **Create initial dummy data** as defaultInitState
5. **Test hydration behavior** across navigation and tab close/open

### You Don't Need a Better Way

Zustand with persist middleware and sessionStorage is the ideal solution for your rapid prototyping pattern. It balances:

- Simplicity (easy to set up)
- Functionality (stateful, persistent, isolated)
- Performance (lightweight, fast)
- Migration path (interfaces → database)

Your approach demonstrates strong architectural thinking for early-stage product development.

---

## Key Takeaway

**Statement validated:** Zustand's persist middleware with sessionStorage is an excellent choice for implementing a stateful demo/sandbox development pattern in Next.js 16. Your approach enables rapid prototyping with TypeScript-defined interfaces that will smoothly transition to a database-backed architecture later.

The only critical requirement is proper SSR hydration handling for Next.js, which is well-documented and straightforward to implement.

</response>

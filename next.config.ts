import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // TypeScript validates <Link href> and router.push() against actual routes
  typedRoutes: true,

  // Position dev indicator (default is bottom-left)
  devIndicators: {
    position: "bottom-right",
  },

  // Enables "use cache" directive, cacheLife(), cacheTag(), and Partial Prerendering.
  // Routes are dynamic by default; use "use cache" to opt into caching.
  cacheComponents: true,
};

export default nextConfig;

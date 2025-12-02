import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Enables "use cache" directive, cacheLife(), cacheTag(), and Partial Prerendering.
  // Routes are dynamic by default; use "use cache" to opt into caching.
  cacheComponents: true,
};

export default nextConfig;

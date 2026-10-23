import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true, // Dynamic by default; opt in with "use cache"
  partialPrefetching: true, // Unset logs a build warning; create-next-app 16.4 default
  reactCompiler: true,
  typedRoutes: true,
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;

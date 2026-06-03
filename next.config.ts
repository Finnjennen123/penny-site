import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next does not pick up an
  // unrelated lockfile higher up the tree.
  turbopack: {
    root: __dirname,
  },
  images: {
    qualities: [75, 85, 90],
  },
};

export default nextConfig;

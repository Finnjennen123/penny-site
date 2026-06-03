import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next does not pick up an
  // unrelated lockfile higher up the tree.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Allow full-quality serving for the crisp card artwork.
    qualities: [75, 100],
  },
};

export default nextConfig;

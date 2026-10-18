import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  serverExternalPackages: ["better-sqlite3"],
  poweredByHeader: false,
  images: {
    // AVIF first: noticeably smaller than WebP for photographs, with WebP
    // as the fallback for browsers that can't decode it.
    formats: ["image/avif", "image/webp"],
    // 50 is for photos that sit behind a heavy scrim (Process background).
    qualities: [50, 75],
  },
};

export default nextConfig;

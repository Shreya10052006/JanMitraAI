import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  experimental: {
    optimizeCss: false,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

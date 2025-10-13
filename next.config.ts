import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "veslavia-bucket.nos.wjv-1.neo.id",
        pathname: "**",
      },
    ],
  },
  plugins: [],
};

export default nextConfig;

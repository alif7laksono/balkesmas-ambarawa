import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ["nos.wjv-1.neo.id"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nos.wjv-1.neo.id",
        port: "",
        pathname: "/veslavia-bucket/**",
      },
      {
        protocol: "https",
        hostname: "balkesambarawa.dinkesjatengprov.go.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
  plugins: [],
};

export default nextConfig;

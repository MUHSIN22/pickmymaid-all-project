// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,         // Merge CSS chunks & inline critical CSS
    optimizeServerReact: true,
    optimizeRouterScrolling: true,
    nextScriptWorkers: true,   // Helps reduce main thread blocking
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.pickmymaid.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/api/images/**",
      },
      {
        protocol: "http",
        hostname: "node-server",
        port: "8080",
        pathname: "/api/images/**",
      },
    ],
  },
};

export default nextConfig;

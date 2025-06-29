import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // INSIDE CONST, REMOVE MODULE.EXPORTS
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;

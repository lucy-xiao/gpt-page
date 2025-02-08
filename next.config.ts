import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/gpt-page",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;

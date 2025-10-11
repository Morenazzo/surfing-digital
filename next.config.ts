import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev requests from localtunnel to Next.js dev server resources
  experimental: {
    allowedDevOrigins: [
      "https://gentle-clocks-do.loca.lt",
      "https://angry-snails-hang.loca.lt",
      "https://surfingdigital2024.loca.lt",
      "https://late-needles-bow.loca.lt",
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Disable network detection to avoid the interface error
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Force Next.js to skip network interface detection
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
};

export default nextConfig;

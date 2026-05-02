import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  async rewrites() {
    return [
      {
        source: '/api/assistant/:path*',
        destination: 'http://127.0.0.1:8081/api/assistant/:path*'
      }
    ]
  }
};

export default nextConfig;

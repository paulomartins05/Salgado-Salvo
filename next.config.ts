/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb"
    }
  }
};

module.exports = nextConfig;
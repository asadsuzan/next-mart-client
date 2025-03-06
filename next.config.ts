import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all external sources
      },
      {
        protocol: 'http',
        hostname: '**', // Allows all external sources (if needed)
      },
    ],
  },
};

export default nextConfig;

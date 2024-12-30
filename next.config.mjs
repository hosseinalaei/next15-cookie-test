// import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  // output: "standalone",
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/home",
        permanent: true,
      },
      {
        source: "/",
        destination: "/dashboard/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

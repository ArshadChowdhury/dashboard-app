import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/img/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true, // true for 308 (permanent), false for 307 (temporary)
      },
    ];
  },
};

export default nextConfig;

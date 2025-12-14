import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
      },
      {
        protocol: "https",
        hostname: "s39613.pcdn.co",
      },
      {
        protocol: "https",
        hostname: "youthtoday.org",
      },
      {
        protocol: "https",
        hostname: "news.wisc.edu",
      }
    ],
  },
};

export default nextConfig;

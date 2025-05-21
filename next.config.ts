import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.sanity.io',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com'
    ]
  }
};

export default nextConfig;

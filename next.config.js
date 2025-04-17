/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Suppress hydration errors caused by browser extensions like Grammarly
  experimental: {
    // This ignores attributes added by extensions that cause hydration mismatches
    suppressHydrationWarning: true
  },
  images: {
    domains: [
      'cdn.sanity.io',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com'
    ]
  }
}

module.exports = nextConfig 
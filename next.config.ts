import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 's3.ap-northeast-2.amazonaws.com' }
    ]
  }
}

export default nextConfig

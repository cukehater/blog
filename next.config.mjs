/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 's3.ap-northeast-2.amazonaws.com' },
      { protocol: 'https', hostname: 'vshplselkzxwtmuwjjji.supabase.co' }
    ]
  }
}

export default nextConfig

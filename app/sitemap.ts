import { MetadataRoute } from 'next'

import { DOMAIN } from '@/config'

import { getAllPosts } from './services/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 모든 블로그 포스트 가져오기
  const posts = await getAllPosts()

  // 블로그 포스트 URL 생성
  const postsUrls = posts?.map((post) => ({
    url: `${DOMAIN}/posts/${post.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  // 기본 URL 설정
  const routes = [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: `${DOMAIN}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    }
  ]

  return [...routes, ...(postsUrls || [])]
}

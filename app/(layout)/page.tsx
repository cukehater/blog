import { headers } from 'next/headers'
import Link from 'next/link'
import { v4 as uuid } from 'uuid'

import CategoryButton from '../components/CategoryButton'
import Hero from '../components/Hero'
import PostList from '../components/PostList'

import { PostType } from '../models/posts'
import {
  getAllCategories,
  getAllPosts,
  getPostsByCategory
} from '../services/posts'

export default async function Home() {
  const [categories, headerList] = await Promise.all([
    getAllCategories(),
    headers()
  ])

  const search = headerList.get('x-search')
  const keyword = search ? new URLSearchParams(search).get('keyword') : ''

  const posts = (await (keyword
    ? getPostsByCategory(keyword)
    : getAllPosts())) as PostType[]

  const sortedCategories = categories.sort((a, b) => b.localeCompare(a))

  return (
    <>
      <Hero />

      <nav className="flex flex-wrap gap-2 mt-10">
        <Link href="/">
          <CategoryButton key={uuid()} name="All" isActive={!keyword} />
        </Link>
        {sortedCategories.map((category) => (
          <CategoryButton
            key={uuid()}
            name={category}
            isActive={keyword?.toLowerCase() === category.toLowerCase()}
          />
        ))}
      </nav>

      <p className="w-full mt-10 mb-4 text-sm text-neutral-400">
        {keyword || '전체'}{' '}
        <strong className="text-[--text-color]">{posts.length}</strong>개 포스트
      </p>

      <section className="mt-10">
        <PostList type="post" posts={posts} />
      </section>
    </>
  )
}

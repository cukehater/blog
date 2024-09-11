import { headers } from 'next/headers'

import Intro from './components/Profile.tsx'
import SideNav from './components/SideNav.tsx'
import Footer from '../components/layouts/footer/Footer.tsx'
import Header from '../components/layouts/header/Header.tsx'
import InnerCol from '../components/shared/components/InnerCol.tsx'
import List from '../components/shared/components/List.tsx'

import {
  getAllPosts,
  getPostsByHash,
  getPostsHashes
} from '../services/postService.ts'

import listSortByDate from '../utils/listSortByDate.ts'

import type { ListItemType } from '../types/types.ts'

export default async function Main() {
  const hashes = await getPostsHashes()

  const headersList = headers().get('x-search-params')
  const search = headersList?.split('=')[1] ?? false

  const posts = search
    ? ((await getPostsByHash(search)) as ListItemType[])
    : ((await getAllPosts()) as ListItemType[])
  const sortedPosts = listSortByDate(posts)
  return (
    <>
      <Header />
      <main>
        <InnerCol className="flex-1 flex flex-col items-center justify-center">
          <Intro />
          <p className="text-gray-500 w-full mb-4 text-lg sm:text-base">
            총 <strong>{sortedPosts.length}</strong>개의 글이 있습니다.
          </p>
          <div className="relative w-full">
            {hashes.length > 0 && <SideNav hashes={hashes} />}
            <List listData={sortedPosts} />
          </div>
        </InnerCol>
      </main>
      <Footer />
    </>
  )
}

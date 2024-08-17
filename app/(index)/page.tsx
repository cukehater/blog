import { headers } from 'next/headers'

import Footer from '../layout/footer/Footer.tsx'
import Header from '../layout/header/Header.tsx'

import InnerCol from '../shared/components/InnerCol.tsx'
import List from '../shared/components/List.tsx'

import Intro from './components/Profile.tsx'
import Search from './components/Search.tsx'

import { findPosts } from '../utils/db.ts'
import listSortByDate from '../utils/listSortByDate.ts'

import type { ListItemType } from '../types/types.ts'

export default async function Main() {
  // 헤더에서 searchParams 읽기
  const headersList = headers().get('x-search-params')
  const searchParams = headersList?.split('=')[1] ?? false

  const data = (await findPosts('posts', searchParams)) as ListItemType[]
  const listData = listSortByDate(data)

  return (
    <>
      <Header />
      <main>
        <InnerCol className="flex-1 flex flex-col items-center justify-center">
          <Intro />
          {listData.length > 0 && <Search />}
          <List listData={listData} />
        </InnerCol>
      </main>
      <Footer />
    </>
  )
}

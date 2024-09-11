import Intro from './components/Profile.tsx'
import SideNav from './components/SideNav.tsx'
import Footer from '../components/layouts/footer/Footer.tsx'
import Header from '../components/layouts/header/Header.tsx'
import InnerCol from '../components/shared/components/InnerCol.tsx'
import List from '../components/shared/components/List.tsx'

import { getAllPosts } from '../services/postService.ts'

import listSortByDate from '../utils/listSortByDate.ts'

import type { ListItemType } from '../types/types.ts'

export default async function Main() {
  const data = (await getAllPosts()) as ListItemType[]
  const listData = listSortByDate(data)

  return (
    <>
      <Header />
      <main>
        <InnerCol className="flex-1 flex flex-col items-center justify-center">
          <Intro />
          <p className="text-gray-500 text-left w-full">
            총 <strong>{listData.length}</strong>개의 글이 있습니다.
          </p>

          <div className="relative w-full">
            <SideNav />
            <List listData={listData} />
          </div>
        </InnerCol>
      </main>
      <Footer />
    </>
  )
}

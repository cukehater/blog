import List from './features/list/List.tsx'
import Intro from './features/Profile.tsx'
import Search from './features/Search.tsx'
import Footer from './layout/Footer.tsx'
import Header from './layout/Header.tsx'
import InnerCol from './shared/components/InnerCol.tsx'
import { findAll } from './shared/utils/db.ts'
import listSortByDate from './shared/utils/listSortByDate.ts'
import { ListItemType } from './types/types.ts'

export default async function Main() {
  const data = (await findAll('posts')) as ListItemType[]
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

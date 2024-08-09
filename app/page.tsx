import List from './features/list/List'
import Intro from './features/Profile'
import Search from './features/Search'
import Footer from './layout/Footer'
import Header from './layout/Header'
import InnerCol from './shared/components/InnerCol'
import { connectDB } from './shared/utils/connectDB'
import listSortByDate from './shared/utils/listSortByDate'
import { ListItemType } from './types/types'

export default async function Main() {
  const db = (await connectDB).db('blog')
  const result = await db.collection<ListItemType>('posts').find().toArray()
  const listData = listSortByDate(result)

  return (
    <>
      <Header />
      <main>
        <InnerCol className='flex-1 flex flex-col items-center justify-center'>
          <Intro />
          {listData.length > 0 && <Search />}
          <List listData={listData} />
        </InnerCol>
      </main>
      <Footer />
    </>
  )
}

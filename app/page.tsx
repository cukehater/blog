import List from './features/list/List'
import Intro from './features/Profile'
import Search from './features/Search'
import Footer from './layout/Footer'
import Header from './layout/Header'
import InnerCol from './shared/components/InnerCol'
import { closeDB, connectDB } from './shared/utils/db'
import listSortByDate from './shared/utils/listSortByDate'
import { ListItemType } from './types/types'

export default async function Main() {
  const db = (await connectDB).db('blog')
  const result = await db.collection<ListItemType>('posts').find().toArray()
  const arr = result.map(item => ({ ...item, _id: item._id.toString() }))
  const listData = listSortByDate(arr)

  await closeDB

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

import List from './features/list/List'
import Intro from './features/Profile'
import Search from './features/Search'
import InnerCol from './shared/components/InnerCol'
import { connectDB } from './shared/utils/connectDb'
import { listItemType } from './types/types'

export default async function Main() {
  const db = (await connectDB).db('blog')
  const listData = await db.collection<listItemType>('posts').find().toArray()
  console.log('listData', listData)

  return (
    <main>
      <InnerCol className='flex-1 flex flex-col items-center justify-center'>
        <Intro />
        {listData.length > 0 && <Search />}
        <List listData={listData} />
      </InnerCol>
    </main>
  )
}

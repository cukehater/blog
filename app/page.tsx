import { listData } from './data'
import List from './features/list/List'
import Intro from './features/Profile'
import Search from './features/Search'
import InnerCol from './shared/components/InnerCol'
import { connectDB } from './shared/utils/connectDb'

export default async function Main() {
  const db = (await connectDB).db('blog')
  const result = await db.collection('posts').find().toArray()
  console.log('result', result)

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

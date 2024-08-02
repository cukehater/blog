import { listData } from './data'
import List from './features/list/List'
import Intro from './features/Profile'
import Search from './features/Search'
import InnerCol from './shared/components/InnerCol'

export default function Home() {
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

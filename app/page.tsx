import { listData } from './data'
import List from './features/list/List'
import Intro from './features/Profile'
import InnerCol from './shared/components/InnerCol'

export default function Home() {
  return (
    <main>
      <InnerCol>
        <Intro />
        <List listData={listData} />
      </InnerCol>
    </main>
  )
}

import Intro from './components/Intro'
import InnerCol from './components/layout/InnerCol'
import List from './components/shared/List'
import { listData } from './data'

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

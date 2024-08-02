import InnerCol from '@/app/shared/components/InnerCol'
import List from '@/app/features/list/List'
import { listData } from '@/app/data'

export default function page() {
  return (
    <main>
      <InnerCol>
        <List listData={listData} isTemp={true} />
      </InnerCol>
    </main>
  )
}

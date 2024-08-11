import List from '@/app/features/list/List'
import InnerCol from '@/app/shared/components/InnerCol'

import { connectDB } from '../../shared/utils/connectDB'
import listSortByDate from '../../shared/utils/listSortByDate'
import { ListItemType } from '../../types/types'

export default async function Page() {
  const db = (await connectDB).db('blog')
  const result = await db.collection<ListItemType>('drafts').find().toArray()
  const listData = listSortByDate(result)

  return (
    <>
      <main>
        <InnerCol className='flex-1 flex flex-col items-center justify-center'>
          <List listData={listData} isDraft={true} />
        </InnerCol>
      </main>
    </>
  )
}
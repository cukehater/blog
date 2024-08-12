import List from '@/app/features/list/List'
import InnerCol from '@/app/shared/components/InnerCol'

import listSortByDate from '../../shared/utils/listSortByDate'
import { ListItemType } from '../../types/types'
import { closeDB, connectDB } from '@/app/shared/utils/db'

export default async function Page() {
  const db = (await connectDB).db('blog')
  const result = await db.collection<ListItemType>('drafts').find().toArray()
  const listData = listSortByDate(result)

  await closeDB

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

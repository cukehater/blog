import List from '@/app/features/list/List.tsx'
import InnerCol from '@/app/shared/components/InnerCol.tsx'
import { findAll } from '@/app/shared/utils/db.ts'

import listSortByDate from '../../shared/utils/listSortByDate.ts'
import { ListItemType } from '../../types/types.ts'

export default async function Page() {
  const result = await findAll('drafts')
  const listData = listSortByDate(result as ListItemType[])

  return (
    <main>
      <InnerCol className="flex-1 flex flex-col items-center justify-center">
        <List listData={listData} isDraft />
      </InnerCol>
    </main>
  )
}

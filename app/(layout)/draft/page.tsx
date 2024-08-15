import InnerCol from '@/app/shared/components/InnerCol.tsx'
import List from '@/app/shared/components/List.tsx'

import { findAll } from '@/app/utils/db.ts'
import listSortByDate from '@/app/utils/listSortByDate.ts'

import type { ListItemType } from '@/app/types/types'

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

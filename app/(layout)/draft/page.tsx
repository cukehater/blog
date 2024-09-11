import { getAllDrafts } from '@/app/services/draftService.ts'

import InnerCol from '@/app/components/shared/components/InnerCol.tsx'
import List from '@/app/components/shared/components/List.tsx'

import listSortByDate from '@/app/utils/listSortByDate.ts'

import type { ListItemType } from '@/app/types/types'

export default async function Page() {
  const result = await getAllDrafts()
  const listData = listSortByDate(result as ListItemType[])

  return (
    <main>
      <InnerCol className="flex-1 flex flex-col items-center justify-center">
        <List listData={listData} isDraft />
      </InnerCol>
    </main>
  )
}

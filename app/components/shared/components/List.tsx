import { v4 as uuid } from 'uuid'

import ListItem from './ListItem.tsx'

import NoItems from '@/app/components/shared/components/NoItems.tsx'

import { ListItemType } from '@/app/types/types.ts'

export default function List({
  listData,
  isDraft = false
}: {
  listData: ListItemType[]
  isDraft?: boolean
}) {
  if (listData.length === 0) {
    return <NoItems />
  }
  return (
    <article className="w-full flex-1">
      {listData.map((listItem) => (
        <ListItem key={uuid()} listItem={listItem} isDraft={isDraft} />
      ))}
    </article>
  )
}

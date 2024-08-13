import { v4 as uuid } from 'uuid'

import NoItems from '@/app/shared/components/NoItems.tsx'

import ListItem from './ListItem.tsx'
import { ListItemType } from '../../types/types.ts'

export default function List({
  listData,
  isDraft
}: {
  listData: ListItemType[]
  isDraft?: boolean
}) {
  if (listData.length === 0) {
    return <NoItems />
  }
  return (
    <article className="w-full">
      {listData.map((listItem) => (
        <ListItem key={uuid()} listItem={listItem} isDraft={isDraft} />
      ))}
    </article>
  )
}

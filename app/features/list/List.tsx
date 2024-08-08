import NoItems from '@/app/shared/components/NoItems'

import ListItem from './ListItem'
import { ListItemType } from '../../types/types'

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
    <article className='w-full'>
      {listData.map((listItem, index) => (
        <ListItem key={index} listItem={listItem} isDraft={isDraft} />
      ))}
    </article>
  )
}

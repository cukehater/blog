import NoItems from '@/app/shared/components/NoItems'

import ListItem from './ListItem'
import { listItemType } from '../../types/types'

export default function List({
  listData,
  isTemp
}: {
  listData: listItemType[]
  isTemp?: boolean
}) {
  if (listData.length === 0) {
    return <NoItems />
  }
  return (
    <article className='w-full'>
      {listData.map((listItem, index) => (
        <ListItem key={index} listItem={listItem} isTemp={isTemp} />
      ))}
    </article>
  )
}

import NoItems from '@/app/shared/components/NoItems'
import { listItemType } from '../../types/types'
import ListItem from './ListItem'

export default function List({
  listData,
  isTemp
}: {
  listData: listItemType[]
  isTemp?: boolean
}) {
  if (listData.length === 0) {
    return <NoItems text={isTemp ? '임시 글이' : '게시글이'} />
  }
  return (
    <article>
      {listData.map((listItem, index) => (
        <ListItem key={index} listItem={listItem} isTemp={isTemp} />
      ))}
    </article>
  )
}

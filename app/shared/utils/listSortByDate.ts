import { ListItemType } from '@/app/types/types'

export default function listSortByDate(listData: ListItemType[]) {
  return listData.sort((a, b) => {
    return (
      parseInt(b.registerDate.replace(/-/g, '')) -
      parseInt(a.registerDate.replace(/-/g, ''))
    )
  })
}

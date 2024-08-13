import { ListItemType } from '@/app/types/types.ts'

export default function listSortByDate(listData: ListItemType[]) {
  return listData.sort((a, b) => {
    return (
      parseInt(b.registerDate.replace(/-/g, ''), 10) -
      parseInt(a.registerDate.replace(/-/g, ''), 10)
    )
  })
}

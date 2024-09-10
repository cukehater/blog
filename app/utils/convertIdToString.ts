import type { ListItemType } from '@/app/types/types'

export default function convertIdToString(obj: ListItemType) {
  if (!obj?._id) return obj

  return {
    ...obj,
    _id: obj._id.toString()
  }
}

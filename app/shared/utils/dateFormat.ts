import { differenceInMonths, format as format_fns } from 'date-fns'
import { format, register } from 'timeago.js'
import koLocale from 'timeago.js/lib/lang/ko'

register('ko', koLocale)

export function dateFormat(date: string) {
  const timestamp = convertToTimestamp(date)

  const currentDate = new Date()
  const inputDate = new Date(timestamp)
  const monthsDifference = differenceInMonths(currentDate, inputDate)

  if (monthsDifference >= 1) {
    return format_fns(inputDate, 'yyyy-MM-dd')
  } else {
    return format(timestamp, 'ko')
  }
}

const convertToTimestamp = (dateString: string): number => {
  const [year, month, day, hour, minute, second] = dateString
    .split('-')
    .map(Number)
  return new Date(year, month - 1, day, hour, minute, second).getTime()
}

import koLocale from 'timeago.js/lib/lang/ko'
import { format, register } from 'timeago.js'
import { differenceInMonths, parseISO, format as format_fns } from 'date-fns'

register('ko', koLocale)

export function dateFormat(date: string) {
  const parsedDate = parseISO(date)
  const now = new Date()
  const monthsDifference = differenceInMonths(now, parsedDate)

  if (monthsDifference >= 1) {
    return format_fns(parsedDate, 'yyyy년 M월 d일')
  } else {
    return format(date, 'ko')
  }
}

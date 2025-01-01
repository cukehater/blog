import { format, register } from 'timeago.js'
import koLocale from 'timeago.js/lib/lang/ko'

register('my-locale', koLocale)

export default function parseDateFormat(date: string) {
  return format(date, 'my-locale')
}

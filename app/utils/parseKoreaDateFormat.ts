export default function parseKoreaDateFormat() {
  return new Date()
    .toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .split('. ')
    .join('-')
    .replace(/\.$/, '')
}

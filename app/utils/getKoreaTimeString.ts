export default function getKoreaTimeString() {
  const offset = new Date().getTimezoneOffset() * 60000
  const utc = new Date(Date.now() - offset)

  return utc.toISOString().split('.')[0]
}

export default function processArray(arr: string[]) {
  const map = new Map()

  arr.forEach((item) => {
    const lowerCaseItem = item.toLowerCase()
    if (map.has(lowerCaseItem)) {
      map.set(lowerCaseItem, map.get(lowerCaseItem) + 1)
    } else {
      map.set(lowerCaseItem, 1)
    }
  })

  return Array.from(map, ([name, count]) => ({
    name,
    count
  }))
}

export default function countStringOccurrences(arr: string[]) {
  const map = new Map()

  arr.forEach((item) => {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1)
    } else {
      map.set(item, 1)
    }
  })

  return Array.from(map, ([name, count]) => ({
    name,
    count
  }))
}

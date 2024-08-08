export const addTimeToFileName = (fileName: string) => {
  const fileNameParts = fileName.split('.')
  const extension = fileNameParts.pop()
  const baseName = fileNameParts.join('.')

  return encodeURIComponent(`${baseName}_${Date.now()}.${extension}`)
}

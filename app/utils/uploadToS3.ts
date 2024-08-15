import axios from 'axios'

const uploadToS3 = async (
  res: {
    url: { url: string; fields: { [key: string]: string } }
  },
  fileName: string,
  file: File,
  directory = ''
) => {
  const formData = new FormData()
  Object.entries({ ...res.url.fields, file }).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const result: { config: { url: string }; status: number } = await axios.post(
    res.url.url,
    formData
  )

  return `${result.config.url}/${directory}${fileName}`
}

export default uploadToS3

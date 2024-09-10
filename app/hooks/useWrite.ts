import { useState } from 'react'

// import axios from 'axios'

import type { ListItemType } from '../types/types.ts'

export default function useWritePost(initialFormData: ListItemType) {
  const [formData, setFormData] = useState<ListItemType>(initialFormData)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({ ...formData, title })
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const description = e.target.value
    setFormData({ ...formData, description })
  }

  const handleHashesChange = (hashes: string[]) => {
    setFormData({ ...formData, hashes })
  }

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content })
  }

  const handleSave = async () => {
    console.log(formData?._id)
    // if (formData?._id) {
    //   axios.put('/api/article?type=drafts', formData)
    // } else {
    //   const res = await axios.post('/api/article?type=drafts', formData)
    //   setFormData({ ...res.data.formData })
    // }
  }

  const handlePublish = async () => {
    // if (formData?._id) {
    //   await axios.delete(`/api/article?id=${formData._id}&type=drafts`)
    // }
    // await axios.post('/api/article?type=posts', formData)
  }

  const handleEdit = async () => {
    // await axios.put('/api/article?type=posts', formData)
  }

  return {
    formData,
    handleTitleChange,
    handleDescriptionChange,
    handleHashesChange,
    handleContentChange,
    handleSave,
    handlePublish,
    handleEdit
  }
}

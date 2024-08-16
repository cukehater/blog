import { useCallback, useReducer, useState } from 'react'

import axios from 'axios'

import type { ListItemType } from '../types/types.ts'

const initialFormData = {
  title: '',
  description: '',
  content: '',
  registerDate: '',
  hashes: []
}

export default function useWritePost() {
  const [formData, setFormData] = useState<ListItemType>(initialFormData)
  const [isLoading, endLoading] = useReducer(() => false, true)

  const fetchData = useCallback(async (isEdit: boolean, id: string) => {
    const { data } = await axios.get(
      `/api/article?id=${id}&type=${isEdit ? 'posts' : 'drafts'}`
    )

    setFormData(data.formData)
    endLoading()
  }, [])

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

  const setHashes = (hashes: string[]) => {
    setFormData({ ...formData, hashes })
  }

  const setContent = (content: string) => {
    setFormData({ ...formData, content })
  }

  const checkValidation = () => {
    const { description, registerDate, hashes, ...rest } = formData
    return Object.values(rest).every((value) => value !== '')
  }

  const handleSaveDraft = async () => {
    if (formData?._id) {
      axios.put('/api/article?type=drafts', formData)
    } else {
      const res = await axios.post('/api/article?type=drafts', formData)
      setFormData({ ...res.data.formData })
    }
  }

  const handlePublish = async () => {
    if (formData?._id) {
      await axios.delete(`/api/article?id=${formData._id}&type=drafts`)
    }

    await axios.post('/api/article?type=posts', formData)
  }

  const handleEdit = async () => {
    await axios.put('/api/article?type=posts', formData)
  }

  return {
    formData,
    isLoading,
    fetchData,
    handleTitleChange,
    handleDescriptionChange,
    setHashes,
    setContent,
    handleSaveDraft,
    handlePublish,
    handleEdit,
    checkValidation
  }
}

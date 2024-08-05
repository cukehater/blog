import { useCallback, useReducer, useState } from 'react'

import axios from 'axios'

import { listItemType } from '../types/types'

const initialFormData = {
  title: '',
  description: '',
  content: '',
  registerDate: '',
  hashes: []
}

export default function useWritePost() {
  const [formData, setFormData] = useState<listItemType>(initialFormData)
  const [isLoading, endLoading] = useReducer(() => false, true)

  const fetchDraft = useCallback(async (id: string) => {
    const { data } = await axios.get(`/api/draft/get?id=${id}`)
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

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content })
  }

  const setHashes = (hashes: string[]) => {
    setFormData({ ...formData, hashes })
  }

  const setContent = (content: string) => {
    setFormData({ ...formData, content })
  }

  const handleSaveDraft = async () => {
    if (formData?._id) {
      axios.put('/api/draft/update', formData)
    } else {
      const res = await axios.post('/api/draft/create', formData)
      setFormData({ ...res.data.formData })
    }
  }
  return {
    formData,
    isLoading,
    fetchDraft,
    handleTitleChange,
    handleDescriptionChange,
    handleContentChange,
    setHashes,
    setContent,
    handleSaveDraft
  }
}

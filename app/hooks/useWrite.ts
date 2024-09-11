import { useState } from 'react'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'

import type { ListItemType } from '../types/types.ts'

export default function useWritePost(initialFormData: ListItemType) {
  const [formData, setFormData] = useState<ListItemType>(initialFormData)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDraft = searchParams.get('draft') === 'true'

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
    if (!searchParams.get('id')) {
      const { data } = await axios.post('/api/article?type=drafts', formData)
      router.push(`/write?id=${data.insertedId}&draft=true`)
    } else {
      await axios.put(
        `/api/article?type=${isDraft ? `drafts` : 'posts'}`,
        formData
      )
    }
  }

  const handlePublish = async () => {
    if (isDraft) {
      await axios.delete(
        `/api/article?id=${searchParams.get('id')}&type=drafts`
      )
    }
    const { _id: id, ...body } = formData
    await axios.post('/api/article?type=posts', body)
  }

  return {
    formData,
    handleTitleChange,
    handleDescriptionChange,
    handleHashesChange,
    handleContentChange,
    handleSave,
    handlePublish
  }
}

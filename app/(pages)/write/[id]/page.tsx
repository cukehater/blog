'use client'

import { useEffect } from 'react'

import Write from '@/app/features/write/Write'
import useWritePost from '@/app/hooks/useWritePost'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const {
    formData,
    isLoading,
    fetchDraft,
    handleTitleChange,
    handleDescriptionChange,
    setHashes,
    setContent,
    handleSaveDraft,
    handlePublish
  } = useWritePost()

  useEffect(() => {
    fetchDraft(id)
  }, [fetchDraft, id])

  if (isLoading) return <main></main>

  return (
    <Write
      formData={formData}
      handleTitleChange={handleTitleChange}
      handleDescriptionChange={handleDescriptionChange}
      setHashes={setHashes}
      setContent={setContent}
      handleSaveDraft={handleSaveDraft}
      handlePublish={handlePublish}
    />
  )
}

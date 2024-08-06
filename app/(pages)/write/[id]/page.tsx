'use client'

import { useEffect } from 'react'

import Write from '@/app/features/write/Write'
import useWritePost from '@/app/hooks/useWritePost'
import Loading from '@/app/loading'
import { useSearchParams } from 'next/navigation'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const searchParams = useSearchParams()
  const isEdit = Boolean(searchParams.get('edit'))

  const {
    formData,
    isLoading,
    fetchData,
    handleTitleChange,
    handleDescriptionChange,
    setHashes,
    setContent,
    handleSaveDraft,
    handlePublish,
    handleEdit
  } = useWritePost()

  useEffect(() => {
    fetchData(isEdit, id)
  }, [fetchData, id])

  if (isLoading) return <Loading />

  return (
    <Write
      formData={formData}
      handleTitleChange={handleTitleChange}
      handleDescriptionChange={handleDescriptionChange}
      setHashes={setHashes}
      setContent={setContent}
      handleSaveDraft={handleSaveDraft}
      handlePublish={handlePublish}
      handleEdit={handleEdit}
      isEdit={isEdit}
    />
  )
}

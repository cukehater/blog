'use client'

import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import WriteContainer from '../components/WriteContainer.tsx'

import useWritePost from '@/app/hooks/useWritePost.ts'

import Loading from '@/app/loading.tsx'

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
  }, [fetchData, id, isEdit])

  if (isLoading) return <Loading />

  return (
    <WriteContainer
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

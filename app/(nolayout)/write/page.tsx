'use client'

import WriteContainer from './components/WriteContainer.tsx'

import useWritePost from '@/app/hooks/useWritePost.ts'

export default function Page() {
  const {
    formData,
    handleTitleChange,
    handleDescriptionChange,
    setHashes,
    setContent,
    handleSaveDraft,
    handlePublish,
    handleEdit
  } = useWritePost()

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
      isEdit={false}
    />
  )
}

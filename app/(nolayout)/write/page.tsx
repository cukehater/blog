'use client'

import Write from '@/app/features/write/Write.tsx'
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
    handleEdit,
    checkValidation
  } = useWritePost()

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
      checkValidation={checkValidation}
      isEdit={false}
    />
  )
}

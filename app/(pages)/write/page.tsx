'use client'

import Write from '@/app/features/write/Write'
import useWritePost from '@/app/hooks/useWritePost'

export default function Page() {
  const {
    formData,
    handleTitleChange,
    handleContentChange,
    setHashes,
    setContent,
    handleSaveDraft,
    handleDescriptionChange
  } = useWritePost()

  return (
    <Write
      formData={formData}
      handleTitleChange={handleTitleChange}
      handleContentChange={handleContentChange}
      handleDescriptionChange={handleDescriptionChange}
      setHashes={setHashes}
      setContent={setContent}
      handleSaveDraft={handleSaveDraft}
    />
  )
}

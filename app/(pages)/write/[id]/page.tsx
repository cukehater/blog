'use client'

import { useEffect } from 'react'

import Editor from '@/app/features/MarkDownEditor'
import Hashes from '@/app/features/write/Hashes'
import Title from '@/app/features/write/Title'
import TopNav from '@/app/features/write/TopNav'
import useWritePost from '@/app/hooks/useWritePost'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const {
    formData,
    isLoading,
    handleTitleChange,
    handleContentChange,
    setHashes,
    setContent,
    handleSaveDraft,
    fetchDraft
  } = useWritePost()

  useEffect(() => {
    fetchDraft(id)
  }, [fetchDraft, id])

  if (isLoading) return <main></main>

  return (
    <main className='flex flex-col min-h-screen mt-0'>
      <TopNav handleSaveDraft={handleSaveDraft} />

      <section className='py-8 px-4'>
        <Title value={formData.title} handleTitleChange={handleTitleChange} />
        <Hashes setHashes={setHashes} hashes={formData.hashes} />
      </section>

      <Editor
        handleContentChange={handleContentChange}
        formData={formData}
        setContent={setContent}
        handleSaveDraft={handleSaveDraft}
      />
    </main>
  )
}

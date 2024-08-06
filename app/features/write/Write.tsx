'use client'

import useSaveCommand from '@/app/hooks/useSaveCommand'
import Snackbar from '@/app/shared/components/Snackbar'
import { listItemType } from '@/app/types/types'

import Description from './Description'
import Hashes from './Hashes'
import MarkDownEditor from './MarkDownEditor'
import Title from './Title'
import TopNav from './TopNav'

interface WriteProps {
  formData: listItemType
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  setHashes: (hashes: string[]) => void
  setContent: (content: string) => void
  handleSaveDraft: (formData?: listItemType) => void
  handlePublish: () => void
}

export default function Write({
  formData,
  handleTitleChange,
  setHashes,
  setContent,
  handleDescriptionChange,
  handleSaveDraft,
  handlePublish
}: WriteProps) {
  const { showSnackbar } = useSaveCommand(handleSaveDraft, formData)

  return (
    <main className='flex flex-col min-h-screen mt-0'>
      <TopNav handleSaveDraft={handleSaveDraft} handlePublish={handlePublish} />

      <section className='py-8 px-4'>
        <Title value={formData.title} handleTitleChange={handleTitleChange} />
        <Description
          value={formData.description}
          handleDescriptionChange={handleDescriptionChange}
        />
        <Hashes setHashes={setHashes} hashes={formData.hashes} />
      </section>

      <MarkDownEditor formData={formData} setContent={setContent} />

      {showSnackbar && (
        <Snackbar message='저장이 완료되었습니다' type='success' />
      )}
    </main>
  )
}

import { listItemType } from '@/app/types/types'

import Hashes from './Hashes'
import Title from './Title'
import TopNav from './TopNav'
import MarkDownEditor from '../MarkDownEditor'

interface WriteProps {
  formData: listItemType
  handleSaveDraft: () => void
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleContentChange: (content: string) => void
  setHashes: (hashes: string[]) => void
  setContent: (content: string) => void
}

export default function Write({
  formData,
  handleSaveDraft,
  handleTitleChange,
  handleContentChange,
  setHashes,
  setContent
}: WriteProps) {
  return (
    <main className='flex flex-col min-h-screen mt-0'>
      <TopNav handleSaveDraft={handleSaveDraft} />

      <section className='py-8 px-4'>
        <Title value={formData.title} handleTitleChange={handleTitleChange} />
        <Hashes setHashes={setHashes} hashes={formData.hashes} />
      </section>

      <MarkDownEditor
        handleContentChange={handleContentChange}
        formData={formData}
        setContent={setContent}
        handleSaveDraft={handleSaveDraft}
      />
    </main>
  )
}

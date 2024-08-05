import { listItemType } from '@/app/types/types'

import Hashes from './Hashes'
import Title from './Title'
import TopNav from './TopNav'
import MarkDownEditor from './MarkDownEditor'
import Description from './Description'

interface WriteProps {
  formData: listItemType
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleContentChange: (content: string) => void
  setHashes: (hashes: string[]) => void
  setContent: (content: string) => void
  handleSaveDraft: () => void
  handlePublish: () => void
}

export default function Write({
  formData,
  handleTitleChange,
  handleContentChange,
  setHashes,
  setContent,
  handleDescriptionChange,
  handleSaveDraft,
  handlePublish
}: WriteProps) {
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

      <MarkDownEditor
        handleContentChange={handleContentChange}
        formData={formData}
        setContent={setContent}
        handleSaveDraft={handleSaveDraft}
      />
    </main>
  )
}

'use client'

import useSaveCommand from '@/app/hooks/useSaveCommand.ts'
import Snackbar from '@/app/shared/components/Snackbar.tsx'
import { ListItemType } from '@/app/types/types.ts'

import Description from './Description.tsx'
import Hashes from './Hashes.tsx'
import MarkDownEditor from './MarkDownEditor.tsx'
import Title from './Title.tsx'
import TopNav from './TopNav.tsx'

interface WriteProps {
  formData: ListItemType
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  setHashes: (hashes: string[]) => void
  setContent: (content: string) => void
  handleSaveDraft: (formData?: ListItemType) => void
  handlePublish: () => void
  handleEdit: () => void
  checkValidation: () => boolean
  isEdit: boolean
}

export default function Write({
  formData,
  handleTitleChange,
  setHashes,
  setContent,
  handleDescriptionChange,
  handleSaveDraft,
  handlePublish,
  handleEdit,
  isEdit,
  checkValidation
}: WriteProps) {
  const { showSnackbar } = useSaveCommand(
    handleSaveDraft,
    handleEdit,
    formData,
    isEdit
  )

  return (
    <main className="flex flex-col min-h-screen mt-0">
      <TopNav
        handleSaveDraft={handleSaveDraft}
        handlePublish={handlePublish}
        handleEdit={handleEdit}
        isEdit={isEdit}
        checkValidation={checkValidation}
      />

      <section className="py-8 px-4">
        <Title value={formData.title} handleTitleChange={handleTitleChange} />
        <Description
          value={formData.description}
          handleDescriptionChange={handleDescriptionChange}
        />
        <Hashes setHashes={setHashes} hashes={formData.hashes} />
      </section>

      <MarkDownEditor formData={formData} setContent={setContent} />

      {showSnackbar && (
        <Snackbar message="저장이 완료되었습니다" type="success" />
      )}
    </main>
  )
}

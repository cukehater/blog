'use client'

import useWrite from '@/app/hooks/useWrite.ts'
import useWriteSave from '@/app/hooks/useWriteSave.ts'

import Description from './Description.tsx'
import Hashes from './Hashes.tsx'
import MarkDownEditor from './MarkDownEditor.tsx'
import Title from './Title.tsx'
import TopNav from './TopNav.tsx'

import Snackbar from '@/app/components/shared/components/Snackbar.tsx'

import type { ListItemType } from '@/app/types/types.ts'

interface Props {
  formData: ListItemType
}

export default function WriteContainer({ formData: initialFormData }: Props) {
  const {
    formData,
    handleTitleChange,
    handleDescriptionChange,
    handleHashesChange,
    handleContentChange,
    handleSave,
    handlePublish
  } = useWrite(initialFormData)

  const { showSnackbar } = useWriteSave(handleSave)

  return (
    <main className="flex flex-col min-h-screen mt-0">
      <TopNav handleSave={handleSave} handlePublish={handlePublish} />

      <section className="py-8 px-4">
        <Title value={formData.title} handleTitleChange={handleTitleChange} />
        <Description
          value={formData.description}
          handleDescriptionChange={handleDescriptionChange}
        />
        <Hashes
          handleHashesChange={handleHashesChange}
          hashes={formData.hashes}
        />
      </section>

      <MarkDownEditor
        formData={formData}
        handleContentChange={handleContentChange}
      />

      {showSnackbar && (
        <Snackbar message="저장이 완료되었습니다" type="success" />
      )}
    </main>
  )
}

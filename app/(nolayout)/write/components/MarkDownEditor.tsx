'use client'

import axios from 'axios'
import { MdEditor } from 'md-editor-rt'

import useCallSnackbar from '@/app/hooks/useCallSnackbar.ts'

import Snackbar from '@/app/components/shared/components/Snackbar.tsx'

import uploadToS3 from '@/app/utils/uploadToS3.ts'

import type { ListItemType } from '@/app/types/types.ts'

import 'md-editor-rt/lib/style.css'

export default function MarkDownEditor({
  formData,
  handleContentChange,
  handleSave
}: {
  formData: ListItemType
  handleContentChange: (content: string) => void
  handleSave: () => void
}) {
  const { showSnackbar, displaySnackbar } = useCallSnackbar()

  return (
    <>
      <MdEditor
        language="en-US"
        className="flex-1 custom-preview"
        modelValue={formData.content}
        onChange={handleContentChange}
        onSave={() => {
          handleSave()
          displaySnackbar()
        }}
        onUploadImg={async (
          files: File[],
          callback: (urls: string[]) => void
        ) => {
          const uploadPromises = files.map(async (file) => {
            const { data } = await axios.get(
              `/api/upload?file=${file.name}&dir=posts`
            )
            return uploadToS3(data, file.name, file, 'posts/')
          })
          const uploadedUrls = await Promise.all(uploadPromises)
          callback(uploadedUrls)
        }}
        theme={
          typeof window !== 'undefined' && document.cookie.includes('dark')
            ? 'dark'
            : 'light'
        }
        footers={['markdownTotal']}
      />

      {showSnackbar && (
        <Snackbar message="저장이 완료되었습니다" type="success" />
      )}
    </>
  )
}

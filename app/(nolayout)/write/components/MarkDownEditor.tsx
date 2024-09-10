'use client'

import axios from 'axios'
import { MdEditor } from 'md-editor-rt'

import uploadToS3 from '@/app/utils/uploadToS3.ts'

import type { ListItemType } from '@/app/types/types.ts'

import 'md-editor-rt/lib/style.css'

export default function MarkDownEditor({
  formData,
  handleContentChange
}: {
  formData: ListItemType
  handleContentChange: (content: string) => void
}) {
  return (
    <MdEditor
      language="en-US"
      className="flex-1 custom-preview"
      modelValue={formData.content}
      onChange={handleContentChange}
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
  )
}

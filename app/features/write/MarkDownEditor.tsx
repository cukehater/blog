'use client'

import React from 'react'

import axios from 'axios'
import { MdEditor } from 'md-editor-rt'

import 'md-editor-rt/lib/style.css'
import uploadToS3 from '@/app/shared/utils/uploadToS3'
import { ListItemType } from '@/app/types/types.ts'

export default function MarkDownEditor({
  formData,
  setContent
}: {
  formData: ListItemType
  setContent: (content: string) => void
}) {
  return (
    <MdEditor
      language="en-US"
      className="flex-1 custom-preview"
      modelValue={formData.content}
      onChange={setContent}
      onUploadImg={async (
        files: File[],
        callback: (urls: string[]) => void
      ) => {
        const uploadedUrls = []
        for (const file of files) {
          const { data } = await axios.get(
            `/api/upload/image?file=${file.name}&dir=posts`
          )
          const fileSrc = await uploadToS3(data, file.name, file, 'posts/')
          uploadedUrls.push(fileSrc)
        }
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

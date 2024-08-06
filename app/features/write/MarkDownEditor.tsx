'use client'

import React from 'react'

import { MdEditor } from 'md-editor-rt'

import 'md-editor-rt/lib/style.css'
import { listItemType } from '@/app/types/types'

export default function MarkDownEditor({
  formData,
  setContent
}: {
  formData: listItemType
  setContent: (content: string) => void
}) {
  return (
    <MdEditor
      language='en-US'
      className='flex-1 custom-preview'
      modelValue={formData.content}
      onChange={setContent}
      theme='dark'
    />
  )
}

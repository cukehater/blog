'use client'

import React, { useEffect, useState } from 'react'

import { MdEditor } from 'md-editor-rt'

import 'md-editor-rt/lib/style.css'
import { listItemType } from '@/app/types/types'
import useCallSnackbar from '@/app/hooks/useCallSnackbar'
import Snackbar from '@/app/shared/components/Snackbar'

export default function MarkDownEditor({
  formData,
  handleContentChange,
  handleSaveDraft,
  setContent
}: {
  formData: listItemType
  handleContentChange: (content: string) => void
  handleSaveDraft: (formData: listItemType) => void
  setContent: (content: string) => void
}) {
  const { showSnackbar, setShowSnackbar } = useCallSnackbar()

  useEffect(() => {
    handleContentChange(formData.content)
  }, [formData.content])

  return (
    <>
      <MdEditor
        language='en-US'
        className='flex-1 custom-preview'
        modelValue={formData.content}
        onChange={setContent}
        onSave={() => {
          handleSaveDraft(formData)
          setShowSnackbar(true)
        }}
        theme='dark'
      />

      {showSnackbar && (
        <Snackbar message='저장이 완료되었습니다' type='success' />
      )}
    </>
  )
}

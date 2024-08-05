'use client'

import React from 'react'

import { MdEditor } from 'md-editor-rt'

import 'md-editor-rt/lib/style.css'
import useCallSnackbar from '@/app/hooks/useCallSnackbar'
import Snackbar from '@/app/shared/components/Snackbar'
import { listItemType } from '@/app/types/types'

export default function MarkDownEditor({
  formData,
  handleSaveDraft,
  setContent
}: {
  formData: listItemType
  handleSaveDraft: (formData: listItemType) => void
  setContent: (content: string) => void
}) {
  const { showSnackbar, setShowSnackbar } = useCallSnackbar()

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

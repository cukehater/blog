'use client'

import React, { useEffect, useState } from 'react'

import { MdEditor } from 'md-editor-rt'

import 'md-editor-rt/lib/style.css'
import useCallSnackbar from '../hooks/useCallSnackbar'
import Snackbar from '../shared/components/Snackbar'
import { listItemType } from '../types/types'

export default function MarkDownEditor({
  formData,
  handleContentChange,
  handleSaveDraft
}: {
  formData: listItemType
  handleContentChange: (content: string) => void
  handleSaveDraft: (formData: listItemType) => void
}) {
  const [value, setValue] = useState<string>('')
  const { showSnackbar, setShowSnackbar } = useCallSnackbar()

  useEffect(() => {
    handleContentChange(value)
  }, [value])

  return (
    <>
      <MdEditor
        language='en-US'
        className='flex-1 custom-preview'
        modelValue={value}
        onChange={setValue}
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

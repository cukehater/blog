'use client'

import React, { useEffect, useState } from 'react'

import { MdEditor } from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'

export default function MarkDownEditor({
  handleContentChange
}: {
  handleContentChange: (content: string) => void
}) {
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    handleContentChange(value)
  }, [value])

  return (
    <MdEditor
      modelValue={value}
      onChange={setValue}
      language='en-US'
      className='flex-1 custom-preview'
      theme='dark'
    />
  )
}

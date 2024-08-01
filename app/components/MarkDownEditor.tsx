'use client'

import React, { useState } from 'react'
import { MdEditor } from 'md-editor-rt'

export default function MarkDownEditor() {
  const [text, setText] = useState<any>()

  return (
    <MdEditor
      modelValue={text}
      onChange={setText}
      language='en-US'
      className='flex-1'
      theme='dark'
    />
  )
}

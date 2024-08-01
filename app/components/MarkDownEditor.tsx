'use client'

import React, { useState } from 'react'
import { MdEditor } from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'

export default function MarkDownEditor() {
  const [text, setText] = useState<any>()

  return (
    <MdEditor
      modelValue={text}
      onChange={setText}
      language='en-US'
      className='flex-1'
      // theme='dark'
    />
  )
}

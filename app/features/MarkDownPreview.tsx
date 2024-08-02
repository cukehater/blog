'use client'

import { MdPreview } from 'md-editor-rt'
import 'md-editor-rt/lib/preview.css'

export default function MarkDownPreview({ contents }: { contents: string }) {
  const id = 'preview-only'
  return (
    <>
      <MdPreview
        editorId={id}
        modelValue={contents}
        previewTheme='github'
        language='en-US'
        className='flex-1 custom-preview detail'
        theme='dark'
      />
    </>
  )
}

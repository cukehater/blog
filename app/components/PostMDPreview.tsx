'use client'

import { MdPreview } from 'md-editor-rt'
import 'md-editor-rt/lib/preview.css'
import '@/app/styles/md-editor.scss'

export default function PostMDPreview({ content }: { content: string }) {
  return (
    <section className="mb-20">
      <MdPreview
        editorId="preview-only"
        modelValue={content}
        previewTheme="github"
        language="en-US"
        className="flex-1 custom-preview detail"
        theme="dark"
      />
    </section>
  )
}

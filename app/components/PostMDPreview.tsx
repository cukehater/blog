'use client'

import { useRef } from 'react'

import { MdPreview } from 'md-editor-rt'

import 'md-editor-rt/lib/preview.css'
import '@/app/styles/md-editor.scss'
import TableOfContents from './TableOfContents'

export default function PostMDPreview({ content }: { content: string }) {
  const previewRef = useRef<HTMLDivElement>(null)
  const mdHeadingId = (_text: string, _level: number, index: number) =>
    `heading-${index}`

  return (
    <section ref={previewRef} className="mb-32">
      <MdPreview
        editorId="preview-only"
        modelValue={content}
        previewTheme="github"
        language="en-US"
        className="flex-1 custom-preview detail"
        mdHeadingId={mdHeadingId}
        theme="dark"
      />

      <TableOfContents previewRef={previewRef} content={content} />
    </section>
  )
}

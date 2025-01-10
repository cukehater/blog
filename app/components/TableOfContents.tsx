'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents({
  previewRef,
  content
}: {
  previewRef: React.RefObject<HTMLDivElement>
  content: string
}) {
  const [toc, setToc] = useState<TocItem[]>([])

  const handleClick = (id: string) => {
    if (typeof document === 'undefined') return

    const heading = previewRef.current?.querySelector(`#${id}`)

    if (!heading) return

    const elementPosition = heading.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - 80

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const headings = content.match(/#{1,6}.+/g) || []
    const tocItems = headings.map((heading, index) => {
      const level = heading.match(/^#+/)?.[0].length || 0
      const text = heading.replace(/^#+\s*/, '')
      const id = `heading-${index + 1}`
      return { id, text, level }
    })
    setToc(tocItems)
  }, [content])

  return (
    <nav className="fixed right-[calc(50vw-42rem)] w-60 border-l-2 border-[--tertiary-color] pl-4 top-44 hidden lg:block max-h-[calc(100vh-12rem)] overflow-y-auto">
      <ul className="space-y-1.5">
        {toc.map((item) => (
          <li
            key={item.id}
            className="list-none"
            style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
          >
            <button
              type="button"
              onClick={() => handleClick(item.id)}
              className="hover:text-[--accent-color-hover] transition-colors text-left break-word"
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

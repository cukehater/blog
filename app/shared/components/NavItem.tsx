import React from 'react'

export default function NavItem({ content }: { content: string }) {
  return (
    <div className='hover:bg-[var(--button-background-color)] px-3 py-1 rounded-full text-[var(--button-text)] hover:text-[var(--accent-color)] transition-all'>
      {content}
    </div>
  )
}

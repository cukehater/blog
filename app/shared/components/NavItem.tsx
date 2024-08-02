import React from 'react'

export default function NavItem({ content }: { content: string }) {
  return (
    <div className='hover:bg-[var(--button-bg)] px-3 py-1 rounded-full text-[var(--button-text)] hover:text-[var(--brand-color)] transition-all'>
      {content}
    </div>
  )
}

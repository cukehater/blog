'use client'

import { useEffect, useState } from 'react'
import { LightSvg } from '../shared/components/svg/LightSvg'
import { DarkSvg } from '../shared/components/svg/DarkSvg'
import { useRouter } from 'next/navigation'

export default function DarkModeToggle() {
  const router = useRouter()
  useEffect(() => {
    const mode =
      document.cookie
        .split('; ')
        .find(row => row.startsWith('mode='))
        ?.split('=')[1] || ''

    if (mode === '') {
      document.cookie = `mode=dark; max-age=${3600 * 24 * 365};`
      router.refresh()
    }
  }, [])

  return (
    <button
      type='button'
      className='bg-[var(--button-background-color)] rounded-md p-1 ml-2 hover:bg-[var(--border-color)]'
      onClick={() => {
        const mode =
          document.cookie
            .split('; ')
            .find(row => row.startsWith('mode='))
            ?.split('=')[1] || ''

        document.cookie = `mode=${
          mode === 'dark' ? 'light' : 'dark'
        }; max-age=${3600 * 24 * 365};`
        router.refresh()
      }}
    >
      <div className='w-7 h-7 hover:rotate-45 transition-transform duration-300 flex items-center justify-center'>
        {document.cookie.includes('mode=light') ? <DarkSvg /> : <LightSvg />}
      </div>
    </button>
  )
}

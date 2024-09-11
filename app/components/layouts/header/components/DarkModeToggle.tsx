'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import DarkSvg from '@/app/components/shared/components/svg/DarkSvg.tsx'
import LightSvg from '@/app/components/shared/components/svg/LightSvg.tsx'

export default function DarkModeToggle() {
  const router = useRouter()
  useEffect(() => {
    const mode =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('mode='))
        ?.split('=')[1] || ''

    if (mode === '') {
      document.cookie = `mode=dark; max-age=${3600 * 24 * 365};`
      router.refresh()
    }
  }, [router])

  return (
    <button
      type="button"
      className="bg-[var(--button-background-color)] rounded-md p-1 ml-2 hover:bg-[var(--border-color)]"
      onClick={() => {
        const mode =
          document.cookie
            .split('; ')
            .find((row) => row.startsWith('mode='))
            ?.split('=')[1] || ''

        document.cookie = `mode=${
          mode === 'dark' ? 'light' : 'dark'
        }; max-age=${3600 * 24 * 365};`
        router.refresh()
      }}
    >
      <div className="w-7 h-7 hover:rotate-45 transition-transform duration-300 flex items-center justify-center">
        {typeof window !== 'undefined' &&
        document.cookie.includes('mode=light') ? (
          <DarkSvg />
        ) : (
          <LightSvg />
        )}
      </div>
    </button>
  )
}

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { v4 as uuid } from 'uuid'

export default function SideNav({
  hashes
}: {
  hashes: { name: string; count: number }[]
}) {
  const router = useRouter()
  const search = useSearchParams().get('search') || false

  return (
    <aside className="w-[200px] absolute -left-[250px] top-0 flex flex-col gap-2">
      {hashes.map(({ name, count }) => {
        return (
          <button
            type="button"
            key={uuid()}
            className={`hover:text-[var(--accent-color)] transition-all ease duration-300 ${search === name ? 'text-[var(--accent-color)]' : ''}`}
            onClick={() => {
              router.push(`?search=${name}`)
            }}
          >
            {name} ({count})
          </button>
        )
      })}
    </aside>
  )
}

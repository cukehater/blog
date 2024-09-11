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
  const activeHash = (name: string) => {
    return search === name ? 'text-[var(--accent-color)]' : ''
  }
  return (
    <aside
      className="sm:w-[200px] w-auto -left-[250px] top-0 flex gap-2 sm:absolute static sm:overflow-x-hidden overflow-x-scroll flex-row sm:flex-col"
      style={{ scrollbarWidth: 'none' }}
    >
      {hashes.map(({ name, count }) => {
        return (
          <button
            type="button"
            key={uuid()}
            className="flex w-auto group text-lg sm:text-base font-bold sm:font-normal"
            onClick={() => {
              router.push(`?search=${name}`)
            }}
          >
            <p
              className={`${activeHash(name)} group-hover:text-[var(--accent-color)] transition-all ease duration-300`}
            >
              {name}
            </p>
            <p
              className={`${activeHash(name)} group-hover:text-[var(--accent-color)] transition-all ease duration-300`}
            >
              ({count})
            </p>
          </button>
        )
      })}
    </aside>
  )
}

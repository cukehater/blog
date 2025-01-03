'use client'

import { useRouter } from 'next/navigation'

type Props = {
  name: string
  isActive?: boolean
  onRemoveCategory?: (category: string) => void
}

export default function CategoryButton({
  name,
  isActive = false,
  onRemoveCategory
}: Props) {
  const router = useRouter()

  return (
    <button
      className={`rounded-full px-4 py-2
        ${
          isActive
            ? 'bg-[--accent-color] hover:bg-[--accent-color-hover]'
            : 'bg-[--secondary-color] hover:bg-[--tertiary-color]'
        }`}
      onClick={() => {
        if (onRemoveCategory) {
          onRemoveCategory(name)
        } else {
          router.push(`/?searchs=${name}`)
        }
      }}
    >
      <p
        className={`text-sm ${
          isActive
            ? 'text-[--primary-color] font-medium'
            : 'text-[--accent-color]'
        }`}
      >
        {name}
      </p>
    </button>
  )
}

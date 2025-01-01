'use client'

type Props = {
  name: string
  onRemoveCategory?: (category: string) => void
}

export default function CategoryButton({ name, onRemoveCategory }: Props) {
  return (
    <button
      className="rounded-full px-4 py-2 bg-[--secondary-color] hover:bg-[--tertiary-color]"
      onClick={() => onRemoveCategory?.(name)}
    >
      <p className="text-sm text-[--accent-color]">{name}</p>
    </button>
  )
}

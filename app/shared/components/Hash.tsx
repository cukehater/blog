export default function Hash({
  hash,
  onRemove,
  isPointer = false
}: {
  hash: string
  onRemove?: () => void
  isPointer?: boolean
}) {
  return (
    <div
      className={`relative py-1 px-4 bg-[var(--button-background-color)] bg-opacity-30 text-[var(--accent-color)] rounded-full ${
        isPointer ? 'cursor-pointer hover:bg-[var(--border-color)]' : ''
      }`}
      onClick={onRemove}
    >
      {hash}
    </div>
  )
}

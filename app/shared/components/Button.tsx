interface Props {
  text: string | React.ReactNode
  type?: keyof typeof styleData
  className?: string
  onClick?: () => void
}

export default function Button({
  text,
  type = 'primary',
  className,
  onClick
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styleData[type]} flex items-center gap-2 px-4 py-2 rounded-md font-medium text-lg ${className}`}
    >
      {text}
    </button>
  )
}

const styleData = {
  primary: 'hover:bg-[var(--button-background-color)]',
  secondary:
    'text-[var(--accent-color)] hover:bg-[var(--button-background-color)]',
  tertiary:
    'text-[var(--background-color)] bg-[var(--accent-color)] opacity-90 hover:opacity-100'
}

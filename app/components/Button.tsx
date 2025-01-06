type Props = {
  highlight?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type: 'button' | 'submit'
}

export default function Button({
  highlight,
  className = '',
  onClick,
  type,
  children
}: Props) {
  const highlightStyles = highlight
    ? 'bg-[--accent-color] hover:bg-[--accent-color-hover] text-[--secondary-color] font-bold'
    : 'bg-[--secondary-color] hover:bg-[--tertiary-color] hover:text-[--accent-color] font-normal'

  return (
    <button
      type={type}
      className={`
        ${highlightStyles}
        px-4 py-2 rounded-md transition-colors duration-300 text-sm
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

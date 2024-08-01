interface Props {
  text: string | React.ReactNode
  type?: keyof typeof styleData
}

export default function Button({ text, type = 'primary' }: Props) {
  return (
    <button
      className={`${styleData[type]} flex items-center gap-2 px-4 py-2 rounded-md font-medium text-lg`}
    >
      {text}
    </button>
  )
}

const styleData = {
  primary: 'text-[var(--color-primary)] hover:bg-[var(--bg-primary-hover)]',
  secondary: 'text-[var(--brand-color)] hover:bg-[var(--bg-primary-hover)]',
  tertiary:
    'text-[var(--color-secondary)] bg-[var(--brand-color)] opacity-90 hover:opacity-100'
}

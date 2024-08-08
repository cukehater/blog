export default function Input({
  id,
  value,
  onChange
}: {
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      id={id}
      type='text'
      className='h-12 pl-4 bg-[var(--button-background-color)] rounded-md'
      defaultValue={value}
      onChange={onChange}
    />
  )
}

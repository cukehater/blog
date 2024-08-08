export default function Textarea({
  id,
  value,
  onChange
}: {
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <textarea
      id={id}
      className='flex-1 py-2 px-4 bg-[var(--button-background-color)] rounded-md'
      defaultValue={value}
      onChange={onChange}
    />
  )
}

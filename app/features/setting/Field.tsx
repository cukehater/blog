import Input from './Input.tsx'
import Textarea from './Textarea.tsx'

export default function Field({
  id,
  title,
  value,
  isTextarea,
  onChange
}: {
  id: string
  title: string
  value: string
  isTextarea: boolean
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}) {
  return (
    <li className="flex flex-col py-6 border-b last:border-none border-[var(--border-color)]">
      <label htmlFor={id} className="cursor-pointer mb-2">
        {title}
      </label>

      {isTextarea ? (
        <Textarea id={id} value={value} onChange={onChange} />
      ) : (
        <Input id={id} value={value} onChange={onChange} />
      )}
    </li>
  )
}

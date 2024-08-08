import Input from './Input'
import Textarea from './Textarea'

export default function Field({
  title,
  value,
  isTextarea
}: {
  title: string
  value: string
  isTextarea?: boolean
}) {
  return (
    <li className='flex py-6 border-b last:border-none border-[var(--border-color)] items-center'>
      <label htmlFor='' className='w-44 text-lg'>
        {title}
      </label>
      {isTextarea ? <Textarea value={value} /> : <Input value={value} />}
    </li>
  )
}

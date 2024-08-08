import Button from '@/app/shared/components/Button'
import Input from './Input'
import Textarea from './Textarea'

export default function Field({
  id,
  title,
  value,
  isTextarea
}: {
  id: string
  title: string
  value: string
  isTextarea?: boolean
}) {
  return (
    <li className='flex flex-col py-6 border-b last:border-none border-[var(--border-color)]'>
      <label htmlFor={id} className='cursor-pointer mb-2'>
        {title}
      </label>

      {isTextarea ? (
        <Textarea id={id} value={value} />
      ) : (
        <Input id={id} value={value} />
      )}
    </li>
  )
}

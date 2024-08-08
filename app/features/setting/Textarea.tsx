export default function Textarea({ value }: { value: string }) {
  return (
    <textarea
      className='flex-1 p-4 text-lg bg-[var(--button-background-color)] rounded-md'
      defaultValue={value}
    />
  )
}

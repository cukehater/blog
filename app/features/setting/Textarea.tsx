export default function Textarea({ id, value }: { id: string; value: string }) {
  return (
    <textarea
      id={id}
      className='flex-1 py-2 px-4 bg-[var(--button-background-color)] rounded-md'
      defaultValue={value}
    />
  )
}

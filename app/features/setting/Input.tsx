export default function Input({ value }: { value: string }) {
  return (
    <input
      type='text'
      className='flex-1 h-12 pl-4 text-lg bg-[var(--button-background-color)] rounded-md'
      defaultValue={value}
    />
  )
}

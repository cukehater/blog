export default function Input({ id, value }: { id: string; value: string }) {
  return (
    <input
      id={id}
      type='text'
      className='h-12 pl-4 bg-[var(--button-background-color)] rounded-md'
      defaultValue={value}
    />
  )
}

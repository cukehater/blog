export default function Hash({ hash }: { hash: string }) {
  return (
    <div className='py-1 px-4 bg-[var(--button-background-color)] bg-opacity-30 text-[var(--accent-color)] rounded-full'>
      {hash}
    </div>
  )
}

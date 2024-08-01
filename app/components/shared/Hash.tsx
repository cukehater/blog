export default function Hash({ hash }: { hash: string }) {
  return (
    <div className='py-1 px-4 bg-[var(--button-bg)] bg-opacity-30 text-[var(--brand-color)] rounded-full'>
      {hash}
    </div>
  )
}

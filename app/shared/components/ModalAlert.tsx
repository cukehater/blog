import Button from './Button'

export default function ModalAlert({
  title,
  description,
  buttonText,
  onClick
}: {
  title?: string
  description: string
  buttonText: string
  onClick: () => void
}) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]'>
      <div className='w-96 bg-[var(--border-color)] py-8 px-6 rounded-xl'>
        <h2 className='text-2xl font-bold mb-2'>{title}</h2>
        <p>{description}</p>

        <div className='flex justify-end gap-2 mt-10'>
          <Button
            text={buttonText}
            type='tertiary'
            className='text-sm'
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  )
}

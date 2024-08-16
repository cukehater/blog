import Button from './Button.tsx'

export default function ModalConfirm({
  title,
  description = '',
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}: {
  title: string
  description?: string
  confirmText: string
  cancelText: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="w-96 bg-[var(--border-color)] py-8 px-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p>{description}</p>

        <div className="flex justify-end gap-2 mt-10">
          <Button
            text={confirmText}
            type="tertiary"
            className="text-sm"
            onClick={onConfirm}
          />
          <Button
            text={cancelText}
            type="secondary"
            className="text-sm"
            onClick={onCancel}
          />
        </div>
      </div>
    </div>
  )
}

'use client'

import Button from './Button'

type Props = {
  title: string
  confirmText: string
  cancelText: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ModalConfirm({
  title,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] backdrop-blur-sm">
      <div className="w-96 bg-[var(--tertiary-color)] py-8 px-6 rounded-xl">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="flex justify-end gap-2 mt-10">
          <Button highlight type="button" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button type="button" onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  )
}

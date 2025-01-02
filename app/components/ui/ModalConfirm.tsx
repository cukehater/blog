'use client'

import { useState } from 'react'
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
  const [isConfirmClicked, setIsConfirmClicked] = useState(false)
  const handleConfirm = () => {
    if (isConfirmClicked) return
    setIsConfirmClicked(true)
    onConfirm()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] backdrop-blur-sm">
      <div className="w-96 bg-[var(--tertiary-color)] py-8 px-6 rounded-xl">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="flex justify-end gap-2 mt-10">
          {/* 한번만 클릭되도록 하기 */}
          <Button highlight type="button" onClick={handleConfirm}>
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

'use client'

import { useCallback, useEffect } from 'react'

import useCallSnackbar from './useCallSnackbar.ts'

import type { ListItemType } from '../types/types.ts'

export default function useSaveCommand(
  handleSaveDraft: (formData?: ListItemType) => void,
  handleEdit: () => void,
  formData: ListItemType,
  isEdit: boolean
) {
  const { showSnackbar, setShowSnackbar } = useCallSnackbar()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        const func = isEdit ? handleEdit : handleSaveDraft

        func(formData)
        setShowSnackbar(true)
      }
    },
    [handleSaveDraft, formData, setShowSnackbar, handleEdit, isEdit]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return { showSnackbar }
}

'use client'

import { useCallback, useEffect } from 'react'

import useCallSnackbar from '@/app/hooks/useCallSnackbar.ts'

import type { ListItemType } from '../types/types.ts'

export default function useWriteSave(
  handleSave: (formData?: ListItemType) => void
) {
  const { showSnackbar, displaySnackbar } = useCallSnackbar()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        handleSave()
        displaySnackbar()
      }
    },
    [handleSave, displaySnackbar]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return { showSnackbar }
}

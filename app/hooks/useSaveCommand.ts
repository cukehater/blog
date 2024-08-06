'use client'

import { useEffect } from 'react'

import useCallSnackbar from './useCallSnackbar'
import { listItemType } from '../types/types'

export default function useSaveCommand(
  handleSaveDraft: (formData?: listItemType) => void,
  formData: listItemType
) {
  const { showSnackbar, setShowSnackbar } = useCallSnackbar()

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      handleSaveDraft(formData)
      setShowSnackbar(true)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleSaveDraft, formData, setShowSnackbar])

  return { showSnackbar }
}

'use client'

import { useState } from 'react'

export default function useCallSnackbar(afterLoad?: () => void) {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

  const displaySnackbar = () => {
    setShowSnackbar(true)
    setTimeout(() => {
      setShowSnackbar(false)
      afterLoad?.()
    }, 2000)
  }

  return { showSnackbar, displaySnackbar }
}

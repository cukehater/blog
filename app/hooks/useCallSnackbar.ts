'use client'

import { useEffect, useState } from 'react'

export default function useCallSnackbar(afterLoad?: () => void) {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(false)
      afterLoad?.()
    }, 2000)
  }, [showSnackbar, afterLoad])

  return { showSnackbar, setShowSnackbar }
}

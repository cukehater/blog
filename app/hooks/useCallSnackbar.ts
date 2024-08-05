'use client'

import { useEffect, useState } from 'react'

export default function useCallSnackbar() {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(false)
    }, 2000)
  }, [showSnackbar])

  return { showSnackbar, setShowSnackbar }
}

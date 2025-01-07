'use client'

import { useState } from 'react'

export default function useCallSnackbar(afterLoad?: () => void) {
  const [isShowSnackbar, setIsShowSnackbar] = useState(false)

  const showSnackbar = () => {
    setIsShowSnackbar(true)
    setTimeout(() => {
      setIsShowSnackbar(false)
      afterLoad?.()
    }, 2000)
  }

  return { isShowSnackbar, showSnackbar }
}

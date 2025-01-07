import { createPortal } from 'react-dom'

export default function ModalPortal({
  children
}: {
  children: React.ReactNode
}) {
  if (typeof window === 'undefined') {
    return null
  }

  const portal = document.getElementById('portal')
  return createPortal(children, portal as HTMLElement)
}

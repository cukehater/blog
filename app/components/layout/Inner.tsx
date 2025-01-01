type Props = {
  className?: string
  children: React.ReactNode
}

export default function Inner({ className = '', children }: Props) {
  return (
    <div className={`max-w-screen-md mx-auto ${className}`}>{children}</div>
  )
}

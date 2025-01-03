type Props = {
  className?: string
  children: React.ReactNode
}

export default function Inner({ className = '', children }: Props) {
  return (
    <div className={`max-w-screen-md mx-auto px-4 lg:px-0 ${className}`}>
      {children}
    </div>
  )
}

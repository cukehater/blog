export default function InnerCol({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`max-w-[1024px] mx-auto relative ${className}`}>
      {children}
    </div>
  )
}

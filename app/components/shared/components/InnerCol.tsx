export default function InnerCol({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`w-full px-6 md:w-[780px] md:px-0 mx-auto relative box-border ${className}`}
    >
      {children}
    </div>
  )
}

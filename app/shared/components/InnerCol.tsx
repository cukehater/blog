export default function InnerCol({
  children,
  className = ''
}: {
  children: React.ReactNode
  className: string
}) {
  return (
    <div className={`w-[850px] mx-auto relative ${className}`}>{children}</div>
  )
}

import Link from 'next/link'

type Props = {
  href: string
  icon: React.ReactNode
  name: string
}

export default function ProfileLink({ href, icon, name }: Props) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 [&_path]:hover:fill-[--accent-color-hover] [&_path]:transition-all [&_path]:duration-300 [&>p]:hover:text-[--accent-color-hover] [&>p]:transition-all [&>p]:duration-300"
    >
      <div className="w-4 h-4">{icon}</div>
      <p className="text-sm text-[--accent-color]">{name}</p>
    </Link>
  )
}

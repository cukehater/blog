import Image from 'next/image'

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  src: string
  alt: string
}

export default function Avatar({ size, src, alt }: Props) {
  let width
  let height

  switch (size) {
    case 'sm':
      width = 32
      height = 32
      break
    case 'md':
      width = 64
      height = 64
      break
    case 'lg':
      width = 128
      height = 128
      break
    case 'xl':
      width = 172
      height = 172
      break
    default:
      width = 48
      height = 48
  }

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className="rounded-full object-cover aspect-[1/1]"
    />
  )
}

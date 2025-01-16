type Props = {
  text: string
}

export default function EmptyPost({ text }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-neutral-200">{text}</p>
    </div>
  )
}

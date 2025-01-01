type Props = {
  text: string
}

export default function EmptyPost({ text }: Props) {
  return (
    <div className="flex items-center justify-center p-20">
      <p className="text-neutral-200">{text}</p>
    </div>
  )
}

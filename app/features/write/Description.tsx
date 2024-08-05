interface DescriptionProps {
  value: string
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Description({
  value,
  handleDescriptionChange
}: DescriptionProps) {
  return (
    <section>
      <textarea
        className='w-full h-20 py-4 bg-transparent resize-none border-t-4 border-[var(--border-color)]'
        placeholder='게시글에 대한 간략한 내용을 입력해 주세요'
        onChange={handleDescriptionChange}
        value={value}
      />
    </section>
  )
}

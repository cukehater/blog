interface TitleProps {
  value: string
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Title({ value, handleTitleChange }: TitleProps) {
  return (
    <section>
      <input
        type="text"
        className="w-full text-3xl bg-transparent mb-4 font-semibold"
        placeholder="제목을 입력해 주세요"
        onChange={handleTitleChange}
        value={value}
      />
    </section>
  )
}

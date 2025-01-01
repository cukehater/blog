type FormProps = {
  className?: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

type InputProps = {
  id: string
  type: string
  placeholder: string
  defaultValue?: string
  required?: boolean
}

type TextareaProps = Omit<InputProps, 'type'>

export default function Form({
  className = '',
  onSubmit,
  children
}: FormProps) {
  return (
    <form className={`flex flex-col gap-4 ${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

Form.Input = function FormInput({
  id,
  type,
  placeholder,
  required,
  defaultValue
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      className="h-10 pl-4 bg-[--secondary-color] rounded-md w-full"
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
    />
  )
}

Form.Textarea = function FormTextarea({
  id,
  placeholder,
  required,
  defaultValue
}: TextareaProps) {
  return (
    <textarea
      id={id}
      className="px-4 py-2 bg-[--secondary-color] rounded-md w-full"
      rows={3}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
    />
  )
}

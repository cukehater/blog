import '@/app/styles/loader.scss'

export default function Loading() {
  return (
    <div className="absolute inset-0 w-full h-full flex justify-center items-center">
      <span className="loader" />
    </div>
  )
}

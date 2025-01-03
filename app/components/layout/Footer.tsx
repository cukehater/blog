import { getNickname } from '@/app/services/profile'

export default async function Footer() {
  const data = await getNickname()

  return (
    <footer className="py-6 text-center">
      <p className="text-sm text-neutral-400">
        &copy; 2024 {data?.nickname}. All rights reserved.
      </p>
    </footer>
  )
}

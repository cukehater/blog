import { getBlogTitle } from '@/app/services/profile'

export default async function Footer() {
  const blogTitleData = await getBlogTitle()

  return (
    <footer className="py-6 text-center">
      <p className="text-sm text-neutral-400">
        &copy; 2024 {blogTitleData?.blogTitle}. All rights reserved.
      </p>
    </footer>
  )
}

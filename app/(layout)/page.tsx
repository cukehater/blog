import { v4 as uuid } from 'uuid'
import CategoryButton from '../components/ui/CategoryButton'
import PostList from '../components/PostList'
import { getAllPosts } from '../services/posts'
import { PostType } from '../models/posts'
import { getProfile } from '../services/profile'
import { ProfileType } from '../models/profile'
import EmailSvg from '../components/ui/svg/EmailSvg'
import GithubSvg from '../components/ui/svg/GithubSvg'
import PortfolioSvg from '../components/ui/svg/PortfolioSvg'
import ResumeSvg from '../components/ui/svg/ResumeSvg'
import { Suspense } from 'react'
import Avatar from '../components/ui/Avatar'
import Link from 'next/link'
import EmptyPost from '../components/EmptyPost'

export default async function Home() {
  const categories = ['All', 'Web', 'Mobile', 'AI', 'Design', 'DevOps']

  const posts = (await getAllPosts()) as PostType[]

  return (
    <>
      <Hero />

      <nav className="flex flex-wrap gap-2 mt-10">
        {Array.from({ length: 3 }).flatMap(() =>
          categories.map((category) => (
            <CategoryButton key={uuid()} name={category} />
          ))
        )}
      </nav>

      <p className="text-neutral-400 w-full mb-4 text-sm mt-10">
        <strong className="text-[--text-color]">{posts.length}</strong>
        개의 포스트
      </p>

      <section className="mt-10">
        {posts.length === 0 ? (
          <EmptyPost text="등록된 포스트가 없습니다 😢" />
        ) : (
          <PostList type="post" posts={posts} />
        )}
      </section>
    </>
  )
}

async function Hero() {
  const profileData = (await getProfile()) as unknown as ProfileType

  const {
    profileImage,
    blogTitle,
    description,
    email,
    portfolioUrl,
    githubUrl,
    resumeUrl
  } = profileData

  const nav = [
    {
      name: 'E-Mail',
      icon: <EmailSvg />,
      href: `mailto:${email}`
    },
    {
      name: 'Github',
      icon: <GithubSvg />,
      href: githubUrl
    },
    {
      name: 'Portfolio',
      icon: <PortfolioSvg />,
      href: portfolioUrl
    },
    {
      name: 'Resume',
      icon: <ResumeSvg />,
      href: resumeUrl
    }
  ]

  return (
    <Suspense fallback={<HeroSkeleton />}>
      <section className="pb-10 border-b border-[--secondary-color]">
        <div className="flex items-center gap-8">
          <Avatar size="lg" src={profileImage} alt="cukehater" />
          <div>
            <h4 className="text-3xl font-bold">{blogTitle}</h4>
            <p className="text-sm mt-4">{description}</p>
            <nav className="flex gap-3 mt-4">
              {nav.map((item) => (
                <Link
                  key={uuid()}
                  href={item.href}
                  className="flex items-center gap-1 [&_path]:hover:fill-[--accent-color-hover] [&_path]:transition-all [&_path]:duration-300 [&>p]:hover:text-[--accent-color-hover] [&>p]:transition-all [&>p]:duration-300"
                >
                  <div className="w-4 h-4">{item.icon}</div>
                  <p className="text-sm text-[--accent-color]">{item.name}</p>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </Suspense>
  )
}

function HeroSkeleton() {
  return (
    <section className="mt-20 pb-10">
      <div className="flex items-center gap-8">
        <div className="w-32 h-32 bg-[--secondary-color] rounded-full animate-pulse"></div>
        <div>
          <div className="h-6 bg-[--secondary-color] rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-[--secondary-color] rounded w-72 mt-4 animate-pulse"></div>
          <div className="h-4 bg-[--secondary-color] rounded w-48 mt-4 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

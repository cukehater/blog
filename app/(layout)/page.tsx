import { v4 as uuid } from 'uuid'
import CategoryButton from '../components/CategoryButton'
import PostList from '../components/PostList'
import {
  getAllCategories,
  getAllPosts,
  getPostsByCategory
} from '../services/posts'
import { PostType } from '../models/posts'
import { getProfile } from '../services/profile'
import { ProfileType } from '../models/profile'
import EmailSvg from '../components/svg/EmailSvg'
import GithubSvg from '../components/svg/GithubSvg'
import PortfolioSvg from '../components/svg/PortfolioSvg'
import ResumeSvg from '../components/svg/ResumeSvg'
import { Suspense } from 'react'
import Avatar from '../components/Avatar'
import Link from 'next/link'
import EmptyPost from '../components/EmptyPost'
import { headers } from 'next/headers'
import ProfileLink from '../components/ProfileLink'

export default async function Home() {
  const categories = await getAllCategories()

  const headerList = await headers()
  const search = headerList.get('x-search')

  const keyword = search ? new URLSearchParams(search).get('keyword') : ''

  let posts: PostType[] = []

  if (!keyword) {
    posts = (await getAllPosts()) as PostType[]
  } else {
    posts = (await getPostsByCategory(keyword)) as PostType[]
  }

  return (
    <>
      <Hero />

      <nav className="flex flex-wrap gap-2 mt-10">
        <Link href="/">
          <CategoryButton key={uuid()} name="All" isActive={!keyword} />
        </Link>
        {categories
          .sort((a, b) => b.localeCompare(a))
          .map((category) => (
            <CategoryButton
              key={uuid()}
              name={category}
              isActive={keyword?.toLowerCase() === category.toLowerCase()}
            />
          ))}
      </nav>

      <p className="w-full mt-10 mb-4 text-sm text-neutral-400">
        {keyword || '전체'}{' '}
        <strong className="text-[--text-color]">{posts.length}</strong>개 포스트
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
    nickname,
    email,
    portfolioUrl,
    githubUrl,
    resumeUrl
  } = profileData

  return (
    <Suspense fallback={<HeroSkeleton />}>
      <section className="pb-10 border-b border-[--secondary-color]">
        <div className="flex items-center gap-8 sm:flex-row flex-col text-center sm:text-left">
          {profileImage && (
            <Avatar size="xl" src={profileImage} alt="cukehater" />
          )}
          <div>
            <h4 className="text-3xl font-bold">{blogTitle}</h4>
            <p className="mt-4 text-lg font-medium">{nickname}</p>
            <p className="mt-4 text-sm">{description}</p>
            <nav className="flex gap-3 mt-4 justify-center sm:justify-start">
              {email && (
                <ProfileLink
                  href={`mailto:${email}`}
                  icon={<EmailSvg />}
                  name="E-Mail"
                />
              )}

              {githubUrl && (
                <ProfileLink
                  href={githubUrl}
                  icon={<GithubSvg />}
                  name="Github"
                />
              )}

              {portfolioUrl && (
                <ProfileLink
                  href={portfolioUrl}
                  icon={<PortfolioSvg />}
                  name="Portfolio"
                />
              )}

              {resumeUrl && (
                <ProfileLink
                  href={resumeUrl}
                  icon={<ResumeSvg />}
                  name="Resume"
                />
              )}
            </nav>
          </div>
        </div>
      </section>
    </Suspense>
  )
}

function HeroSkeleton() {
  return (
    <section className="pb-10 mt-20">
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

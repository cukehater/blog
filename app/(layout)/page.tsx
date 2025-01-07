import { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { v4 as uuid } from 'uuid'

import Avatar from '../components/Avatar'
import CategoryButton from '../components/CategoryButton'
import EmptyPost from '../components/EmptyPost'
import PostList from '../components/PostList'
import ProfileLink from '../components/ProfileLink'
import EmailSvg from '../components/svg/EmailSvg'
import GithubSvg from '../components/svg/GithubSvg'
import PortfolioSvg from '../components/svg/PortfolioSvg'
import ResumeSvg from '../components/svg/ResumeSvg'

import { PostType } from '../models/posts'
import { ProfileType } from '../models/profile'
import {
  getAllCategories,
  getAllPosts,
  getPostsByCategory
} from '../services/posts'
import { getBlogTitle, getProfile } from '../services/profile'

export async function generateMetadata(): Promise<Metadata> {
  const [blogTitle, posts] = await Promise.all([getBlogTitle(), getAllPosts()])

  return {
    title: blogTitle?.blogTitle,
    description: posts?.map((post) => post.description).join(' | ')
  }
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
  )
}

export default async function Home() {
  const [categories, headerList] = await Promise.all([
    getAllCategories(),
    headers()
  ])

  const search = headerList.get('x-search')
  const keyword = search ? new URLSearchParams(search).get('keyword') : ''

  const posts = (await (keyword
    ? getPostsByCategory(keyword)
    : getAllPosts())) as PostType[]

  const sortedCategories = categories.sort((a, b) => b.localeCompare(a))

  return (
    <>
      <Hero />

      <nav className="flex flex-wrap gap-2 mt-10">
        <Link href="/">
          <CategoryButton key={uuid()} name="All" isActive={!keyword} />
        </Link>
        {sortedCategories.map((category) => (
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

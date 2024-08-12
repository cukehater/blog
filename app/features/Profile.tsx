import Link from 'next/link'

import EmailSvg from '../shared/components/svg/EmailSvg'
import GithubSvg from '../shared/components/svg/GithubSvg'
import PortfolioSvg from '../shared/components/svg/PortfolioSvg'
import ResumeSvg from '../shared/components/svg/ResumeSvg'
import ProfileImage from '../shared/components/ProfileImage'
import Error from '../error'
import { ProfileData } from '../types/types'
import { connectDB } from '../shared/utils/db'

export const revalidate = 0

export default async function Intro() {
  const db = (await connectDB).db('blog')
  const profile = await db.collection<ProfileData>('profile').findOne({})
  if (!profile) return <Error />

  return (
    <section className='pb-12 border-b border-[var(--border-color)] mb-20 w-full'>
      <div className='flex items-center gap-8'>
        <ProfileImage src={profile.profileImage} />

        <div className='flex flex-col gap-2'>
          <p className='text-3xl font-bold mb-2'>{profile.nickname}</p>
          <p className=''>{profile.introduction}</p>

          <nav className='flex gap-3 mt-4'>
            <Nav
              href={`mailto:${profile.email}`}
              text={
                <>
                  <span className='w-4 h-4'>
                    <EmailSvg />
                  </span>
                  E-Mail
                </>
              }
            />
            <Nav
              href={profile.githubUrl}
              text={
                <>
                  <span className='w-4 h-4'>
                    <GithubSvg />
                  </span>
                  Github
                </>
              }
            />
            <Nav
              href={profile.portfolioUrl}
              text={
                <>
                  <span className='w-4 h-4'>
                    <PortfolioSvg />
                  </span>
                  Portfolio
                </>
              }
            />
            <Nav
              href={profile.resumeUrl}
              text={
                <>
                  <span className='w-4 h-4'>
                    <ResumeSvg />
                  </span>
                  Resume
                </>
              }
            />
          </nav>
        </div>
      </div>
    </section>
  )
}

const Nav = ({
  href,
  text
}: {
  href: string
  text: string | React.ReactNode
}) => {
  return (
    <Link
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      className='flex items-center gap-0.5 text-sm text-[var(--accent-color)] opacity-80 hover:opacity-100 transition-opacity'
    >
      {text}
    </Link>
  )
}

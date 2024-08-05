import Image from 'next/image'
import Link from 'next/link'

import avatarImage from '@/public/assets/images/avatar.svg'

import EmailSvg from '../shared/components/svg/EmailSvg'
import GithubSvg from '../shared/components/svg/GithubSvg'
import PortfolioSvg from '../shared/components/svg/PortfolioSvg'
import ResumeSvg from '../shared/components/svg/ResumeSvg'

type Props = {}

export default function Intro({}: Props) {
  return (
    <section className='pb-12 border-b border-[var(--border-color)] mb-20 w-full'>
      <div className='flex items-center gap-8'>
        <div className='w-32 h-32 rounded-full bg-zinc-300 flex items-center justify-center'>
          <Image src={avatarImage} width={100} height={100} alt='user' />
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-3xl font-bold mb-2'>Cukehater</p>
          <p className=''>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            unde!
          </p>

          <nav className='flex gap-3 mt-4'>
            <Nav
              href='/'
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
              href='/'
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
              href='/'
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
              href='/'
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
      className='flex items-center gap-0.5 text-sm text-[var(--accent-color)] opacity-80 hover:opacity-100 transition-opacity'
    >
      {text}
    </Link>
  )
}

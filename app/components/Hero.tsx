import { ProfileType } from '../models/profile'
import { getProfile } from '../services/profile'

import Avatar from './Avatar'
import ProfileLink from './ProfileLink'
import EmailSvg from './svg/EmailSvg'
import GithubSvg from './svg/GithubSvg'
import PortfolioSvg from './svg/PortfolioSvg'
import ResumeSvg from './svg/ResumeSvg'

export default async function Hero() {
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

  return (
    <section className="pb-10 border-b border-[--secondary-color]">
      <div className="flex items-center gap-8 sm:flex-row flex-col text-center sm:text-left">
        {profileImage && (
          <Avatar size="xl" src={profileImage} alt="cukehater" />
        )}
        <div>
          <h4 className="text-3xl font-bold">{blogTitle}</h4>
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

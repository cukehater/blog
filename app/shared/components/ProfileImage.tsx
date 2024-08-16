import Image from 'next/image'

import Avatar from './svg/Avatar.tsx'

export default function ProfileImage({ src }: { src: string | undefined }) {
  return (
    <div className="w-32 h-32 bg-zinc-300 rounded-full flex items-center justify-center overflow-hidden">
      {src ? (
        <Image
          src={src}
          width={128}
          height={128}
          alt="프로필 이미지"
          className="h-full w-full object-cover object-center"
          priority
        />
      ) : (
        <Avatar />
      )}
    </div>
  )
}

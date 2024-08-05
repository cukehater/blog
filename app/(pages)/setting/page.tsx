import Image from 'next/image'

import Button from '@/app/shared/components/Button'
import InnerCol from '@/app/shared/components/InnerCol'
import Input from '@/app/shared/components/Input'
import Textarea from '@/app/shared/components/Textarea'

export default function Page() {
  return (
    <main className='mb-20'>
      <InnerCol className='w-[780px]'>
        <section>
          <h1>Setting</h1>
          <div>
            <Image
              src='/images/profile.png'
              alt='profile'
              width={100}
              height={100}
            />
          </div>
          <ul>
            {data.map((item, index) => (
              <li
                className='flex py-6 border-b last:border-none border-[var(--border-color)] items-center'
                key={index}
              >
                <p className='w-44 text-lg'>{item.title}</p>
                {item.id !== 3 ? (
                  <Input value={item.value} />
                ) : (
                  <Textarea value={item.value} />
                )}
              </li>
            ))}
          </ul>

          <Button
            text='프로필 저장'
            className='mt-10 mx-auto'
            type='tertiary'
          />
        </section>
      </InnerCol>
    </main>
  )
}

const data = [
  {
    id: 1,
    title: '블로그 제목',
    value: 'cukehater'
  },
  {
    id: 2,
    title: '닉네임',
    value: 'cukehater'
  },
  {
    id: 3,
    title: '간략 소개',
    value: '안녕하세요'
  },
  {
    id: 4,
    title: '이메일 주소',
    value: 'cukehater@gmail.com'
  },
  {
    id: 5,
    title: '포트폴리오 URL',
    value: 'https://portfolio.cukehater.com'
  },
  {
    id: 6,
    title: '깃허브 URL',
    value: 'https://github.com/cukehater'
  },
  {
    id: 7,
    title: '이력서 URL',
    value: 'https://resume.cukehater.com'
  }
]

import Button from '@/app/shared/components/Button'
import InnerCol from '@/app/shared/components/InnerCol'
import Field from '@/app/features/setting/Filed'
import ChangeProfileImage from '@/app/features/setting/ChangeProfileImage'

export default function Page() {
  return (
    <main className='mb-20'>
      <InnerCol className='w-[780px]'>
        <section>
          <ChangeProfileImage />
          <ul className='mt-10'>
            <Field title='블로그 제목' value='cukehater' />
            <Field title='닉네임' value='cukehater' />
            <Field title='간략 소개' value='cukehater' isTextarea />
            <Field title='이메일 주소' value='cukehater@gmail.com' />
            <Field
              title='포트폴리오 URL'
              value='https://portfolio.cukehater.com'
            />
            <Field title='깃 URL' value='https://github.com/cukehater' />
            <Field title='이력서 URL' value='https://resume.cukehater.com' />
          </ul>

          <Button
            text='프로필 저장'
            className='mt-10 mx-auto px-6'
            type='tertiary'
          />
        </section>
      </InnerCol>
    </main>
  )
}

import Button from '@/app/shared/components/Button'
import InnerCol from '@/app/shared/components/InnerCol'
import ChangeProfileImage from '@/app/features/setting/ChangeProfileImage'
import Field from '@/app/features/setting/Field'

export default function Page() {
  return (
    <main className='mb-20'>
      <InnerCol className='w-[540px]'>
        <ChangeProfileImage />
        <ul className='mt-10'>
          <Field id='blogTitle' title='블로그 제목' value='cukehater' />
          <Field id='nickname' title='닉네임' value='cukehater' />
          <Field
            id='introduction'
            title='간략 소개'
            value='cukehater'
            isTextarea
          />
          <Field id='email' title='이메일 주소' value='cukehater@gmail.com' />
          <Field
            id='portfolioUrl'
            title='포트폴리오 URL'
            value='https://portfolio.cukehater.com'
          />
          <Field
            id='githubUrl'
            title='깃 URL'
            value='https://github.com/cukehater'
          />
          <Field
            id='resumeUrl'
            title='이력서 URL'
            value='https://resume.cukehater.com'
          />
        </ul>

        <Button text='저장하기' className='mt-6 mx-auto' type='tertiary' />
      </InnerCol>
    </main>
  )
}

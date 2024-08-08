'use client'

import Button from '@/app/shared/components/Button'
import InnerCol from '@/app/shared/components/InnerCol'
import ChangeProfileImage from '@/app/features/setting/ChangeProfileImage'
import Field from '@/app/features/setting/Field'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '@/app/loading'
import { ProfileData } from '@/app/types/types'
import Snackbar from '@/app/shared/components/Snackbar'
import useCallSnackbar from '@/app/hooks/useCallSnackbar'

export default function Page() {
  const [formData, setFormData] = useState<ProfileData>({
    profileImage: '',
    blogTitle: '',
    nickname: '',
    introduction: '',
    email: '',
    portfolioUrl: '',
    githubUrl: '',
    resumeUrl: ''
  })
  const { showSnackbar, setShowSnackbar } = useCallSnackbar()
  const [isLoading, setIsLoading] = useState(true)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleProfileChange = (imgSrc: string) => {
    setFormData({ ...formData, profileImage: imgSrc })
  }

  const handleSubmit = async () => {
    await axios.put('/api/profile/update', formData)
    setShowSnackbar(true)
  }

  const fetchData = async () => {
    const { data } = await axios.get('/api/profile/get')
    const profileData = data.data

    setFormData({ ...profileData })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) return <Loading />

  return (
    <main className='mb-20'>
      <InnerCol className='w-[540px]'>
        <ChangeProfileImage
          onProfileChange={handleProfileChange}
          imgSrc={formData.profileImage}
        />
        <ul className='mt-10'>
          <Field
            id='blogTitle'
            title='블로그 제목'
            value={formData.blogTitle}
            onChange={handleChange}
          />
          <Field
            id='nickname'
            title='닉네임'
            value={formData.nickname}
            onChange={handleChange}
          />
          <Field
            id='introduction'
            title='간략 소개'
            value={formData.introduction}
            isTextarea
            onChange={handleChange}
          />
          <Field
            id='email'
            title='이메일 주소'
            value={formData.email}
            onChange={handleChange}
          />
          <Field
            id='portfolioUrl'
            title='포트폴리오 URL'
            value={formData.portfolioUrl}
            onChange={handleChange}
          />
          <Field
            id='githubUrl'
            title='깃 URL'
            value={formData.githubUrl}
            onChange={handleChange}
          />
          <Field
            id='resumeUrl'
            title='이력서 URL'
            value={formData.resumeUrl}
            onChange={handleChange}
          />
        </ul>

        <Button
          text='저장하기'
          className='mt-6 mx-auto px-6'
          type='tertiary'
          onClick={handleSubmit}
        />
      </InnerCol>

      {showSnackbar && (
        <Snackbar message='설정이 저장되었습니다.' type='success' />
      )}
    </main>
  )
}

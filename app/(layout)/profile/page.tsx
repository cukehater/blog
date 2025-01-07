'use client'

import { useEffect, useState } from 'react'

import axios from 'axios'

import Snackbar from '@/app/components/Snackbar'
import useCallSnackbar from '@/app/hooks/useCallSnackbar'
import { ProfileType } from '@/app/models/profile'

import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import Form from '../../components/Form'

import ModalPortal from '@/app/components/layout/ModalPortal'

import addTimeToFileName from '@/app/utils/addTimeToFileName'
import { createSupabaseClient } from '@/app/utils/createSupabaseClient'

function ProfileImage({
  profile,
  setProfile
}: {
  profile: ProfileType
  setProfile: (profile: ProfileType) => void
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)

    const fileName = addTimeToFileName(file.name)
    await createSupabaseClient.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME!)
      .upload(fileName, file)

    const {
      data: { publicUrl }
    } = createSupabaseClient.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME!)
      .getPublicUrl(fileName)

    setIsLoading(false)
    setProfile({
      ...profile,
      profileImage: publicUrl
    })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {isLoading ? (
        <Button type="button" className="!bg-green-500 !text-white">
          업로드 중..
        </Button>
      ) : (
        <>
          {profile.profileImage && (
            <Avatar size="xl" src={profile.profileImage} alt="cukehater" />
          )}
          <Button
            type="button"
            onClick={() => {
              document.getElementById('profileImageInput')?.click()
            }}
          >
            {profile.profileImage
              ? '프로필 이미지 변경하기'
              : '프로필 이미지 업로드하기'}
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profileImageInput"
          />
        </>
      )}
    </div>
  )
}

export default function Page() {
  const { isShowSnackbar, showSnackbar } = useCallSnackbar()
  const [profile, setProfile] = useState({
    _id: '',
    profileImage: '',
    blogTitle: '',
    description: '',
    nickname: '',
    email: '',
    portfolioUrl: '',
    githubUrl: '',
    resumeUrl: ''
  })

  const fetchData = async () => {
    const { data } = await axios.get('/api/profile')
    setProfile(data.data)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setProfile({ ...profile, [id]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.post('/api/profile', profile)
      showSnackbar()
    } catch {
      console.error('프로필 업데이트 실패')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section className="max-w-md mx-auto px-0">
      <ProfileImage profile={profile} setProfile={setProfile} />
      <Form className="mt-10" onSubmit={handleSubmit}>
        <Form.Input
          id="blogTitle"
          type="text"
          placeholder="블로그 제목"
          value={profile?.blogTitle}
          onChange={handleChange}
          required
        />
        <Form.Input
          id="nickname"
          type="text"
          placeholder="닉네임"
          value={profile?.nickname}
          onChange={handleChange}
          required
        />
        <Form.Textarea
          id="description"
          placeholder="간략 소개"
          value={profile?.description}
          onChange={handleChange}
          required
        />
        <Form.Input
          id="email"
          type="email"
          placeholder="이메일"
          value={profile?.email}
          onChange={handleChange}
        />
        <Form.Input
          id="portfolioUrl"
          type="text"
          placeholder="포트폴리오 URL"
          value={profile?.portfolioUrl}
          onChange={handleChange}
        />
        <Form.Input
          id="githubUrl"
          type="text"
          placeholder="깃허브 URL"
          value={profile?.githubUrl}
          onChange={handleChange}
        />
        <Form.Input
          id="resumeUrl"
          type="text"
          placeholder="이력서 URL"
          value={profile?.resumeUrl}
          onChange={handleChange}
        />
        <Button highlight className="w-28 mx-auto" type="submit">
          저장
        </Button>
      </Form>

      {isShowSnackbar && (
        <ModalPortal>
          <Snackbar message="프로필 업데이트를 완료했습니다" type="success" />
        </ModalPortal>
      )}
    </section>
  )
}

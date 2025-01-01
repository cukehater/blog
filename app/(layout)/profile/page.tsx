'use client'

import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import Form from '../../components/ui/Form'
import useSWR from 'swr'

export default function Page() {
  const { data, isLoading, error } = useSWR('/api/profile')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const {
    profileImage,
    blogTitle,
    description,
    email,
    portfolioUrl,
    githubUrl,
    resumeUrl
  } = data?.data

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <section className="w-[540px] mx-auto">
      <div className="flex flex-col items-center gap-4">
        <Avatar size="xl" src={profileImage} alt="cukehater" />
        <Button type="button">프로필 이미지 변경하기</Button>
      </div>

      <Form className="mt-10" onSubmit={handleSubmit}>
        <Form.Input
          id="blogTitle"
          type="text"
          placeholder="블로그 제목"
          defaultValue={blogTitle}
          required
        />
        <Form.Textarea
          id="description"
          placeholder="간략 소개"
          defaultValue={description}
          required
        />
        <Form.Input
          id="email"
          type="email"
          placeholder="이메일"
          defaultValue={email}
          required
        />
        <Form.Input
          id="portfolioUrl"
          type="text"
          placeholder="포트폴리오 URL"
          defaultValue={portfolioUrl}
          required
        />
        <Form.Input
          id="githubUrl"
          type="text"
          placeholder="깃허브 URL"
          defaultValue={githubUrl}
          required
        />
        <Form.Input
          id="resumeUrl"
          type="text"
          placeholder="이력서 URL"
          defaultValue={resumeUrl}
          required
        />
        <Button highlight className="w-28 mx-auto" type="submit">
          저장
        </Button>
      </Form>
    </section>
  )
}

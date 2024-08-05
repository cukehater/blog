'use client'

import { useState } from 'react'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Editor from '@/app/features/MarkDownEditor'
import Button from '@/app/shared/components/Button'

import HashMaker from '../shared/components/HashMaker'
import { ArrowSvg } from '../shared/components/svg/ArrowSvg'
import { listItemType } from '../types/types'

export default function Page() {
  const router = useRouter()
  const [formData, setFormData] = useState<listItemType>({
    title: '',
    description: '',
    content: '',
    registerDate: '',
    hashes: []
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({ ...formData, title })
  }

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content })
  }

  const getHashes = (hashes: string[]) => {
    setFormData({ ...formData, hashes })
  }

  const handleSaveDraft = () => {
    try {
      axios.post('/api/draft/create', formData)
      router.push('/draft')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className='flex flex-col min-h-screen mt-0'>
      <Nav handleSaveDraft={handleSaveDraft} />

      <section className='py-8 px-4'>
        <Title value={formData.title} handleTitleChange={handleTitleChange} />
        <HashMaker getHashes={getHashes} />
      </section>

      <Editor handleContentChange={handleContentChange} />
    </main>
  )
}

const Nav = ({ handleSaveDraft }: { handleSaveDraft: () => void }) => {
  return (
    <nav className='h-20 bg-[var(--border-color)]  flex items-center px-4'>
      <Link href='/'>
        <Button
          text={
            <>
              <ArrowSvg className='w-6 h-6' />
              돌아가기
            </>
          }
        />
      </Link>
      <div className='flex ml-auto gap-2'>
        <Button text='임시저장' type='secondary' onClick={handleSaveDraft} />
        <Button text='발행하기' type='tertiary' />
      </div>
    </nav>
  )
}

const Title = ({
  value,
  handleTitleChange
}: {
  value: string
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div>
      <input
        type='text'
        className='w-full text-3xl bg-transparent mb-4'
        placeholder='제목을 입력해 주세요'
        onChange={handleTitleChange}
        value={value}
      />
    </div>
  )
}

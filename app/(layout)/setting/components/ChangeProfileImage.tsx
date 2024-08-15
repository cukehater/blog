'use client'

import { useState } from 'react'

import axios from 'axios'

import Button from '@/app/shared/components/Button.tsx'
import ProfileImage from '@/app/shared/components/ProfileImage.tsx'
import addTimeToFileName from '@/app/shared/utils/addTimeToFileName.ts'
import uploadToS3 from '@/app/shared/utils/uploadToS3.ts'

export default function ChangeProfileImage({
  onProfileChange,
  imgSrc
}: {
  onProfileChange: (imgSrc: string) => void
  imgSrc: string
}) {
  const [selectedFile, setSelectedFile] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    setIsLoading(true)

    const fileName = addTimeToFileName(file.name)
    const { data } = await axios.get(
      `/api/upload/image?file=${fileName}&dir=profile`
    )
    const fileSrc = await uploadToS3(data, fileName, file, 'profile/')

    setSelectedFile(fileSrc)
    onProfileChange(fileSrc)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <ProfileImage src={selectedFile || imgSrc} />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="profileImageInput"
      />

      <Button
        text={isLoading ? '업로드중...' : '프로필 이미지 변경'}
        type="tertiary"
        className={`text-sm bg-[var(--border-color)] text-[var(--color)] ${
          isLoading ? 'bg-green-500' : ''
        }`}
        onClick={() => {
          document.getElementById('profileImageInput')?.click()
        }}
      />
    </div>
  )
}

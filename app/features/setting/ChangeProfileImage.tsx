'use client'

import Button from '@/app/shared/components/Button'
import ProfileImage from '@/app/shared/components/ProfileImage'
import { addTimeToFileName } from '@/app/shared/utils/addTimeToFileName'
import { uploadToS3 } from '@/app/shared/utils/uploadToS3'
import axios from 'axios'
import { useState } from 'react'

export default function ChangeProfileImage() {
  const [selectedFile, setSelectedFile] = useState<string>()
  console.log('selectedFile', selectedFile)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    const fileName = addTimeToFileName(file.name)
    const { data } = await axios.get(`/api/profile/image?file=${fileName}`)
    const fileSrc = await uploadToS3(data, fileName, file, 'profile/')

    setSelectedFile(fileSrc)
  }

  return (
    <div className='flex items-center gap-6'>
      <ProfileImage src={selectedFile} />

      <div>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='hidden'
          id='profileImageInput'
        />

        <div className='flex gap-2'>
          <Button
            text='프로필 이미지 선택'
            type='tertiary'
            className='text-sm bg-[var(--border-color)] text-[var(--color)]'
            onClick={() => {
              document.getElementById('profileImageInput')?.click()
            }}
          />

          {selectedFile && (
            <Button text='확인' type='tertiary' className='text-sm' />
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

import { v4 as uuid } from 'uuid'

import Hash from '@/app/components/shared/components/Hash.tsx'

interface HashesProps {
  handleHashesChange: (hashes: string[]) => void
  hashes: string[]
}

export default function Hashes({ handleHashesChange, hashes }: HashesProps) {
  const [value, setValue] = useState('')

  const checkValid = (inputValue: string) => {
    setValue('')

    if (hashes.length >= 5) return false
    if (hashes.includes(inputValue)) return false
    if (inputValue.trim() === '') return false

    return true
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && checkValid(value)) {
      handleHashesChange([...hashes, value])
    }
  }

  const handleBlur = () => {
    if (checkValid(value)) {
      handleHashesChange([...hashes, value])
    }
  }

  const removeHash = (hash: string) => {
    handleHashesChange(hashes.filter((h) => h !== hash))
  }

  return (
    <div className="flex gap-2 mt-4 flex-wrap">
      {hashes.map((hash) => (
        <Hash
          key={uuid()}
          hash={hash}
          onRemove={() => removeHash(hash)}
          isPointer
        />
      ))}

      <input
        type="text"
        className="bg-transparent w-40 block"
        placeholder="태그를 입력해 주세요"
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  )
}

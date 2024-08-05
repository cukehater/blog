'use client'

import { useState } from 'react'

import { v4 as uuid } from 'uuid'

import Hash from '@/app/shared/components/Hash'

interface HashesProps {
  setHashes: (hashes: string[]) => void
  hashes: string[]
}

export default function Hashes({ setHashes, hashes }: HashesProps) {
  const [value, setValue] = useState('')
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && checkValid(value)) {
      setHashes([...hashes, value])
      setValue('')
    }
  }

  const handleRemove = (hash: string) => {
    setHashes(hashes.filter(h => h !== hash))
  }

  const checkValid = (value: string) => {
    if (hashes.includes(value)) {
      setValue('')
      return false
    }
    if (value.trim() === '') {
      return false
    }

    return true
  }

  return (
    <div className='flex gap-2 mt-4 flex-wrap'>
      {hashes.map(hash => (
        <Hash
          key={uuid()}
          hash={hash}
          onRemove={() => handleRemove(hash)}
          isPointer={true}
        />
      ))}

      <input
        type='text'
        className='bg-transparent w-40 block'
        placeholder='태그를 입력해 주세요'
        onKeyUp={handleKeyUp}
        onChange={e => setValue(e.target.value)}
        value={value}
      />
    </div>
  )
}

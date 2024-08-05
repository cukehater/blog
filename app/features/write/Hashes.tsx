'use client'

import { useReducer, useState } from 'react'

import { v4 as uuid } from 'uuid'

import Hash from '@/app/shared/components/Hash'
import ModalAlert from '@/app/shared/components/ModalAlert'

interface HashesProps {
  setHashes: (hashes: string[]) => void
  hashes: string[]
}

export default function Hashes({ setHashes, hashes }: HashesProps) {
  const [value, setValue] = useState('')

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && checkValid(value)) {
      setHashes([...hashes, value])
    }
  }

  const handleBlur = () => {
    if (checkValid(value)) {
      setHashes([...hashes, value])
    }
  }

  const checkValid = (value: string) => {
    setValue('')

    if (hashes.length >= 5) return false
    if (hashes.includes(value)) return false
    if (value.trim() === '') return false

    return true
  }

  const removeHash = (hash: string) => {
    setHashes(hashes.filter(h => h !== hash))
  }

  return (
    <>
      <div className='flex gap-2 mt-4 flex-wrap'>
        {hashes.map(hash => (
          <Hash
            key={uuid()}
            hash={hash}
            onRemove={() => removeHash(hash)}
            isPointer={true}
          />
        ))}

        <input
          type='text'
          className='bg-transparent w-40 block'
          placeholder='태그를 입력해 주세요'
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          onChange={e => setValue(e.target.value)}
          value={value}
        />
      </div>
    </>
  )
}

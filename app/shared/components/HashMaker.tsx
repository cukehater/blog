'use client'

import { useEffect, useState } from 'react'

import { v4 as uuid } from 'uuid'

import Hash from './Hash'

export default function HashMaker({
  getHashes
}: {
  getHashes: (hashes: string[]) => void
}) {
  const [value, setValue] = useState('')
  const [hashes, setHashes] = useState<string[]>([])

  useEffect(() => {
    getHashes(hashes)
  }, [hashes])

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && checkValid(value)) {
      setHashes(prev => [...prev, value])
      setValue('')
    }
  }

  const handleRemove = (hash: string) => {
    setHashes(prev => prev.filter(h => h !== hash))
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

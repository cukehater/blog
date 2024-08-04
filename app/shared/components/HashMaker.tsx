'use client'

import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import Hash from './Hash'

export default function HashMaker() {
  const [value, setValue] = useState('')
  const [hashes, setHashes] = useState<string[]>([])

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && checkValid(value)) {
      setHashes(prev => [...prev, value])
      setValue('')
    }
  }

  const checkValid = (value: string) => {
    if (value === '') return false
    else return true
  }

  return (
    <div className='flex gap-2 mt-4 flex-wrap'>
      {/* <Hash hash='해쉬' />
      <Hash hash='해쉬' />
      <Hash hash='해쉬' /> */}

      {hashes.map(hash => (
        <Hash key={uuid()} hash={hash} />
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

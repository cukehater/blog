'use client'

import Image from 'next/image'

type Props = {}

export default function Search({}: Props) {
  return (
    <form className='flex items-center rounded-full w-64 overflow-hidden ml-auto bg-gray-100 mb-6'>
      <input
        type='text'
        placeholder='검색어를 입력해 주세요'
        className='h-10 flex-1 pl-4 text-black bg-transparent text-sm'
      />
      <button className='h-10 w-16 flex items-center justify-center'>
        <Image
          src='/assets/images/search.svg'
          alt='search'
          width={24}
          height={24}
        />
      </button>
    </form>
  )
}

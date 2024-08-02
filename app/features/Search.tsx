'use client'

import Image from 'next/image'

type Props = {}

export default function Search({}: Props) {
  return (
    <form className='flex items-center rounded-full w-64 overflow-hidden ml-auto bg-[var(--button-background-color)]'>
      <input
        type='text'
        placeholder='검색어를 입력해 주세요'
        className='h-10 flex-1 pl-4 text-black bg-transparent text-sm'
      />
      <button className='h-10 w-10 flex items-center justify-center mr-1'>
        <svg
          width='800px'
          height='800px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6'
        >
          <g clip-path='url(#clip0_15_152)'>
            <rect width='24' height='24' />
            <circle
              cx='10.5'
              cy='10.5'
              r='6.5'
              stroke='var(--color)'
              stroke-linejoin='round'
            />
            <path
              d='M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z'
              fill='var(--color)'
            />
          </g>
          <defs>
            <clipPath id='clip0_15_152'>
              <rect width='24' height='24' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </button>
    </form>
  )
}

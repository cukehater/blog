import Image from 'next/image'
import { LightSvg } from '../shared/components/svg/LightSvg'

export default function DarkModeToggle() {
  return (
    <button
      type='button'
      className='bg-[var(--border-color)] rounded-md p-1 ml-2'
    >
      <div className='w-7 h-7 hover:rotate-45 transition-transform duration-300'>
        {/* <DarkSvg /> */}
        <LightSvg />
      </div>
    </button>
  )
}

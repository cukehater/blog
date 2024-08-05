import { LightSvg } from '../shared/components/svg/LightSvg'

export default function DarkModeToggle() {
  return (
    <button
      type='button'
      className='bg-[var(--button-background-color)] rounded-md p-1 ml-2 hover:bg-[var(--border-color)]'
    >
      <div className='w-7 h-7 hover:rotate-45 transition-transform duration-300'>
        {/* <DarkSvg /> */}
        <LightSvg />
      </div>
    </button>
  )
}

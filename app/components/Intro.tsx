import Image from 'next/image'

type Props = {}

export default function Intro({}: Props) {
  return (
    <section className='pt-32 pb-12 border-b border-[var(--border-color)] mb-32'>
      <div className='flex items-center gap-8'>
        <div className='w-32 h-32 rounded-full bg-[var(--border-color)] flex items-center justify-center'>
          <Image
            src='/assets/images/avatar.svg'
            width={100}
            height={100}
            alt='user'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-3xl font-bold mb-2'>Cukehater</p>
          <p className=''>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            unde!
          </p>
        </div>
      </div>
    </section>
  )
}

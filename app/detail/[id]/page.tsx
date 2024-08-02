import MarkDownPreview from '@/app/features/MarkDownPreview'
import Button from '@/app/shared/components/Button'
import Hash from '@/app/shared/components/Hash'
import InnerCol from '@/app/shared/components/InnerCol'
import { dateFormat } from '@/app/shared/utils/dateFormat'
import Link from 'next/link'

export default function Page() {
  return (
    <main>
      <InnerCol>
        <hgroup>
          <h2 className='text-[48px] font-bold'>{data.title}</h2>
          <div className='flex items-center gap-2 mt-10 justify-between'>
            <div className='flex items-center gap-2'>
              <span>Cukehater</span> &middot;
              <span className='text-gray-500'>{dateFormat(data.date)}</span>
            </div>

            <div className='flex items-center gap-4'>
              <Link href='/' className='opacity-70 hover:opacity-100'>
                수정
              </Link>
              <button className='opacity-70 hover:opacity-100'>삭제</button>
              <button type='button'>
                <ShareSvg className='w-5 h-5' />
              </button>
            </div>
          </div>
        </hgroup>

        <div className='flex gap-2 mt-6'>
          {data.hashes.map(hash => (
            <Hash key={hash} hash={hash} />
          ))}
        </div>

        <div className='mt-10'>
          <MarkDownPreview contents={data.content} />
        </div>

        <div className='flex justify-between my-20'>
          <Link
            href='/'
            className='w-96 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity'
          >
            <ArrowSvg className='w-10 h-10 mr-2' />
            <div className='flex-1'>
              <p className='text-sm mb-1'>이전 글</p>
              <p>Lorem, ipsum dolor. Lorem</p>
            </div>
          </Link>

          <Button text='목록' type='tertiary' className='font-bold px-10' />

          <Link
            href='/'
            className='text-right w-96 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity'
          >
            <div className='flex-1'>
              <p className='text-sm mb-1'>이전 글</p>
              <p>Lorem, ipsum dolor.</p>
            </div>

            <ArrowSvg className='w-10 h-10 ml-2 rotate-180' />
          </Link>
        </div>
      </InnerCol>
    </main>
  )
}

const data = {
  title: '인공지능의 미래: 기술 발전과 사회적 영향',
  description:
    '최근 급속도로 발전하는 인공지능 기술이 우리 사회에 미치는 영향과 앞으로의 전망에 대해 다각도로 살펴봅니다. 윤리적 문제부터 경제적 파급효과까지, AI가 가져올 변화를 종합적으로 분석합니다. 특히 딥러닝과 자연어 처리 기술의 발전으로 인한 일자리 변화, 의사결정 시스템의 편향성 문제, 개인정보 보호와 관련된 우려사항 등을 상세히 다룹니다. 또한 의료, 교육, 금융 등 다양한 산업 분야에서 AI 기술이 어떻게 혁신을 이끌어내고 있는지, 그리고 이로 인해 발생할 수 있는 사회적 불평등 문제와 그 해결 방안에 대해서도 심도 있게 논의합니다.',
  content:
    'JavaScript는 ES6(ECMAScript 2015) 이후로 많은 변화를 겪으며 강력하고 간결한 언어로 발전해왔습니다. 이러한 변화들은 개발 생산성을 높이고 코드의 가독성을 향상시키는 데 큰 도움이 되었는데요.\n\n이 글에서는 ES6 이후 버전에서 도입된 주요 기능 중, 많이 사용해보지 않은(작성자 기준) 생소한 기능을 정리해 보고자 합니다.\n\n---\n\n# 1. DOM Element\n\n## Element.insertAdjacentHTML()\n\n해당 메서드는 특정 텍스트를 파싱하고, 특정 DOM 트리 안에 노드를 추가 합니다.\n`innerHTML()` 과 달리 기존 Element를 삭제하지 않으며 처리속도 또한 더 빠릅니다.\n\n```javascript\nElement.insertAdjacentHTML(position, node);\n```\n\nposition에 다음 4가지 인자를 사용할 수 있습니다.\n```html\n<!-- beforebegin -->\n<p>\n<!-- afterbegin...',
  date: '2024-06-23',
  hashes: ['JavaScript', 'Python', 'C++']
}

const ShareSvg = ({ className }: { className: string }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Communication / Share_Android'>
        <path
          id='Vector'
          d='M9 13.5L15 16.5M15 7.5L9 10.5M18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21ZM6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12C9 13.6569 7.65685 15 6 15ZM18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9Z'
          stroke='var(--color)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

const ArrowSvg = ({ className }: { className: string }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fill='var(--color)'
        d='M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z'
      />
    </svg>
  )
}

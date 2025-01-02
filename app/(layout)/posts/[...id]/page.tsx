'use client'

import { v4 as uuid } from 'uuid'
import Button from '@/app/components/ui/Button'
import CategoryButton from '@/app/components/ui/CategoryButton'
import ArrowSvg from '@/app/components/ui/svg/ArrowSvg'
import parseDateFormat from '@/app/utils/parseDateFormat'
import { MdPreview } from 'md-editor-rt'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import 'md-editor-rt/lib/preview.css'
import '@/app/styles/md-editor.scss'
import useSWR from 'swr'

export default function Page() {
  const router = useRouter()
  const { id } = useParams()

  const { data, isLoading, error } = useSWR(`/api/posts?id=${id}`)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const { title, regDate, categories, content } = data?.data

  return (
    <>
      {/* 제목, 작성자, 작성일, 카테고리, 수정, 삭제 */}
      <section className="mb-10 pb-10 border-b border-[--secondary-color]">
        <hgroup>
          <h2 className="text-4xl font-bold leading-snug mb-10">{title}</h2>

          <div className="flex items-center gap-2 justify-between mb-10">
            <div className="flex items-center gap-2">
              <p>Cukehater</p> &middot;
              <p>{parseDateFormat(regDate)}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button type="button">수정</Button>
              <Button type="button">삭제</Button>
            </div>
          </div>
        </hgroup>

        <div className="flex flex-wrap gap-2">
          {categories.map((category: string) => (
            <CategoryButton key={uuid()} name={category} />
          ))}
        </div>
      </section>

      {/*  콘텐츠 */}
      <section className="mb-20">
        <MdPreview
          editorId="preview-only"
          modelValue={content}
          previewTheme="github"
          language="en-US"
          className="flex-1 custom-preview detail"
          theme="dark"
        />
      </section>

      {/* 이전 글, 다음 글 네비게이션 */}
      <nav className="flex justify-between items-center">
        <div className="w-40 sm:w-56">
          <Link
            href={`/`}
            className="flex items-center gap-1 opacity-85 hover:opacity-100 transition-opacity"
          >
            <ArrowSvg className="w-7 h-7 mr-2" />
            <div className="flex-1">
              <p className="text-xs mb-1">다음 글</p>
              <p className="line-clamp-2 leading-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptas velit ullam eius quia animi molestias placeat
                architecto unde iusto ab aliquid, fugiat dolore maxime
                cupiditate illum assumenda pariatur eaque aut.
              </p>
            </div>
          </Link>
        </div>

        <Button
          type="button"
          highlight
          className="text-base px-6"
          onClick={() => router.push('/')}
        >
          목록으로
        </Button>

        <div className="w-40 sm:w-56">
          <Link
            href={`/`}
            className="text-right flex items-center gap-1 opacity-85 hover:opacity-100 transition-opacity"
          >
            <div className="flex-1">
              <p className="text-xs mb-1">이전 글</p>
              <p className="line-clamp-2 leading-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
                nemo natus placeat excepturi nobis quaerat optio facilis quam
                quae corrupti. Obcaecati non vitae velit quisquam, atque at?
                Dolores, hic impedit?
              </p>
            </div>
            <ArrowSvg className="w-7 h-7 ml-2 rotate-180" />
          </Link>
        </div>
      </nav>
    </>
  )
}

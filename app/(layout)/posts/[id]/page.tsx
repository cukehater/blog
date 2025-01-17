import { v4 as uuid } from 'uuid'

import CategoryButton from '@/app/components/CategoryButton'
import Hero from '@/app/components/Hero'
import PostDeleteButton from '@/app/components/PostDeleteButton'
import PostEditButton from '@/app/components/PostEditButton'
import PostMDPreview from '@/app/components/PostMDPreview'
import PostNavigation from '@/app/components/PostNavigation'
import { PostType, PrevOrNextPostType } from '@/app/models/posts'
import { getPostById, getPrevOrNextPost } from '@/app/services/posts'
import { getBlogTitle } from '@/app/services/profile'
import { auth } from '@/auth'

import parseDateFormat from '@/app/utils/parseDateFormat'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params
  const postData = await getPostById(id)
  const { title, description } = postData as PostType

  return {
    title,
    description
  }
}

export default async function Page({ params }: { params: Params }) {
  const session = await auth()

  const { id } = await params

  const blogTitleData = await getBlogTitle()
  const postData = await getPostById(id)

  const prevPost = (await getPrevOrNextPost(id, 'prev')) as PrevOrNextPostType
  const nextPost = (await getPrevOrNextPost(id, 'next')) as PrevOrNextPostType

  const { title, regDate, categories, content } = postData as PostType

  return (
    <>
      {/* 제목, 작성자, 작성일, 카테고리, 수정, 삭제 */}
      <section className="mb-6 pb-6 border-b border-[--secondary-color]">
        <hgroup>
          <h2 className="mb-6 text-4xl font-bold leading-snug">{title}</h2>

          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <p>{blogTitleData?.blogTitle}</p> &middot;
              <p>{parseDateFormat(regDate)}</p>
            </div>

            {session && (
              <div className="flex items-center gap-2">
                <PostEditButton postId={id} />
                <PostDeleteButton postId={id} type="post" />
              </div>
            )}
          </div>
        </hgroup>

        <div className="flex flex-wrap gap-2">
          {categories.map((category: string) => (
            <CategoryButton key={uuid()} name={category} />
          ))}
        </div>
      </section>

      {/*  콘텐츠 */}
      <PostMDPreview content={content} />

      {/* 프로필 */}
      <Hero />

      {/* 이전 글, 다음 글 네비게이션 */}
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
    </>
  )
}

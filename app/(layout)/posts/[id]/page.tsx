import { v4 as uuid } from 'uuid'
import CategoryButton from '@/app/components/CategoryButton'
import parseDateFormat from '@/app/utils/parseDateFormat'
import PostDeleteButton from '@/app/components/PostDeleteButton'
import { getPostById, getPrevOrNextPost } from '@/app/services/posts'
import PostEditButton from '@/app/components/PostEditButton'
import { PostType, PrevOrNextPostType } from '@/app/models/posts'
import { getNickname } from '@/app/services/profile'
import PostMDPreview from '@/app/components/PostMDPreview'
import PostNavigation from '@/app/components/PostNavigation'
import { auth } from '@/auth'

type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
  const session = await auth()

  const { id } = await params

  const nicknameData = await getNickname()
  const { nickname } = nicknameData || { nickname: '' }
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
              <p>{nickname}</p> &middot;
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

      {/* 이전 글, 다음 글 네비게이션 */}
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
    </>
  )
}

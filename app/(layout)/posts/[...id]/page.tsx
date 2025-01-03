import { v4 as uuid } from 'uuid'
import CategoryButton from '@/app/components/ui/CategoryButton'
import parseDateFormat from '@/app/utils/parseDateFormat'
import PostDeleteButton from '@/app/components/ui/PostDeleteButton'
import { getPostById, getPrevOrNextPost } from '@/app/services/posts'
import PostEditButton from '@/app/components/ui/PostEditButton'
import { PostType, PrevOrNextPostType } from '@/app/models/posts'
import { getNickname } from '@/app/services/profile'
import PostMDPreview from '@/app/components/ui/PostMDPreview'
import PostNavigation from '@/app/components/ui/PostNavigation'

export default async function Page({ params }: { params: { id: string[] } }) {
  const { id } = await params
  const postId = id[0]

  const nicknameData = await getNickname()
  const { nickname } = nicknameData || { nickname: '' }
  const postData = await getPostById(postId)

  const prevPost = (await getPrevOrNextPost(
    postId,
    'prev'
  )) as PrevOrNextPostType
  const nextPost = (await getPrevOrNextPost(
    postId,
    'next'
  )) as PrevOrNextPostType

  const { title, regDate, categories, content } = postData as PostType

  return (
    <>
      {/* 제목, 작성자, 작성일, 카테고리, 수정, 삭제 */}
      <section className="mb-10 pb-10 border-b border-[--secondary-color]">
        <hgroup>
          <h2 className="text-4xl font-bold leading-snug mb-10">{title}</h2>

          <div className="flex items-center gap-2 justify-between mb-10">
            <div className="flex items-center gap-2">
              <p>{nickname}</p> &middot;
              <p>{parseDateFormat(regDate)}</p>
            </div>

            <div className="flex items-center gap-2">
              <PostEditButton postId={postId} />
              <PostDeleteButton postId={postId} type="post" />
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
      <PostMDPreview content={content} />

      {/* 이전 글, 다음 글 네비게이션 */}
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
    </>
  )
}

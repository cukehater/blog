import { getAllDrafts } from '@/app/services/drafts'
import PostList from '../../components/PostList'
import { PostType } from '@/app/models/posts'
import EmptyPost from '@/app/components/EmptyPost'

export default async function Page() {
  const drafts = (await getAllDrafts()) as PostType[]

  if (drafts.length === 0)
    return <EmptyPost text="저장된 임시글이 없습니다 😢" />

  return (
    <section>
      <PostList type="draft" posts={drafts} />
    </section>
  )
}

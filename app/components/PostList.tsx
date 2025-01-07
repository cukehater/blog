import { v4 as uuid } from 'uuid'

import { PostType } from '../models/posts'

import PostCard from './PostCard'

type PostListProps = {
  type: 'draft' | 'post'
  posts: PostType[]
}

export default function PostList({ type, posts }: PostListProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={uuid()} type={type} post={post} />
      ))}
    </div>
  )
}

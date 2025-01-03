import Link from 'next/link'
import { v4 as uuid } from 'uuid'
import parseDateFormat from '../utils/parseDateFormat'
import CategoryButton from './CategoryButton'
import { PostType } from '../models/posts'
import PostDeleteButton from './PostDeleteButton'

type PostCardProps = {
  type: 'draft' | 'post'
  post: PostType
}

export default function PostCard({ type, post }: PostCardProps) {
  const { title, description, regDate, categories } = post

  return (
    <article className="border-b border-[--secondary-color] pb-8 mb-8 last-of-type:border-none last-of-type:pb-0 last-of-type:mb-0">
      <Link
        href={`/${
          type === 'post'
            ? `posts/${post._id.toString()}`
            : `write?id=${post._id.toString()}`
        }`}
      >
        <h4 className="text-xl font-bold mb-4 line-clamp-2">{title}</h4>

        <p className="text-neutral-400 line-clamp-2 mb-4">{description}</p>
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <CategoryButton key={uuid()} name={category} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">{parseDateFormat(regDate)}</p>
        {type === 'draft' && (
          <PostDeleteButton postId={post._id.toString()} type={type} />
        )}
      </div>
    </article>
  )
}

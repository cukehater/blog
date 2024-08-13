import Link from 'next/link'
import { v4 as uuid } from 'uuid'

import Hash from '@/app/shared/components/Hash.tsx'
import dateFormat from '@/app/shared/utils/dateFormat.ts'

import DeleteDraft from './DeleteDraft.tsx'
import { ListItemType } from '../../types/types.ts'

export default function ListItem({
  listItem,
  isDraft
}: {
  listItem: ListItemType
  isDraft?: boolean
}) {
  const { _id, title, description, hashes, registerDate } = listItem
  const redirectUrl = isDraft ? `/write/${_id}` : `/detail/${_id}`

  return (
    <div className="last:border-b-0 border-b border-[var(--border-color)] py-8 w-full">
      <Link href={redirectUrl} className="flex flex-col ">
        <h4 className="text-2xl font-bold mb-4 line-clamp-1">{title}</h4>
        <p className="text-gray-500 line-clamp-2 mb-8">{description}</p>
        {hashes.length > 0 && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {hashes.map((hash) => (
              <Hash key={uuid()} hash={hash} />
            ))}
          </div>
        )}
      </Link>
      {_id && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{dateFormat(registerDate)}</p>
          {isDraft && <DeleteDraft id={_id.toString()} />}
        </div>
      )}
    </div>
  )
}

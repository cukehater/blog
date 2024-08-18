import { v4 as uuid } from 'uuid'

import { findPostHashes } from '@/app/utils/db.ts'

export default async function SideNav() {
  const result = await findPostHashes('posts')

  return (
    <aside className="w-[200px] absolute -left-[250px] top-0 flex flex-col gap-2">
      {result.map(({ name, count }) => {
        return (
          <button type="button" key={uuid()}>
            {name} ({count})
          </button>
        )
      })}
    </aside>
  )
}

// 'use client'

import { headers } from 'next/headers'

import WriteContainer from './components/WriteContainer.tsx'

import { getDraftById } from '@/app/services/draftService.ts'
import { getPostById } from '@/app/services/postService.ts'

import convertIdToString from '@/app/utils/convertIdToString.ts'

import { ListItemType } from '@/app/types/types.ts'

const initialFormData = {
  title: '',
  description: '',
  content: '',
  registerDate: '',
  hashes: []
}

const getFormData = async (id: string | boolean, draft: boolean) => {
  if (!id) return false

  return draft ? getDraftById(id.toString()) : getPostById(id.toString())
}

export default async function Page() {
  const headersList = headers().get('x-search-params')
  const id = headersList?.split('=')[1].split('&')[0] ?? false
  const draft = headersList?.split('=')[2] === 'true'

  const formData = (await getFormData(id, draft)) || initialFormData

  return (
    <WriteContainer
      formData={convertIdToString(formData as ListItemType)}
      isEdit={typeof id === 'string'}
    />
  )
}

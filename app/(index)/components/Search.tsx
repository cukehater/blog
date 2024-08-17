'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import SearchSvg from '../../shared/components/svg/SearchSvg.tsx'

export default function Search() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/?search=${search}`)
  }

  return (
    <form
      className="flex items-center rounded-full w-64 overflow-hidden ml-auto bg-[var(--button-background-color)] mb-3"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="검색어를 입력해 주세요"
        className="h-10 flex-1 pl-4 bg-transparent text-sm"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="h-10 w-10 flex items-center justify-center mr-1"
      >
        <p className="absolute left-0 top-0 w-0 h-0 overflow-hidden">검색</p>
        <SearchSvg />
      </button>
    </form>
  )
}

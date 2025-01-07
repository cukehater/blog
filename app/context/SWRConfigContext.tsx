'use client'

import axios from 'axios'
import { SWRConfig } from 'swr'

export default function SWRConfigContext({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axios.get(url).then((res) => res.data)
      }}
    >
      {children}
    </SWRConfig>
  )
}

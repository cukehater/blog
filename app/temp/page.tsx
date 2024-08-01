import React from 'react'
import InnerCol from '../components/layout/InnerCol'
import List from '../components/shared/List'
import { listData } from '../data'

export default function page() {
  return (
    <main>
      <InnerCol>
        <List listData={listData} isTemp={true} />
      </InnerCol>
    </main>
  )
}

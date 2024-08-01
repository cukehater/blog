import React from 'react'
import { listItemType } from '../types/types'
import ListItem from './ListItem'

export default function List({
  listData,
  isTemp
}: {
  listData: listItemType[]
  isTemp?: boolean
}) {
  return (
    <article>
      {listData.map((listItem, index) => (
        <ListItem key={index} listItem={listItem} isTemp={isTemp} />
      ))}
    </article>
  )
}

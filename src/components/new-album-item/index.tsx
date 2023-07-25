import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NewAblumWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const NewAlbumItem: FC<IProps> = props => {
  const { itemData } = props
  return (
    <NewAblumWrapper>
      <div className="album-image">
        <img src={getImageSize(itemData.picUrl, 100)} alt="" />
        <div className="sprite_cover cover"></div>
      </div>
      <div className="album-info ">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </NewAblumWrapper>
  )
}

export default memo(NewAlbumItem)

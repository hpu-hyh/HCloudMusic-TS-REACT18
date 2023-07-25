import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SongItemWrapper } from './style'
import { formatCount, getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const SongItem: FC<IProps> = props => {
  const { itemData } = props
  return (
    <SongItemWrapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="headset sprite_icon"></i>
              {formatCount(itemData.playCount)}万
            </span>
            <i className="play sprite_icon"></i>
          </div>
        </div>
      </div>
      <div className="bottom">{itemData.name}</div>
    </SongItemWrapper>
  )
}

export default memo(SongItem)

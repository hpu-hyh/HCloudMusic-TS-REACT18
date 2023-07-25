import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { TopItemWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData?: any
}

const TopRankingItem: FC<IProps> = props => {
  const { itemData } = props
  const { tracks = [] } = itemData
  return (
    <TopItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="btn sprite_02 play"></button>
            <button className="btn sprite_02 favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="list-item" key={item.id}>
              <div className="rank">{index + 1}</div>
              <div className="info">
                <div className="name"> {item.name}</div>
                <div className="operate">
                  <button className="btn sprite_02 play"></button>
                  <button className="btn sprite_icon2 addto"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <a className="footer" href="#/discover/ranking">
        查看全部 &gt;
      </a>
    </TopItemWrapper>
  )
}

export default memo(TopRankingItem)

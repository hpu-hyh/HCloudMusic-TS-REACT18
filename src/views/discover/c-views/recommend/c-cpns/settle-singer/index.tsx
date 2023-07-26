import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SettleSingerWrapper } from './style'
import AreaHeaderV2 from '@/components/area-header-v2'
import { useAppSelector } from '@/store'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {
  const { artistLists } = useAppSelector(state => ({
    artistLists: state.recommend.artistLists
  }))
  return (
    <SettleSingerWrapper>
      <AreaHeaderV2
        title="入驻歌手"
        moreText="查看更多"
        moreLink="#/discover/artist"
      />
      <div className="artists-list">
        {artistLists.map(item => {
          return (
            <a className="item" key={item.id}>
              <img src={getImageSize(item.picUrl, 62)} alt="" />
              <div className="info">
                <div className="singer">{item.name}</div>
                <div className="desc">{item.alias.join('')}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="">申请成为网易音乐人</a>
      </div>
    </SettleSingerWrapper>
  )
}

export default memo(SettleSinger)

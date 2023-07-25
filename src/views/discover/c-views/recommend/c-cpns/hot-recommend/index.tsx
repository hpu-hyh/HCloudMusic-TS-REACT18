import AreaHeadeV1 from '@/components/area-heade-v1'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HotRecommendWrapper } from './style'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'
import SongsItem from '@/components/songs-item'

interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  const { hotRecommends } = useAppSelector(
    state => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqual
  )
  return (
    <HotRecommendWrapper>
      <AreaHeadeV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreLink="/discover/songs"
      />
      <div className="hot-recommend">
        {hotRecommends.map(item => {
          return <SongsItem key={item.id} itemData={item}></SongsItem>
        })}
      </div>
    </HotRecommendWrapper>
  )
}

export default memo(HotRecommend)

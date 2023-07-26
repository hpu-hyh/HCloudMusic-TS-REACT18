import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { TopRankingWrapper } from './styled'
import TopBanner from '../top-banner'
import AreaHeadeV1 from '@/components/area-heade-v1'
import { useAppSelector } from '@/store'
import TopRankingItem from '../top-ranking-item'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const { rankings } = useAppSelector(
    state => ({
      rankings: state.recommend.rankings
    }),
    shallowEqual
  )
  return (
    <TopRankingWrapper>
      <AreaHeadeV1 title="榜单" moreLink="/discover/ranking" />
      <div className="content">
        {rankings.map(item => {
          return <TopRankingItem key={item.id} itemData={item} />
        })}
      </div>
    </TopRankingWrapper>
  )
}

export default memo(TopRanking)

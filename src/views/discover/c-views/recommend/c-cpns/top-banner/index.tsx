import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Carousel } from 'antd'
import {
  BannerControl,
  BannerLeft,
  BannerRight,
  TopBannerWrappper
} from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  // 从store中获得数据
  const { banners } = useAppSelector(
    state => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )
  console.log(banners)
  return (
    <TopBannerWrappper>
      <BannerLeft>
        <Carousel autoplay>
          {banners.map(item => {
            return (
              <div className="item" key={item.imageUrl}>
                <img src={item.imageUrl} alt="" />
              </div>
            )
          })}
        </Carousel>
      </BannerLeft>
      <BannerRight></BannerRight>
      <BannerControl></BannerControl>
    </TopBannerWrappper>
  )
}

export default memo(TopBanner)

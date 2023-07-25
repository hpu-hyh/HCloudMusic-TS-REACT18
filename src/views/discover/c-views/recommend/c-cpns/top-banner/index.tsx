import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'
import {
  BannerControl,
  BannerLeft,
  BannerRight,
  TopBannerWrappper
} from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const CarouselRef = useRef<ElementRef<typeof Carousel>>(null)
  // 从store中获得数据
  const { banners } = useAppSelector(
    state => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )

  // 事件处理函数
  function handlePrevClick() {
    CarouselRef.current?.prev()
  }
  function handleNextClick() {
    CarouselRef.current?.next()
  }
  function handleAfterChange(current: number) {
    setCurrentIndex(current)
  }
  // 背景高斯模糊
  let bgImageUrl = banners[currentIndex]?.imageUrl
  if (bgImageUrl) {
    bgImageUrl = bgImageUrl + '?imageView&blur=40x20'
  }
  return (
    <TopBannerWrappper
      style={{ background: `url('${bgImageUrl}') center center / 6000px` }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            dots={false}
            effect="fade"
            afterChange={handleAfterChange}
            ref={CarouselRef}
          >
            {banners.map(item => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img className="image" src={item.imageUrl} alt="" />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: index === currentIndex
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </TopBannerWrappper>
  )
}

export default memo(TopBanner)

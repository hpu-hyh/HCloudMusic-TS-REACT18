import React, { memo, useRef } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { AlbumWrapper } from './style'
import AreaHeadeV1 from '@/components/area-heade-v1'
import { Carousel } from 'antd'
import { useAppSelector } from '@/store'
import NewAlbumItem from '@/components/new-album-item'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  // 获取数据
  const { NewAlbums } = useAppSelector(state => ({
    NewAlbums: state.recommend.newAlbum
  }))
  // 按钮轮播
  const CarouselRef = useRef<ElementRef<typeof Carousel>>(null)
  // 事件处理函数
  function bannerClickHandle(IsLeft = true) {
    IsLeft ? CarouselRef.current?.prev() : CarouselRef.current?.next()
  }
  return (
    <AlbumWrapper>
      <AreaHeadeV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="arrow sprite_02 arrow-left"
          onClick={e => bannerClickHandle(true)}
        ></button>
        <div className="banner">
          <Carousel ref={CarouselRef} dots={false} speed={1100}>
            {[0, 1].map(item => {
              return (
                <div className="album-list">
                  {NewAlbums.slice(item * 5, (item + 1) * 5).map(album => {
                    return <NewAlbumItem key={album.id} itemData={album} />
                  })}
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="arrow sprite_02 arrow-right"
          onClick={e => bannerClickHandle(false)}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)

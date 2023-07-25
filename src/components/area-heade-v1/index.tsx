import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AreaHeaderV1Wrapper } from './style'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreText?: string
  moreLink?: string
}

const AreaHeaderV1: FC<IProps> = props => {
  const {
    title = '默认',
    keywords = [],
    moreText = '更多',
    moreLink = '/'
  } = props
  return (
    <AreaHeaderV1Wrapper className="sprite_o2">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keyword">
          {keywords.map(item => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link className="more" to={moreLink}>
          {moreText}
        </Link>
        <i className="sprite_02 icon"></i>
      </div>
    </AreaHeaderV1Wrapper>
  )
}

export default memo(AreaHeaderV1)

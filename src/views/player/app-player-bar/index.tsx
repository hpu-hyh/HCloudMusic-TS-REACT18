import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import {
  AppPlayerBarWrapper,
  BarControl,
  BarOperator,
  BarPlayerInfo
} from './style'
import { Link } from 'react-router-dom'
import { Slider } from 'antd'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  return (
    <AppPlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl>
          <button className="btn sprite_playbar prev"></button>
          <button className="btn sprite_playbar play"></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="/player">
            <img
              className="image"
              src="https://p2.music.126.net/OVkXDNmbk2uj6wE1KTZIwQ==/109951165203334337.jpg?param=34y34"
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">111</span>
              <span className="singer-name">222</span>
            </div>
            <div className="progress">
              <Slider />
              <div className="time">
                <span className="current">111</span>
                <span className="divider">222</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right  sprite_playbar">
            <button className="btn  sprite_playbar volume"></button>
            <button className="btn  sprite_playbar loop"></button>
            <button className="btn  sprite_playbar playlist"></button>
          </div>
          btn
        </BarOperator>
      </div>
    </AppPlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)

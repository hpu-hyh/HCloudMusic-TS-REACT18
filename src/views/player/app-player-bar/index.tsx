import React, { memo, useState, useRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import {
  AppPlayerBarWrapper,
  BarControl,
  BarOperator,
  BarPlayerInfo
} from './style'
import { Link } from 'react-router-dom'
import { Slider, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { getSongPlayUrl } from '@/utils/handle-player'
import { formatTime } from '@/utils/format'
import {
  changeLyricIndexAction,
  changeLyricsAction,
  changeMusicAction,
  changePlayModeAction
} from '../store/player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  // 总时间
  const [duration, setDuration] = useState(0)
  // 当前时间
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const dispatch = useAppDispatch()
  const { currentSong, lyrics, lyricsIndex, playMode } = useAppSelector(
    state => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricsIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    })
  )
  useEffect(() => {
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
        console.log('播放成功')
      })
      .catch(() => {
        setIsPlaying(false)
        console.log('播放失败')
      })
    //获取歌曲总时间
    setDuration(currentSong.dt)
  }, [currentSong])
  // 歌曲进度处理
  function handleTimeUpdate() {
    const currentTime = audioRef.current!.currentTime * 1000
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setCurrentTime(currentTime)
      setProgress(progress)
    }
    //匹配歌词
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }
    if (lyricsIndex === index || index === -1) return
    dispatch(changeLyricIndexAction(index))
    message.open({
      content: lyrics[index].text,
      key: 'l',
      duration: 0
    })
  }
  // 结束换歌
  function handleEnded() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeMusic(true)
    }
  }

  // 音乐播放器的播放暂停
  function handlePlayBtnClick() {
    // 1.控制播放器的播放/暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    // 2.改变isPlaying的状态
    setIsPlaying(!isPlaying)
  }
  // 切换个区
  function handleChangeMusic(isNext = true) {
    dispatch(changeMusicAction(isNext))
  }

  // 点击修改歌曲进度
  function handleSliderChange(value: number) {
    const currentTime = (value / 100) * duration
    audioRef.current!.currentTime = currentTime / 1000
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }

  // 拖拽修改歌曲进度
  function handleSliderChangeing(value: number) {
    setIsSliding(true)
    setProgress(value)

    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }
  function handleChangePlayMode() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }

  return (
    <AppPlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => {
              handleChangeMusic(false)
            }}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => {
              handleChangeMusic()
            }}
          ></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="/player">
            <img className="image" src={currentSong?.al?.picUrl} alt="" />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/*  */}
              <Slider
                value={progress}
                step={0.3}
                tooltip={{ formatter: null }}
                onAfterChange={handleSliderChange}
                onChange={handleSliderChangeing}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right  sprite_playbar">
            <button className="btn  sprite_playbar volume"></button>
            <button
              className="btn  sprite_playbar loop"
              onClick={handleChangePlayMode}
            ></button>
            <button className="btn  sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      ></audio>
    </AppPlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)

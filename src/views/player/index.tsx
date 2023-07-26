import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PlayWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const Player: FC<IProps> = () => {
  return <PlayWrapper>Player</PlayWrapper>
}

export default memo(Player)

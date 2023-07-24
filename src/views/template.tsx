import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const home: FC<IProps> = () => {
  return (<div>home</div>)
}

export default memo(home)

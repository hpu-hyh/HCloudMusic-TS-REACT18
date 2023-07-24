// import hyRequest from '@/service'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useAppDispatch } from '@/store'
import { fetchBannerDaraAction } from './store/recommends'
import TopBanner from './c-cpns/top-banner'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBannerDaraAction())
  }, [])
  return (
    <div>
      <TopBanner />
    </div>
  )
}

export default memo(Recommend)

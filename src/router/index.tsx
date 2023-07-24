import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import { RouteObject } from 'react-router-dom'

// 一级路由懒加载
const Discover = lazy(() => import('@/views/discover'))
const Mine = lazy(() => import('@/views/mine'))
const Download = lazy(() => import('@/views/download'))
const Focus = lazy(() => import('@/views/focus'))
// 二级路由懒加载
const Recommend = lazy(() => import('@/views/discover/c-views/recommend'))
const Album = lazy(() => import('@/views/discover/c-views/album'))
const Artist = lazy(() => import('@/views/discover/c-views/artist'))
const DjRadio = lazy(() => import('@/views/discover/c-views/djradio'))
const Songs = lazy(() => import('@/views/discover/c-views/songs'))
const Ranking = lazy(() => import('@/views/discover/c-views/ranking'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/album',
        element: <Album />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      },
      {
        path: '/discover/djradio',
        element: <DjRadio />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      },
      {
        path: '/discover/ranking',
        element: <Ranking />
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/download',
    element: <Download />
  },
  {
    path: '/focus',
    element: <Focus />
  }
]

export default routes

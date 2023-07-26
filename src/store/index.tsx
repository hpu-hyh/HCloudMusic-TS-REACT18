import { configureStore } from '@reduxjs/toolkit'

import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual
} from 'react-redux'

// import countReducer from './modules/counter'
import recommendReducer from '../views/discover/c-views/recommend/store/recommends'
import playerReducer from '../views/player/store/player'

const store = configureStore({
  reducer: {
    // counter: countReducer,
    recommend: recommendReducer,
    player: playerReducer
  }
})

type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store

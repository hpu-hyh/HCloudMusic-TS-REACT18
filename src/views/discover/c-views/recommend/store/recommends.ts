import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBanner, getHotRecommend, getNewAlbum } from "../service/recommends";

export const fetchRcommendDataAction = createAsyncThunk('fetchData', (_, { dispatch }) => {
  getBanner().then(res => {
    dispatch(changeBannersAction(res.banners))
  })
  getHotRecommend(8).then(res => {
    dispatch(changeHotRecommendAction(res.result))
  })
  getNewAlbum().then(res => {
    dispatch(changeNewAlbumAction(res.albums))
  })
}
)

interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbum: any[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbum: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,

  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbum = payload
    }
  }
})
export const { changeBannersAction, changeHotRecommendAction, changeNewAlbumAction } = recommendSlice.actions

export default recommendSlice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBanner, getHotRecommend, getNewAlbum, getPlayListDetail } from "../service/recommends";


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
const rankingIds = [19723756, 3779629, 2884035]

export const fetchRankingDataAction = createAsyncThunk('rankings', (_, { dispatch }) => {
  const promises: Promise<any>[] = []
  for (const id of rankingIds) {
    promises.push(getPlayListDetail(id))
  }
  Promise.all(promises).then(res => {
    console.log(res)
    const playlists = res.map(item => item.playlist)
    dispatch(changeRankingDetailAction(playlists))
  })
})

interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbum: any[]
  rankings: any[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbum: [],
  rankings: []
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
    },
    changeRankingDetailAction(state, { payload }) {
      state.rankings = payload
    }
  }
})
export const { changeBannersAction, changeHotRecommendAction, changeNewAlbumAction, changeRankingDetailAction } = recommendSlice.actions

export default recommendSlice.reducer

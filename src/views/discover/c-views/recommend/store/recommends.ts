import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBanner } from "../service/recommends";

export const fetchBannerDaraAction = createAsyncThunk('banner', (payload, { dispatch }) => {
  getBanner().then(res => {
    dispatch(changeBannersAction(res.banners))
  })
}
)

interface IRecommendState {
  banners: any[]
}

const initialState: IRecommendState = {
  banners: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,

  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
  }
})
export const { changeBannersAction } = recommendSlice.actions

export default recommendSlice.reducer

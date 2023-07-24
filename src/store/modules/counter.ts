import { createSlice } from '@reduxjs/toolkit'
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 100
  },
  reducers: {
    changeCount(state, { payload }) {
      state.count = payload
    }
  }
})

export const { changeCount } = counterSlice.actions
export default counterSlice.reducer

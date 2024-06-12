import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    show: (state) => {
      state.value = true
    },
    hide: (state) => {
      state.value = false
    },
  },
})

export const { show, hide } = screenSlice.actions

export default screenSlice.reducer
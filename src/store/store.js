import { configureStore } from '@reduxjs/toolkit'
import screenReducer from '../features/screen/screenSlice'

export const store = configureStore({
  reducer: {
    screen : screenReducer,
  },
})
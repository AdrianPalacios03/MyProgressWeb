import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  devTools: false
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
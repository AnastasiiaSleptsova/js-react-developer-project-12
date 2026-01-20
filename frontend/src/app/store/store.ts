import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '@features/auth'
import { chatSlice } from '@features/chat'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

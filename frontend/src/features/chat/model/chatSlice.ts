import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

type ChatState = {
  selectedChannelId: string | null
}

const initialState: ChatState = {
  selectedChannelId: null,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChannel: (state, action: PayloadAction<string>) => {
      state.selectedChannelId = action.payload
    },
    clearSelectedChannel: (state) => {
      state.selectedChannelId = null
    },
  },
})

export const { setSelectedChannel, clearSelectedChannel } = chatSlice.actions
export default chatSlice.reducer

import type { ChatState } from './chatSlice'

type StateWithChat = {
  chat: ChatState
}

export const selectSelectedChannelId = (state: StateWithChat) => state.chat.selectedChannelId

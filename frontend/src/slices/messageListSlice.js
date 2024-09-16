import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [], // [{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
};
const messageListSlice = createSlice({
  name: "messageList",
  initialState,
  reducers: {
    addMessage: 1,
  },
});

export const { addMessage } = messageListSlice.actions;
export default messageListSlice.reducer;

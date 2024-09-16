import { createSlice } from "@reduxjs/toolkit";

// TODO возможно удалить? 
const initialState = {
  channels: [], // [{ id: '1', name: 'general', removable: false }, ...]
};
const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    addChannel: 1,
  },
});

export const { addChannels } = chatListSlice.actions;
export default chatListSlice.reducer;

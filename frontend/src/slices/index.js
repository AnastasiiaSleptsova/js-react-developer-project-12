import { configureStore } from "@reduxjs/toolkit";
import { chatsApi } from "../api/chatsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { messagesApi } from "../api/messagesApi";

export const store = configureStore({
  reducer: {
    [chatsApi.reducerPath]: chatsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(chatsApi.middleware)
      .concat(messagesApi.middleware),
  devTools: true, // TODO убрать в прод сборке
});

setupListeners(store.dispatch);

import { configureStore } from "@reduxjs/toolkit";
import { chatsApi } from "../api/chatsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { messagesApi } from "../api/messagesApi";
import { signupUserApi } from "../api/signupUserApi";

export const store = configureStore({
  reducer: {
    [chatsApi.reducerPath]: chatsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [signupUserApi.reducerPath]: signupUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(chatsApi.middleware)
      .concat(messagesApi.middleware)
      .concat(signupUserApi.middleware),
  devTools: true, // TODO убрать в прод сборке
});

setupListeners(store.dispatch);

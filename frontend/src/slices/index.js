import { configureStore } from "@reduxjs/toolkit";
import { channelsApi } from "../api/channelsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { messagesApi } from "../api/messagesApi";
import { signupUserApi } from "../api/signupUserApi";

export const store = configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [signupUserApi.reducerPath]: signupUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware)
      .concat(signupUserApi.middleware),
  devTools: true, // TODO убрать в прод сборке
});

setupListeners(store.dispatch);

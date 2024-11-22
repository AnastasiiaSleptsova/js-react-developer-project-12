import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiHost } from "./getApiHost";
import { API_ROUTES } from "./routes";

const chatTag = 'chats'

export const chatsApi = createApi({
  reducerPath: "chats",
  tagTypes: [chatTag],
  baseQuery: fetchBaseQuery({
    baseUrl: getApiHost() + API_ROUTES.CHANNELS,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => "",
      providesTags: [{ type: chatTag, id: "LIST" }],
    }),
    addChat: builder.mutation({
      query: (newChat) => ({
        // { id: string, name: string, removable: boolean }
        url: "",
        method: "POST",
        body: newChat,
      }),
      invalidatesTags: [{ type: chatTag, id: "LIST" }],
    }),
    renameChat: builder.mutation({
      query: ({id, name}) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { name }
      }),
      invalidatesTags: [{ type: chatTag, id: "LIST" }],
    }),
    removeChat: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: chatTag, id: "LIST" }],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useAddChatMutation,
  useRenameChatMutation,
  useRemoveChatMutation,
} = chatsApi;

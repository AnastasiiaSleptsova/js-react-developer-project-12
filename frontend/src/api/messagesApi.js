import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiHost } from "./getApiHost";
import { API_ROUTES } from "./routes";

const messageTag = 'messages'

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  tagTypes: [messageTag],
  baseQuery: fetchBaseQuery({
    baseUrl: getApiHost() + API_ROUTES.MESSAGES,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    }, // TODO вынести в utils
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: messageTag, id })),
              { type: messageTag, id: "LIST" },
            ]
          : [{ type: messageTag, id: "LIST" }],
    }),
    sendMessage: builder.mutation({
      query: (newMessage) => ({ // { body: string, channelId: string, username: string }
        url: "",
        method: "POST",
        body: newMessage, 
      }),
      invalidatesTags: [{ type: messageTag, id: "LIST" }],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: messageTag, id: "LIST" }],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;

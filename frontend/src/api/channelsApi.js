import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiHost } from "./getApiHost";
import { API_ROUTES } from "./routes";

const channelTag = 'channels'

export const channelsApi = createApi({
  reducerPath: "channels",
  tagTypes: [channelTag],
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
    getChannels: builder.query({
      query: () => "",
      providesTags: [{ type: channelTag, id: "LIST" }],
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        // { id: string, name: string, removable: boolean }
        url: "",
        method: "POST",
        body: newChannel,
      }),
      invalidatesTags: [{ type: channelTag, id: "LIST" }],
    }),
    renameChannel: builder.mutation({
      query: ({id, name}) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { name }
      }),
      invalidatesTags: [{ type: channelTag, id: "LIST" }],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: channelTag, id: "LIST" }],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;

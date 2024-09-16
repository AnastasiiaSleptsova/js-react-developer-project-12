import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getApiHost } from './getApiHost';
import { API_ROUTES } from './routes';

export const chatsApi = createApi({
  reducerPath: 'chats',
  baseQuery: fetchBaseQuery({ 
    baseUrl: getApiHost() + API_ROUTES.CHATS,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
  
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
  
      return headers
    },
  }),
  endpoints: (builder) => ({ 
    getChats: builder.query({
      query: () => '', 
    }),
    
  })
})

export const {useGetChatsQuery} = chatsApi;
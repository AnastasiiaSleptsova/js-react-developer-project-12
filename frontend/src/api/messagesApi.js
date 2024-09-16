import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getApiHost } from './getApiHost';
import { API_ROUTES } from './routes';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ 
    baseUrl: getApiHost() + API_ROUTES.MESSAGES,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
  
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
  
      return headers
    }, // TODO вынести в utils
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '', 
    }),
  })
})

export const {useGetMessagesQuery} = messagesApi;
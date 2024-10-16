import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiHost } from "./getApiHost";
import { API_ROUTES } from "./routes";

const signupUserTag = 'signupUser'

export const signupUserApi = createApi({
  reducerPath: "signupApi",
  tagTypes: [signupUserTag],
  baseQuery: fetchBaseQuery({
    baseUrl: getApiHost() + API_ROUTES.SIGNUP,
  }),
  endpoints: (builder) => ({
    sendUser: builder.mutation({
      query: ({userName, password}) => ({ // { username: string, password: string,}
        url: "",
        method: "POST",
        body: {username: userName, password}, 
      }),
      transformResponse: (response) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('username', response.username)
      },
      
    }),
  }),
});

export const {
  useSendUserMutation,
} = signupUserApi;

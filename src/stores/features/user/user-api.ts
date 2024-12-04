import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@/configs';
import { RootState } from '@/stores/store';

import {
  IRequestRegister,
  IResponRegister,
  IResponseLogin,
  RequestLogin,
  User,
} from './type';

export const UserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userSlice.access_token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['user'],
  endpoints: build => ({
    // GET CURRENT USER
    getCurrentUser: build.query<User, any>({
      query: () => `/users/profile`,
      transformResponse: (response: { data: User }) => response.data,
    }),

    // UPDATE INFO USER
    updateUser: build.mutation<User, User>({
      query: () => `/users/profile`,
      transformResponse: (response: { data: User }) => response.data,
    }),

    // REGISTER
    register: build.mutation<IResponRegister, IRequestRegister>({
      query: payload => {
        return {
          url: '/auth/register',
          method: 'POST',
          body: {
            ...payload,
          },
        };
      },
      transformResponse: (response: { data: IResponRegister }) => response.data,
    }),

    // LOGIN
    login: build.mutation<IResponseLogin, RequestLogin>({
      query: payload => {
        return {
          url: '/auth/login',
          method: 'POST',
          body: {
            ...payload,
          },
        };
      },
      transformResponse: (response: { data: IResponseLogin }) => response.data,
      invalidatesTags: ['user'],
    }),

    // LOGOUT
    logout: build.mutation<any, void>({
      query: () => {
        return {
          url: '/auth',
          method: 'DELETE',
          responseHandler: (response: { text: () => any }) => response.text(),
        };
      },
    }),
  }),
});

export const {
  endpoints,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
} = UserApi;

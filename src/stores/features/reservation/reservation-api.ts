import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@/configs';
import { RootState } from '@/stores/store';

import { IReserveForm } from '../stay/type';
import { logOutUser } from '../user';
import { IReservation, IReservationHistory } from './type';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL + '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userSlice.access_token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (
  arguments_: any,
  api: any,
  extraOptions: any,
) => {
  let result = await baseQuery(arguments_, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(logOutUser({}));
    globalThis.location.href = '/auth';
  }
  return result;
};

export const ReservationAPI = createApi({
  reducerPath: 'reservationApi',
  baseQuery: baseQueryWithReauth,
  // tagTypes: ["Reservation"],
  endpoints: build => ({
    createReservation: build.mutation<IReservation, IReserveForm>({
      query: payload => {
        return {
          url: `/reservations`,
          method: 'POST',
          body: {
            ...payload,
          },
        };
      },
      transformResponse: (response: { data: IReservation }) => response.data,
    }),
    getReservationHistory: build.query<IReservationHistory, any>({
      query: () => {
        return {
          url: `/reservations`,
          method: 'GET',
        };
      },
      transformResponse: (response: { data: IReservationHistory }) =>
        response.data,
      keepUnusedDataFor: 0,
    }),
    getReservationById: build.query<IReservation, { id: string }>({
      query: payload => {
        return {
          url: `/reservations/${payload.id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: { data: IReservation }) => response.data,
      // providesTags: ["Reservation"],
      keepUnusedDataFor: 0,
    }),
    applyCoupon: build.mutation<
      IReservation,
      {
        reservation_id: string;
        coupon_code: string;
      }
    >({
      query: payload => {
        return {
          url: `/coupons/apply`,
          method: 'POST',
          body: {
            ...payload,
          },
        };
      },
      transformResponse: (response: { data: IReservation }) => response.data,
      // invalidatesTags: ["Reservation"],
    }),
  }),
});

export const {
  endpoints,
  useCreateReservationMutation,
  useGetReservationHistoryQuery,
  useLazyGetReservationHistoryQuery,
  useGetReservationByIdQuery,
  useLazyGetReservationByIdQuery,
  useApplyCouponMutation,
} = ReservationAPI;

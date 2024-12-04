import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@/configs';

import {
  IActiveRoom,
  IGetHotelByHotelIdRequest,
  IHotelReservation,
  IHotelSearchEngineRequest,
  IHotelSearchGeoEngineRequest,
  IHotelSearchGeoResult,
  IHotelSearchRegionResult,
  IReserveForm,
  ISearchLocationByKeyWordResponse,
  ISearchLocationQuery,
} from './type';

export const StayAPI = createApi({
  reducerPath: 'StayAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  endpoints: build => ({
    //AUTO COMPLETED
    getListHoteStayByLocationKeyWord: build.query<
      ISearchLocationByKeyWordResponse,
      ISearchLocationQuery
    >({
      query: payload => {
        return {
          url: `/search/autocomplete`,
          method: 'POST',
          body: {
            ...payload,
          },
        };
      },
      transformResponse: (response: {
        data: ISearchLocationByKeyWordResponse;
      }) => response.data,
    }),

    //SEARCH ENEGINE
    getListHotelByRegionSearchEngine: build.query<
      IHotelSearchRegionResult,
      IHotelSearchEngineRequest
    >({
      query: payload => {
        return {
          url: `/search/serp/region`,
          method: 'POST',
          body: {
            ...payload,
          },
        };
      },
      transformResponse: (response: { data: IHotelSearchRegionResult }) =>
        response.data,
    }),

    // GET ROOM ACTIVE
    getRoomActiveByHotelId: build.query<IActiveRoom, IGetHotelByHotelIdRequest>(
      {
        query: payload => {
          return {
            url: `/search/serp/hp`,
            method: 'POST',
            body: {
              ...payload,
            },
          };
        },
        transformResponse: (response: { data: IActiveRoom }) => response.data,
      },
    ),
    // GET STAY DETAILS INFO
    getStaylDataById: build.query<IHotelReservation, { id: string }>({
      query: (payload: { id: string }) => {
        return {
          url: `/search/hotels/${payload.id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: { data: IHotelReservation }) =>
        response.data,
    }),

    getListHotelByGeoSearchEngine: build.query<
      IHotelSearchGeoResult,
      IHotelSearchGeoEngineRequest
    >({
      query: payload => {
        return {
          url: '/search/serp/geo',
          method: 'POST',
          body: {
            ...payload,
          },
        };
      },
      transformResponse: (response: { data: IHotelSearchRegionResult }) =>
        response.data,
    }),
  }),
});

export const {
  endpoints,
  useGetListHoteStayByLocationKeyWordQuery,
  useLazyGetListHoteStayByLocationKeyWordQuery,
  useGetListHotelByRegionSearchEngineQuery,
  useLazyGetListHotelByRegionSearchEngineQuery,
  useGetStaylDataByIdQuery,
  useLazyGetStaylDataByIdQuery,
  useGetRoomActiveByHotelIdQuery,
  useLazyGetRoomActiveByHotelIdQuery,
  useGetListHotelByGeoSearchEngineQuery,
  useLazyGetListHotelByGeoSearchEngineQuery,
} = StayAPI;

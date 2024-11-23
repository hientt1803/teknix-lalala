import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOpenStreetMapSearchResponse } from './type';
import { OPENSTREETMAP_API_URL } from '@/configs';

export const OpenStreetMapAPI = createApi({
   reducerPath: 'openStreetMapApi',
   baseQuery: fetchBaseQuery({
      baseUrl: `${OPENSTREETMAP_API_URL}/`,
      prepareHeaders: (headers, { getState }) => {
         return headers;
      },
   }),
   endpoints: (build) => ({
      getListLocaltionByOpenStreetMapAPI: build.query<
         IOpenStreetMapSearchResponse[],
         {
            query?: string;
         }
      >({
         query: (payload) => {
            return {
               url: `/search?q=${payload?.query}&bounded=1&polygon_threshold=0.001&format=jsonv2&addressdetails=1`,
               method: 'GET',
            };
         },
      }),
   }),
});

export const {
   useGetListLocaltionByOpenStreetMapAPIQuery,
   useLazyGetListLocaltionByOpenStreetMapAPIQuery,
} = OpenStreetMapAPI;

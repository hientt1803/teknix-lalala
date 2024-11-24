import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@/configs';
import { IStayReivew } from './type';

export const ReviewAPI = createApi({
   reducerPath: 'ReviewAPI',
   baseQuery: fetchBaseQuery({
      baseUrl: `${API_URL}/api`,
      prepareHeaders: (headers, { getState }) => {
         return headers;
      },
   }),
   endpoints: (build) => ({
      // GET DATA REVIEW BY STAY ID
      getReviewByStayId: build.query<IStayReivew, { id: string }>({
         query: ({ id }) => {
            return {
               url: `/reviews/hotels/${id}`,
               method: 'GET',
            };
         },
         transformResponse: (response: { data: IStayReivew }) => response.data,
      }),
   }),
});

export const { endpoints, useGetReviewByStayIdQuery, useLazyGetReviewByStayIdQuery } = ReviewAPI;

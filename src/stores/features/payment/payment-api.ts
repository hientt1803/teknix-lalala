import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPaymentMethod, IPaymentRequest, IPaymentResponse } from './type';
import { RootState } from '@/stores/store';
import { API_URL } from '@/configs';

export const PaymentAPI = createApi({
   reducerPath: 'paymentApi',
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
   tagTypes: ['hotel'],
   endpoints: (build) => ({
      // keepUnusedDataFor: 360, query mới dùng được
      getPaymentMethods: build.query<IPaymentMethod[], any>({
         query: () => {
            return {
               url: `/payments/methods`,
               method: 'GET',
            };
         },
         transformResponse: (response: { data: IPaymentMethod[] }) => response.data,
      }),
      createPayment: build.mutation<IPaymentResponse, IPaymentRequest>({
         query: (payload) => {
            return {
               url: `/payments`,
               method: 'POST',
               body: {
                  ...payload,
               },
            };
         },
         transformResponse: (response: { data: IPaymentResponse }) => response.data,
      }),
   }),
});

export const {
   endpoints,
   useGetPaymentMethodsQuery,
   useLazyGetPaymentMethodsQuery,
   useCreatePaymentMutation,
} = PaymentAPI;

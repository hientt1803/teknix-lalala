'use server';

import { API_URL } from '@/configs';

export const preloadHotelDetail = (id: string) => {
   void getHotelDetail(id);
};

export const getHotelDetail = async (id: string) => {
   const res = await fetch(`${API_URL}/api/search/hotels/${id}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   });

   if (!res.ok) {
      return null;
   }

   const { data: hotelData } = await res.json();
   return hotelData;
};

export const preloadHotelDetailReview = (id: string) => {
   void getHotelDetailReviews(id);
};

export const getHotelDetailReviews = async (id: string) => {
   const res = await fetch(`${API_URL}/api/reviews/hotels/${id}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   });

   if (!res.ok) {
      return null;
   }

   const { data: hotelReview } = await res.json();
   return hotelReview;
};

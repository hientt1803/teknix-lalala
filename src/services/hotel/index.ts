'use server';

import { API_URL } from '@/configs';

export const getHotelDataById = async (id: string) => {
   const response = await fetch(`${API_URL}/api/search/hotels/${id}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   });
   if (!response.ok) {
      throw new Error('Failed to fetch hotel data');
   }

   const data = await response.json();
   return data.data;
};

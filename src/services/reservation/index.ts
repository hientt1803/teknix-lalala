'use server';

import { cookies } from 'next/headers';

import { API_URL } from '@/configs';

export const getReservationHistoryData = async (id: string) => {
  const accessToken = cookies().get('access_token')?.value; // Retrieve the token from cookies

  if (!accessToken) {
    throw new Error('Access token not found in cookies');
  }
  const response = await fetch(`${API_URL}/api/reservations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`, // Pass the token here
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch reservation history');
  }

  const data = await response.json();
  return data.data;
};

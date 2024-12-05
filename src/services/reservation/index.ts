'use server';

import { cookies } from 'next/headers';
import { API_URL } from '@/configs';
import { redirect } from 'next/navigation';

export const getReservationHistoryData = async (id: string) => {
  const accessToken = cookies().get('access_token')?.value;

  if (!accessToken) {
    redirect('/booking?error=no_access_token');
  }

  const response = await fetch(`${API_URL}/api/reservations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch reservation history');
  }

  const data = await response.json();
  return data.data;
};

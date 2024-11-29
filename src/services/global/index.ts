import { API_URL } from '@/configs';

export interface HotDestination {
   id: string;
   user_created: string;
   date_created: string;
   user_updated: string;
   date_updated: string;
   city_name: string;
   activity_url: any;
   country_name: string;
   country_name_english: string;
   city_name_english: string;
   hotel_count: number;
   property_text: string;
   place_id: string;
   address_type: string;
   lat: string;
   long: string;
   image_url: string;
}

export const getHotDestination = async (): Promise<HotDestination[] | null> => {
   const res = await fetch(`${API_URL}/api/global/hot_destinations`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   });

   if (!res.ok) {
      return null;
   }

   const data = await res.json();
   return data;
};

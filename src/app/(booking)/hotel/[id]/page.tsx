import { API_URL } from '@/configs';
import HotelDetailFeature from '@/features/hotel/detail-page';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react';

type Props = {
   params: Promise<{ id: string }>;
   searchParams: Promise<URLSearchParams>;
};

export async function generateMetadata(
   { params, searchParams }: Props,
   parent: ResolvingMetadata,
): Promise<Metadata> {
   // read route params
   const { id } = await params;

   // fetch data
   const res = await fetch(`${API_URL}/api/search/hotels/${id}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   });
   const { data: reservationData } = await res.json();

   // optionally access and extend (rather than replace) parent metadata
   const { title, description, openGraph } = await parent;

   return {
      title:
         `${reservationData?.name} - ${reservationData?.star_rating || 0} star hotel at ${
            reservationData?.region.name
         } Book Today with Unmatched Comfort & Service | Luxury & Convenience with Top Amenities & Best Prices  | Best Rates & Service` ||
         title,
      description: `${reservationData?.star_rating || 0} star hotel` || description,
      openGraph: {
         images:
            reservationData?.images[0]?.replace('{size}', '640x400') || '/assets/favicon/lalala.svg'
               ? [
                    {
                       url:
                          reservationData?.images[0]?.replace('{size}', '640x400') ||
                          '/assets/favicon/lalala.svg',
                       width: 1024,
                       height: 576,
                       alt: reservationData?.title,
                    },
                 ]
               : [...(openGraph?.images || [])],
         title:
            `${reservationData?.name} at ${
               reservationData?.star_rating || 0
            } star hotel - ${reservationData?.region.name}` ||
            title ||
            '',
         description: `${reservationData?.star_rating || 0} star hotel` || description || '',
         url: `/reservationDatas/${id}`,
         locale: 'en-US',
         siteName: `${reservationData?.name} - ${
            reservationData?.star_rating || 0
         } star - ${reservationData?.region.name}`,
         type: 'website',
      },
      alternates: {
         canonical: `/reservationDatas/${id}`,
      },
      twitter: {
         title: `${reservationData?.name} - ${
            reservationData?.star_rating || 0
         } star hotel at ${reservationData?.region.name}`,
         description: `${reservationData?.star_rating || 0} star hotel`,
         images:
            reservationData?.images[0]?.replace('{size}', '640x400') || '/assets/favicon/lalala.svg'
               ? [
                    {
                       url:
                          reservationData?.images[0]?.replace('{size}', '640x400') ||
                          '/assets/favicon/lalala.svg',
                       width: 1024,
                       height: 576,
                       alt: `${reservationData?.name} - ${
                          reservationData?.star_rating || 0
                       } star at ${reservationData?.region.name}`,
                    },
                 ]
               : [...(openGraph?.images || [])],
         card: 'summary_large_image',
      },
   };
}

const HotelDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
   return <HotelDetailFeature id={(await params).id} />;
};

export default HotelDetailPage;

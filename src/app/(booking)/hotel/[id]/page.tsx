import HotelDetailFeature from '@/features/hotel/detail-page';
import { getHotelDetail, preloadHotelDetail } from '@/services/hotel';
import { Metadata, ResolvingMetadata } from 'next';

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
   const hotelData = await getHotelDetail(id);

   // optionally access and extend (rather than replace) parent metadata
   const { title, description, openGraph } = await parent;

   return {
      title:
         `${hotelData?.name} - ${hotelData?.star_rating || 0} star hotel at ${
            hotelData?.region.name
         } Book Today with Unmatched Comfort & Service | Luxury & Convenience with Top Amenities & Best Prices  | Best Rates & Service` ||
         title,
      description: `${hotelData?.star_rating || 0} star hotel` || description,
      openGraph: {
         images:
            hotelData?.images[0]?.replace('{size}', '640x400') || '/assets/favicon/lalala.svg'
               ? [
                    {
                       url:
                          hotelData?.images[0]?.replace('{size}', '640x400') ||
                          '/assets/favicon/lalala.svg',
                       width: 1024,
                       height: 576,
                       alt: hotelData?.title,
                    },
                 ]
               : [...(openGraph?.images || [])],
         title:
            `${hotelData?.name} at ${
               hotelData?.star_rating || 0
            } star hotel - ${hotelData?.region.name}` ||
            title ||
            '',
         description: `${hotelData?.star_rating || 0} star hotel` || description || '',
         url: `/hotel/${id}`,
         locale: 'en-US',
         siteName: `${hotelData?.name} - ${
            hotelData?.star_rating || 0
         } star - ${hotelData?.region.name}`,
         type: 'website',
      },
      alternates: {
         canonical: `/hotelDatas/${id}`,
      },
      twitter: {
         title: `${hotelData?.name} - ${
            hotelData?.star_rating || 0
         } star hotel at ${hotelData?.region.name}`,
         description: `${hotelData?.star_rating || 0} star hotel`,
         images:
            hotelData?.images[0]?.replace('{size}', '640x400') || '/assets/favicon/lalala.svg'
               ? [
                    {
                       url:
                          hotelData?.images[0]?.replace('{size}', '640x400') ||
                          '/assets/favicon/lalala.svg',
                       width: 1024,
                       height: 576,
                       alt: `${hotelData?.name} - ${
                          hotelData?.star_rating || 0
                       } star at ${hotelData?.region.name}`,
                    },
                 ]
               : [...(openGraph?.images || [])],
         card: 'summary_large_image',
      },
   };
}

const HotelDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
   preloadHotelDetail((await params).id);

   return <HotelDetailFeature id={(await params).id} />;
};

export default HotelDetailPage;

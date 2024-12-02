import Bounded from '@/components/common/containers/bounded';
import { HotelBannerSkeleton } from '@/features/hotel/banner';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const HotelBanner = dynamic(
   () => import('@/features/hotel/banner').then((mod) => mod.HotelBanner),
   {
      loading: () => (
         <div className="w-full min-h-[32.5rem] h-full">
            <HotelBannerSkeleton />
         </div>
      ),
   },
);
export const DestinationCaroucel = dynamic(
   () => import('@/features/hotel/destination-caroucel').then((mod) => mod.DestinationCaroucel),
   {
      ssr: false,
   },
);

export const WithoutMapContainer = dynamic(
   () =>
      import('@/features/hotel/without-map/without-map-container').then(
         (mod) => mod.WithoutMapContainer,
      ),
   {
      ssr: false,
   },
);

/**
 * Props for `HotelListing`.
 */
export type HotelListingProps = SliceComponentProps<Content.HotelListingSlice>;

/**
 * Component for "HotelListing" Slices.
 */
const HotelListing = ({ slice }: HotelListingProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="w-full"
      >
         {/* BANNER */}
         <HotelBanner />

         {/* Carousel */}
         <Bounded className="w-full">
            <DestinationCaroucel />
         </Bounded>

         {/* WITHOUT MAP */}
         <Bounded className="block">{!slice.primary.with_map && <WithoutMapContainer />}</Bounded>
      </section>
   );
};

export default HotelListing;

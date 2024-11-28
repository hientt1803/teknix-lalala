import Bounded from '@/components/common/containers/bounded';
import { HotelBannerSkeleton } from '@/features/hotel/banner';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const WithoutMapContainer = dynamic(() =>
   import('@/features/hotel/without-map/without-map-container').then(
      (mod) => mod.WithoutMapContainer,
   ),
);
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

         {/* WITH MAP */}
         {/* {slice.primary.with_map && <ListHotel type="list" visibleItem={10} />} */}

         {/* WITHOUT MAP */}
         <Bounded className="block">{!slice.primary.with_map && <WithoutMapContainer />}</Bounded>
      </section>
   );
};

export default HotelListing;

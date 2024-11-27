import Bounded from '@/components/common/containers/bounded';
import { HotelBanner } from '@/features/hotel/banner';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const WithoutMapContainer = dynamic(() =>
   import('@/features/hotel/without-map/without-map-container').then(
      (mod) => mod.WithoutMapContainer,
   ),
);
export const ListHotel = dynamic(() =>
   import('@/features/hotel/with-map/list-hotel').then((mod) => mod.ListHotel),
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
      <Bounded
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="w-full"
      >
         {/* BANNER */}
         <div className="block mt-28">
            <HotelBanner />
         </div>

         {/* WITH MAP */}
         <div className="block">{slice.primary.with_map && <ListHotel />}</div>

         {/* WITHOUT MAP */}
         <div className="block">{!slice.primary.with_map && <WithoutMapContainer />}</div>
      </Bounded>
   );
};

export default HotelListing;

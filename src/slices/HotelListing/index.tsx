import Bounded from '@/components/common/containers/bounded';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const WithoutMapContainer = dynamic(() =>
   import('@/features/hotel/without-map/without-map-container').then(
      (mod) => mod.WithoutMapContainer,
   ),
);
export const HotelBanner = dynamic(() =>
   import('@/features/hotel/banner').then((mod) => mod.HotelBanner),
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
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="w-full"
      >
         {/* BANNER */}
         <Bounded className="block w-full mt-28">
            <HotelBanner />
         </Bounded>

         {/* WITH MAP */}
         {slice.primary.with_map && <ListHotel type="list" visibleItem={10} />}

         {/* WITHOUT MAP */}
         <Bounded className="block">{!slice.primary.with_map && <WithoutMapContainer />}</Bounded>
      </section>
   );
};

export default HotelListing;

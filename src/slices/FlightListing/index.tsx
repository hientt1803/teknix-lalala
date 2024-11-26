import FlightFeatures from '@/features/flights';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `FlightListing`.
 */
export type FlightListingProps = SliceComponentProps<Content.FlightListingSlice>;

/**
 * Component for "FlightListing" Slices.
 */
const FlightListing = ({ slice }: FlightListingProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         <FlightFeatures {...slice} />
      </section>
   );
};

export default FlightListing;

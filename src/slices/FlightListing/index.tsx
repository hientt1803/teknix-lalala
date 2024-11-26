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
         Placeholder component for flight_listing (variation: {slice.variation}) Slices
      </section>
   );
};

export default FlightListing;

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import FlightFeatures from '@/features/flights';

/**
 * Props for `FlightListing`.
 */
export type FlightListingProps =
  SliceComponentProps<Content.FlightListingSlice>;

/**
 * Component for "FlightListing" Slices.
 */
const FlightListing = ({ slice }: FlightListingProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      <FlightFeatures {...slice} />
    </section>
  );
};

export default FlightListing;

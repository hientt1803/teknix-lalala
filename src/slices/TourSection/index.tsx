import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `TourSection`.
 */
export type TourSectionProps = SliceComponentProps<Content.TourSectionSlice>;

/**
 * Component for "TourSection" Slices.
 */
const TourSection = ({ slice }: TourSectionProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for tour_section (variation: {slice.variation}) Slices
      </section>
   );
};

export default TourSection;

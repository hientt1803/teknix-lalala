import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `FacilitiesSection`.
 */
export type FacilitiesSectionProps = SliceComponentProps<Content.FacilitiesSectionSlice>;

/**
 * Component for "FacilitiesSection" Slices.
 */
const FacilitiesSection = ({ slice }: FacilitiesSectionProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for facilities_section (variation: {slice.variation}) Slices
      </section>
   );
};

export default FacilitiesSection;

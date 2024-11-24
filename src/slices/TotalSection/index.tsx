import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `TotalSection`.
 */
export type TotalSectionProps = SliceComponentProps<Content.TotalSectionSlice>;

/**
 * Component for "TotalSection" Slices.
 */
const TotalSection = ({ slice }: TotalSectionProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for total_section (variation: {slice.variation}) Slices
      </section>
   );
};

export default TotalSection;

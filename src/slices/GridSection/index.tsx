import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `GridSection`.
 */
export type GridSectionProps = SliceComponentProps<Content.GridSectionSlice>;

/**
 * Component for "GridSection" Slices.
 */
const GridSection = ({ slice }: GridSectionProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for grid_section (variation: {slice.variation}) Slices
      </section>
   );
};

export default GridSection;

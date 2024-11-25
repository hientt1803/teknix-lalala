import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `ImagesSection`.
 */
export type ImagesSectionProps = SliceComponentProps<Content.ImagesSectionSlice>;

/**
 * Component for "ImagesSection" Slices.
 */
const ImagesSection = ({ slice }: ImagesSectionProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for images_section (variation: {slice.variation}) Slices
      </section>
   );
};

export default ImagesSection;

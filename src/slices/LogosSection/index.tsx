import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `LogosSection`.
 */
export type LogosSectionProps = SliceComponentProps<Content.LogosSectionSlice>;

/**
 * Component for "LogosSection" Slices.
 */
const LogosSection = ({ slice }: LogosSectionProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for logos_section (variation: {slice.variation}) Slices
      </section>
   );
};

export default LogosSection;

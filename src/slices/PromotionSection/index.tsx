import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `PromotionSection`.
 */
export type PromotionSectionProps = SliceComponentProps<Content.PromotionSectionSlice>;

/**
 * Component for "PromotionSection" Slices.
 */
const PromotionSection = ({ slice }: PromotionSectionProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for promotion_section (variation: {slice.variation}) Slices
      </section>
   );
};

export default PromotionSection;

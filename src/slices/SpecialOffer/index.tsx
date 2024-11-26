import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `SpecialOffer`.
 */
export type SpecialOfferProps = SliceComponentProps<Content.SpecialOfferSlice>;

/**
 * Component for "SpecialOffer" Slices.
 */
const SpecialOffer = ({ slice }: SpecialOfferProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for special_offer (variation: {slice.variation}) Slices
      </section>
   );
};

export default SpecialOffer;

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import Bounded from '@/components/common/containers/bounded';
import dynamic from 'next/dynamic';

export const PromotionCarousel = dynamic(() =>
  import('@/features/home/promotion/carousel').then(module_ => module_.default),
);
export const Promotion = dynamic(() =>
  import('@/features/home/promotion/promotion').then(
    module_ => module_.default,
  ),
);

/**
 * Props for `PromotionSection`.
 */
export type PromotionSectionProps =
  SliceComponentProps<Content.PromotionSectionSlice>;

/**
 * Component for "PromotionSection" Slices.
 */
const PromotionSection = ({ slice }: PromotionSectionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === 'carousel' && (
        <PromotionCarousel promotions={slice.primary.promotions} />
      )}
      {slice.variation === 'default' && (
        <Promotion promotions={slice.primary.promotions} />
      )}
    </Bounded>
  );
};

export default PromotionSection;

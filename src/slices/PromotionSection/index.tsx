import Bounded from '@/components/common/containers/bounded';
import PromotionCarousel from '@/features/home/promotion/carousel';
import Promotion from '@/features/home/promotion/promotion';
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
      <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         {slice.variation === 'carousel' && (
            <PromotionCarousel promotions={slice.primary.promotions} />
         )}
         {slice.variation === 'default' && <Promotion promotions={slice.primary.promotions} />}
      </Bounded>
   );
};

export default PromotionSection;

import BenefitSection from '@/features/home/benefit';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `Benefit`.
 */
export type BenefitProps = SliceComponentProps<Content.BenefitSlice>;

/**
 * Component for "Benefit" Slices.
 */
const Benefit = ({ slice }: BenefitProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         <BenefitSection benefit={slice.primary} />
      </section>
   );
};

export default Benefit;

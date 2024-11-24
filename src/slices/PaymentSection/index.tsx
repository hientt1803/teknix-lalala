import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `PaymentSection`.
 */
export type PaymentSectionProps = SliceComponentProps<Content.PaymentSectionSlice>;

/**
 * Component for "PaymentSection" Slices.
 */
const PaymentSection = ({ slice }: PaymentSectionProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for payment_section (variation: {slice.variation}) Slices
      </section>
   );
};

export default PaymentSection;

import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const PaymentBackground = dynamic(() =>
   import('@/features/home/payment/paymentBackground').then((mod) => mod.PaymentBackground),
);
export const PaymentMansoryGrid = dynamic(() =>
   import('@/features/home/payment/paymentMansoryGrid').then((mod) => mod.PaymentMansoryGrid),
);

/**
 * Props for `PaymentSection`.
 */
export type PaymentSectionProps = SliceComponentProps<Content.PaymentSectionSlice>;
export const paymentComponents: JSXMapSerializer = {
   heading2: ({ children }) => <Heading>{children}</Heading>,
   paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};

/**
 * Component for "PaymentSection" Slices.
 */
const PaymentSection = ({ slice }: PaymentSectionProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="block w-full"
      >
         <div className="relative w-full flex justify-center items-center py-48">
            {/* Background */}
            {slice.variation == 'default' && <PaymentBackground />}

            {/* Main Content */}
            <PaymentMansoryGrid slice={slice} />
         </div>
      </section>
   );
};

export default PaymentSection;

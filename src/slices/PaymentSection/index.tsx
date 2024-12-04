import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import Badge from '@/components/custom/badges/badge';
import { Button } from '@/components/ui/button';
import { PaymentCaroucel } from '@/features/home/payment/paymentCaroucel';
import { cn } from '@/lib/utils';

export const PaymentBackground = dynamic(() =>
  import('@/features/home/payment/paymentBackground').then(
    module_ => module_.PaymentBackground,
  ),
);
export const PaymentMansoryGrid = dynamic(() =>
  import('@/features/home/payment/paymentMansoryGrid').then(
    module_ => module_.PaymentMansoryGrid,
  ),
);

/**
 * Props for `PaymentSection`.
 */
export type PaymentSectionProps =
  SliceComponentProps<Content.PaymentSectionSlice>;
export const paymentComponents: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading className="!leading-normal">{children}</Heading>
  ),
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
      className="my-20 block w-full"
    >
      <div className="relative my-20 flex h-fit w-full items-center justify-center">
        {/* Background */}
        {slice.variation == 'default' && <PaymentBackground />}

        {/* Main Content */}
        {slice?.variation == 'withBackground' ? (
          <div className="w-full bg-[#fff0ec] py-24 dark:bg-[#242120] hidden md:block">
            <Bounded className="flex h-fit w-full flex-col items-center justify-center">
              <div className="z-10 flex w-full items-center justify-center gap-2">
                <div className="grid grid-cols-12 gap-20">
                  {/* List image */}
                  <div className={cn('col-span-12 md:col-span-6')}>
                    <div className="grid grid-cols-12 grid-rows-2 gap-6">
                      <div className="col-span-6 row-span-2">
                        <div className="aspect-[1/2.1] overflow-hidden rounded-xl">
                          <PrismicNextImage
                            field={slice.primary.images[0]?.image}
                            alt=""
                            className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="col-span-6">
                        <div className="aspect-square overflow-hidden rounded-xl">
                          <PrismicNextImage
                            field={slice.primary.images[1]?.image}
                            alt=""
                            className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="col-span-6">
                        <div className="aspect-square overflow-hidden rounded-xl">
                          <PrismicNextImage
                            field={slice.primary.images[2]?.image}
                            alt=""
                            className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={cn('col-span-12 mt-20 md:col-span-6')}>
                    <div className="ml-10 flex flex-col items-start justify-start gap-3">
                      <Button className="rounded-full bg-[#fefa17] px-5 py-6 text-black hover:bg-neutral-100">
                        <span className="text-base font-medium">
                          {slice?.primary?.tag}
                        </span>
                      </Button>

                      <div className="mb-5">
                        <PrismicRichText
                          field={slice?.primary?.heading}
                          components={paymentComponents}
                        />
                      </div>

                      <div className="mb-5">
                        <PrismicRichText
                          field={slice?.primary?.description}
                          components={{
                            paragraph: ({ children }) => (
                              <p className="!text-xl !text-neutral-500">
                                {children}
                              </p>
                            ),
                          }}
                        />
                      </div>

                      <div className={'mt-4 max-w-lg'}>
                        <PaymentCaroucel payments={slice.primary.payments} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Bounded>
          </div>
        ) : (
          <PaymentMansoryGrid slice={slice} />
        )}
      </div>
    </section>
  );
};

export default PaymentSection;

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import Badge from '@/components/custom/badges/badge';
import { Button } from '@/components/ui/button';
import { PaymentCaroucel } from '@/features/home/payment/paymentCaroucel';
import { cn } from '@/lib/utils';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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
   heading2: ({ children }) => <Heading className='!leading-normal'>{children}</Heading>,
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
         className="block w-full my-20"
      >
         <div className="relative w-full h-fit flex justify-center items-center my-20">
            {/* Background */}
            {slice.variation == 'default' && <PaymentBackground />}

            {/* Main Content */}
            {slice?.variation == 'withBackground' ? (
               <div className="w-full bg-[#fff0ec] dark:bg-[#242120] py-24">
                  <Bounded className="w-full h-fit flex flex-col justify-center items-center">
                     <div className="w-full flex justify-center items-center gap-2 z-10">
                        <div className=" grid grid-cols-12 gap-20">
                           {/* List image */}
                           <div className={cn('col-span-12 md:col-span-6')}>
                              <div className="grid grid-cols-12 grid-rows-2 gap-6">
                                 <div className="col-span-6 row-span-2">
                                    <div className="aspect-[1/2.1] rounded-xl overflow-hidden">
                                       <PrismicNextImage
                                          field={slice.primary.images[0]?.image}
                                          alt=""
                                          className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                                          loading="lazy"
                                       />
                                    </div>
                                 </div>
                                 <div className="col-span-6">
                                    <div className="aspect-square rounded-xl overflow-hidden">
                                       <PrismicNextImage
                                          field={slice.primary.images[1]?.image}
                                          alt=""
                                          className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                                          loading="lazy"
                                       />
                                    </div>
                                 </div>
                                 <div className="col-span-6 ">
                                    <div className="aspect-square rounded-xl overflow-hidden">
                                       <PrismicNextImage
                                          field={slice.primary.images[2]?.image}
                                          alt=""
                                          className="object-cover w-full h-full transform transition-transform hover:scale-110 duration-300"
                                          loading="lazy"
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Content */}
                           <div className={cn('mt-20 col-span-12 md:col-span-6')}>
                              <div className="flex flex-col justify-start items-start gap-3 ml-10">
                                 <Button className="bg-[#fefa17] hover:bg-neutral-100 text-black rounded-full py-6 px-5">
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
                                             <p className='!text-neutral-500 !text-xl'>{children}</p>
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

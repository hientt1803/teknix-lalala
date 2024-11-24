import { MainButton } from '@/components/common/button/mainButton';
import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { PaymentCaroucel } from '@/features/home/payment/paymentCaroucel';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { CheckIcon } from 'lucide-react';

/**
 * Props for `PaymentSection`.
 */
export type PaymentSectionProps = SliceComponentProps<Content.PaymentSectionSlice>;
export const paymentComponents: JSXMapSerializer = {
   heading2: ({ children }) => (
      <Heading as="h2" className="text-2xl md:text-6xl text-dark dark:text-white font-medium">
         {children}
      </Heading>
   ),
   paragraph: ({ children }) => (
      <Paragraph as="p" className="text-neutral-900 font-normal text-xl">
         {children}
      </Paragraph>
   ),
};

/**
 * Component for "PaymentSection" Slices.
 */
const PaymentSection = ({ slice }: PaymentSectionProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="block py-16"
      >
         <div className="relative w-full h-fit flex justify-center items-center">
            <Image
               src="/assets/images/home/payment-background.png"
               alt="Payment Image"
               className="absolute w-fit h-fit object-cover z-[2]"
            />

            <Bounded className="w-full h-full flex flex-col justify-center items-center">
               <div className="w-full h-full mx-auto flex justify-between items-center gap-2 z-10">
                  <div className="grid grid-cols-12 gap-10">
                     <div className="col-span-6">
                        <div className="grid grid-cols-12 gap-6">
                           <div className="col-span-6">
                              <PrismicNextImage
                                 field={slice.primary.images[0]?.image}
                                 alt=""
                                 width={300}
                                 height={350}
                                 className="object-cover h-[21.875rem] rounded-lg"
                              />
                           </div>
                           <div className="col-span-6 mt-12">
                              <PrismicNextImage
                                 field={slice.primary.images[1]?.image}
                                 alt=""
                                 width={300}
                                 height={350}
                                 className="object-cover h-[21.875rem] rounded-lg"
                              />
                           </div>
                           <div className="col-span-6 -mt-12">
                              <PrismicNextImage
                                 field={slice.primary.images[2]?.image}
                                 alt=""
                                 width={300}
                                 height={350}
                                 className="object-cover h-[21.875rem] rounded-lg"
                              />
                           </div>
                           <div className="col-span-6">
                              <PrismicNextImage
                                 field={slice.primary.images[3]?.image}
                                 alt=""
                                 width={300}
                                 height={350}
                                 className="object-cover h-[21.875rem] rounded-lg"
                              />
                           </div>
                        </div>
                     </div>
                     <div className="col-span-6">
                        <MainButton
                           variant="default"
                           className="bg-neutral-100 py-6 px-7 text-neutral-900 text-sm font-medium mb-5"
                        >
                           {slice.primary.tag}
                        </MainButton>
                        <div className="mb-5">
                           <PrismicRichText
                              field={slice.primary.heading}
                              components={paymentComponents}
                           />
                        </div>
                        <div className="mb-5">
                           <PrismicRichText
                              field={slice.primary.title}
                              components={{
                                 paragraph: ({ children }) => (
                                    <p className="text-neutral-600 dark:text-neutral-300 font-[400] text-2xl">
                                       {children}
                                    </p>
                                 ),
                              }}
                           />
                        </div>

                        <div className="my-10">
                           <div className="grid grid-cols-12 gap-3">
                              {slice.primary.benefits.map((bene, index) => (
                                 <div className="col-span-6" key={index}>
                                    <div className="flex gap-1 items-center">
                                       <CheckIcon className="w-6 h-6 text-green-800" />
                                       <span className="text-lg font-medium text-black dark:text-neutral-200">
                                          {bene.text}
                                       </span>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <PrismicRichText
                           field={slice.primary.payment_label}
                           components={{
                              paragraph: ({ children }) => (
                                 <p className="text-neutral-900 dark:text-neutral-300 font-normal text-md">{children}</p>
                              ),
                           }}
                        />

                        <div className="mt-3">
                           <PaymentCaroucel payments={slice.primary.payments} />
                        </div>
                     </div>
                  </div>
               </div>
            </Bounded>
         </div>
      </section>
   );
};

export default PaymentSection;

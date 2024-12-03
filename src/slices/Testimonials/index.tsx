import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import Heading from '@/components/common/typography/heading';
import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const TestimonialWithGridVariantList = dynamic(() =>
   import('@/features/slice-global/testimonials/testimonial-grid-variant-list').then(
      (mod) => mod.TestimonialWithGridVariantList,
   ),
);
export const TestimonialList = dynamic(() =>
   import('@/features/slice-global/testimonials/testimonial-list').then(
      (mod) => mod.TestimonialList,
   ),
);

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = ({ slice }: TestimonialsProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="my-20"
      >
         {slice?.variation == 'default' && (
            <div className="w-full relative overflow-hidden">
               {/* Left title */}
               <Bounded>
                  <Button className="bg-[#fefa17] hover:bg-neutral-100 border border-neutral-200 text-black rounded-full py-6 px-5">
                     <div className="flex items-center gap-0">
                        <Image
                           src="/assets/images/testimonials/client1.png"
                           width={22}
                           height={22}
                           alt=""
                           className="w-6 h-6"
                        />
                        <Image
                           src="/assets/images/testimonials/client2.png"
                           width={22}
                           height={22}
                           alt=""
                           className="-ml-2 w-6 h-6"
                        />
                        <Image
                           src="/assets/images/testimonials/client3.png"
                           width={22}
                           height={22}
                           alt=""
                           className="-ml-2 w-6 h-6"
                        />
                     </div>
                     <span className="text-sm font-medium">Testimonials</span>
                  </Button>

                  <PrismicRichText
                     field={slice?.primary?.heading}
                     components={{
                        heading1: ({ children }) => (
                           <Heading className="mt-2 md:mt-3">{children}</Heading>
                        ),
                     }}
                  />
               </Bounded>

               <div className="w-full my-16 grid grid-cols-12 gap-3">
                  <div className="col-span-1 md:col-span-3" />
                  <div className="col-span-1 md:col-span-9">
                     <TestimonialList />
                  </div>
               </div>

               {/* Background */}
               <Image
                  src={'/assets/images/home/bg-payment-plane.svg'}
                  alt=""
                  className="hidden md:absolute top-0 right-20 object-cover"
               />
               <Image
                  src={'/assets/images/home/payment-background.png'}
                  alt=""
                  className="w-[90%] h-[12.5rem] md:w-[60%] md:h-[15.625rem] object-contain -mt-28"
               />

               <div className="absolute bottom-0 left-0 right-0 w-full h-[1px] bg-neutral-200" />
            </div>
         )}

         {slice?.variation == 'grid' && (
            <Bounded className="w-full h-full">
               <div className="relative w-full h-full">
                  <div className="flex flex-col justify-center items-center gap-3">
                     <Button className="bg-[#fefa17] hover:bg-neutral-100 border border-neutral-200 text-black rounded-full py-6 px-5 mx-auto">
                        <div className="flex items-center gap-0">
                           <Image
                              src="/assets/images/testimonials/client1.png"
                              width={22}
                              height={22}
                              alt=""
                              className="w-6 h-6"
                           />
                           <Image
                              src="/assets/images/testimonials/client2.png"
                              width={22}
                              height={22}
                              alt=""
                              className="-ml-2 w-6 h-6"
                           />
                           <Image
                              src="/assets/images/testimonials/client3.png"
                              width={22}
                              height={22}
                              alt=""
                              className="-ml-2 w-6 h-6"
                           />
                        </div>
                        <span className="text-sm font-medium">Testimonials</span>
                     </Button>

                     <PrismicRichText
                        field={slice?.primary?.heading}
                        components={{
                           heading1: ({ children }) => (
                              <Heading className="mt-2 md:mt-3 text-center">{children}</Heading>
                           ),
                        }}
                     />
                  </div>

                  <div className="">
                     <div className="grid grid-cols-1 md:grid-cols-2 py-16">
                        <PrismicNextImage
                           field={slice?.primary?.image}
                           alt=""
                           className="w-[75%] h-[75%] object-contain z-20"
                        />

                        <TestimonialWithGridVariantList />
                     </div>
                  </div>

                  <div className="border border-neutral-700 rounded-3xl p-0">
                     <div className="flex justify-between items-center p-0">
                        {slice?.primary?.supports?.map((sup, index) => (
                           <div
                              key={index}
                              className={`flex justify-start items-center gap-2 p-6 w-1/3 ${
                                 index < slice.primary.supports.length - 1
                                    ? 'border-r border-neutral-300'
                                    : ''
                              }`}
                           >
                              {/* icon */}
                              <div className="flex flex-col justify-center items-center p-5">
                                 <PrismicNextImage field={sup?.icon} alt="" className="w-12 h-12" />
                              </div>

                              {/* content */}
                              <div className="flex flex-col justify-center items-start gap-1">
                                 <span className="font-bold text-lg">{sup?.heading}</span>
                                 <span className="text-sm text-neutral-500">
                                    {sup?.description}
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Background */}
                  <Image
                     src={'/assets/images/testimonials/bg-testimonial.8610a296.png'}
                     alt=""
                     className="absolute top-[40%] -left-48 object-contain z-[1]"
                  />
               </div>
            </Bounded>
         )}
      </section>
   );
};

export default Testimonials;

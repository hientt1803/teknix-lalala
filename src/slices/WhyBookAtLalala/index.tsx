import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import Image from 'next/image';

/**
 * Props for `WhyBookAtLalala`.
 */
export type WhyBookAtLalalaProps = SliceComponentProps<Content.WhyBookAtLalalaSlice>;
export const WhyBookComponents: JSXMapSerializer = {
   heading1: ({ children }) => <Heading className="!leading-normal">{children}</Heading>,
   paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};

/**
 * Component for "WhyBookAtLalala" Slices.
 */
const WhyBookAtLalala = ({ slice }: WhyBookAtLalalaProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="my-20"
      >
         {slice.variation == 'default' && (
            <Bounded className="relative">
               <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-7 flex flex-col justify-start items-start gap-3">
                     <Button className="bg-[#fefa17] hover:bg-neutral-100 text-black rounded-full py-6 px-5">
                        <Image src="/assets/images/about/real.svg" width={30} height={30} alt="" />
                        <span className="text-base font-medium">{slice?.primary?.button_text}</span>
                     </Button>

                     <PrismicRichText
                        field={slice?.primary?.heading}
                        components={{
                           paragraph: ({ children }) => (
                              <p className="mt-2 md:mt-3 font-normal block text-neutral-900 dark:text-neutral-100 text-6xl">
                                 {children}
                              </p>
                           ),
                        }}
                     />
                     <PrismicRichText
                        field={slice?.primary?.heading_desc}
                        components={{
                           paragraph: ({ children }) => (
                              <p className="mt-2 md:mt-3 font-normal block text-neutral-500 dark:text-neutral-400 text-xl">
                                 {children}
                              </p>
                           ),
                        }}
                     />
                  </div>

                  <div className="col-span-5">
                     <Image
                        src={'/assets/images/about/flight.png'}
                        alt=""
                        width={250}
                        height={150}
                        className="mb-10 -ml-14"
                     />
                     <PrismicRichText
                        field={slice?.primary?.sub_heading}
                        components={{
                           paragraph: ({ children }) => (
                              <p className="mt-2 md:mt-3 font-semibold text-neutral-800 dark:text-neutral-300 text-2xl">
                                 {children}
                              </p>
                           ),
                        }}
                     />
                  </div>
               </div>

               <PrismicNextImage
                  field={slice?.primary?.main_image}
                  alt=""
                  className="rounded-2xl -mb-64 mt-20"
               />
            </Bounded>
         )}

         <div className="mt-20">
            {slice.variation == 'withoutImage' && (
               <div className="bg-[#ffec88] dark:bg-[#ffdc88]">
                  <Bounded className="pt-72 pb-36">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                           <Button className="bg-white hover:bg-neutral-100 text-black hover:text-neutral-900 w-fit rounded-full py-6 px-5">
                              <Image
                                 src="/assets/images/home/banner-earth.png"
                                 width={20}
                                 height={20}
                                 alt=""
                              />
                              <span className="text-base font-medium">
                                 {slice?.primary?.button_text}
                              </span>
                           </Button>

                           <PrismicRichText
                              field={slice?.primary?.heading}
                              components={{
                                 heading1: ({ children }) => (
                                    <Heading className="!leading-normal dark:text-neutral-900">
                                       {children}
                                    </Heading>
                                 ),
                              }}
                           />
                           <PrismicRichText
                              field={slice?.primary?.heading_desc}
                              components={{
                                 paragraph: ({ children }) => (
                                    <p className="mt-2 md:mt-3 font-normal block text-neutral-700 dark:text-neutral-700 text-xl">
                                       {children}
                                    </p>
                                 ),
                              }}
                           />

                           <div className="flex justify-between items-center flex-wrap gap-2">
                              {slice?.primary?.ads?.map((ad, index) => (
                                 <div
                                    className="flex flex-col gap-1 justify-start items-start"
                                    key={index}
                                 >
                                    <span className="text-4xl font-semibold dark:text-neutral-50">
                                       {ad?.digit}
                                    </span>
                                    <span className="text-xl font-normal text-neutral-600 dark:text-neutral-500 max-w-36">
                                       {ad?.text}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className="grid grid-cols-2 place-content-center place-items-center gap-6 h-full">
                           <div className="h-full">
                              <div className="flex flex-col gap-3 justify-center items-center bg-[#fff0ec] border boder-neutral-300 rounded-xl p-6">
                                 <PrismicNextImage
                                    field={slice?.primary?.features[0]?.icon}
                                    alt=""
                                    className="w-8 h-8"
                                 />
                                 <span className="text-xl font-semibold text-neutral-800 dark:text-neutral-900">
                                    {slice?.primary?.features[0]?.title}
                                 </span>
                                 <span className="text-xl text-center font-normal text-neutral-500">
                                    {slice?.primary?.features[0]?.description}
                                 </span>
                              </div>
                              <div className="flex flex-col gap-3 justify-center items-center bg-[#e3f0ff] border boder-neutral-300 rounded-xl p-6 mt-6">
                                 <PrismicNextImage
                                    field={slice?.primary?.features[1]?.icon}
                                    alt=""
                                    className="w-8 h-8"
                                 />
                                 <span className="text-xl font-semibold text-neutral-800 dark:text-neutral-900">
                                    {slice?.primary?.features[1]?.title}
                                 </span>
                                 <span className="text-xl text-center font-normal text-neutral-500">
                                    {slice?.primary?.features[1]?.description}
                                 </span>
                              </div>
                           </div>
                           <div className="h-full -mt-14">
                              <div className="flex flex-col gap-3 justify-center items-center bg-[#e4f9f9] border boder-neutral-300 rounded-xl p-6">
                                 <PrismicNextImage
                                    field={slice?.primary?.features[2]?.icon}
                                    alt=""
                                    className="w-8 h-8"
                                 />
                                 <span className="text-xl font-semibold text-neutral-800 dark:text-neutral-900">
                                    {slice?.primary?.features[2]?.title}
                                 </span>
                                 <span className="text-xl text-center font-normal text-neutral-500">
                                    {slice?.primary?.features[2]?.description}
                                 </span>
                              </div>
                              <div className="flex flex-col gap-3 justify-center items-center bg-[#efefeb] border boder-neutral-300 rounded-xl p-6 mt-6">
                                 <PrismicNextImage
                                    field={slice?.primary?.features[3]?.icon}
                                    alt=""
                                    className="w-8 h-8"
                                 />
                                 <span className="text-xl font-semibold text-neutral-800 dark:text-neutral-900">
                                    {slice?.primary?.features[3]?.title}
                                 </span>
                                 <span className="text-xl text-center font-normal text-neutral-500">
                                    {slice?.primary?.features[3]?.description}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </Bounded>
               </div>
            )}
         </div>
      </section>
   );
};

export default WhyBookAtLalala;

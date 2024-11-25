import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Separator } from '@/components/ui/separator';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import React from 'react';

/**
 * Props for `TotalSection`.
 */
export type TotalSectionProps = SliceComponentProps<Content.TotalSectionSlice>;
export const totalComponents: JSXMapSerializer = {
   heading3: ({ children }) => (
      <Heading as="h3" className="text-3xl md:text-6xl font-bold text-white">
         {children}
      </Heading>
   ),
   paragraph: ({ children }) => (
      <Paragraph as="p" className="text-white dark:text-white text-lg">
         {children}
      </Paragraph>
   ),
};

/**
 * Component for "TotalSection" Slices.
 */
const TotalSection = ({ slice }: TotalSectionProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="py-16 min-w-full w-full"
      >
         <Bounded>
            <div className="relative w-full min-h-[18.75rem] md:min-h-[18.75rem] h-full flex justify-center items-center">
               {/* Background image */}
               <div className="absolute inset-0 w-full min-h-[18.75rem] md:min-h-[18.75rem] h-full">
                  <PrismicNextImage
                     field={slice.primary.background}
                     alt=""
                     height={350}
                     className="w-full min-h-[18.75rem] md:min-h-[18.75rem] h-full object-fill lg:object-contain z-[1]"
                  />
               </div>

               <div className="w-full h-full flex flex-col justify-center items-center">
                  <div className="w-full max-w-full md:max-w-[62.5rem] h-full grid grid-cols-12 place-content-center place-items-start gap-3 lg:flex lg:justify-between lg:items-center lg:flex-wrap lg:gap-2 z-10 p-5">
                     {slice.primary.totals.map((total, index) => (
                        <div key={index} className="col-span-6">
                           <div className="flex gap-10 items-center">
                              <div className="flex flex-col justify-start items-start gap-3">
                                 <PrismicRichText
                                    field={total.title}
                                    components={totalComponents}
                                 />
                                 <PrismicRichText
                                    field={total.description}
                                    components={totalComponents}
                                 />
                              </div>
                              {index !== slice.primary.totals.length - 1 && (
                                 <Separator
                                    orientation="vertical"
                                    className="mx-6 w-[1px] h-16"
                                 />
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </Bounded>
      </section>
   );
};

export default TotalSection;

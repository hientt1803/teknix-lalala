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
         className="block py-16"
      >
         <Bounded className="relative w-full h-fit flex justify-center items-center">
            <PrismicNextImage
               field={slice.primary.background}
               alt=""
               className="absolute w-fit h-fit object-cover z-[2]"
            />

            <div className="w-full h-full flex flex-col justify-center items-center">
               <div className="w-full max-w-[800px] h-full mx-auto flex justify-between items-center gap-2 z-10">
                  {slice.primary.totals.map((total, index) => (
                     <React.Fragment key={index}>
                        <div className="flex flex-col justify-start items-start gap-3">
                           <PrismicRichText field={total.title} components={totalComponents} />
                           <PrismicRichText
                              field={total.description}
                              components={totalComponents}
                           />
                        </div>
                        {index !== slice.primary.totals.length - 1 && (
                           <Separator orientation="vertical" className="mx-6 w-[1px] h-16" />
                        )}
                     </React.Fragment>
                  ))}
               </div>
            </div>
         </Bounded>
      </section>
   );
};

export default TotalSection;

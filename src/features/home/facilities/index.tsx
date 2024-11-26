import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import { facilityComponents } from '@/slices/FacilitiesSection';
import { generateIcon } from '@/utilities/generate';
import { Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const FacilitiCaroucel = dynamic(
   () => import('./components/faciliti-caroucel').then((mod) => mod.FacilitiCaroucel),
   {
      ssr: false,
   },
);

export const FacilitiesContainer = ({ slice }: { slice: Content.FacilitiesSectionSlice }) => {
   return (
      <div className="grid grid-cols-12 gap-6">
         <div className="col-span-7">
            <PrismicRichText field={slice.primary.heading} components={facilityComponents} />
            <PrismicRichText
               field={slice.primary.body}
               components={{
                  paragraph: ({ children }) => (
                     <Paragraph className="!text-base text-neutral-600 dark:text-neutral-400">
                        {children}
                     </Paragraph>
                  ),
               }}
            />

            <div className="mt-2 mb-5">
               <PrismicNextLink field={slice.primary.button_link}>
                  <Button className="font-medium">{slice.primary.button_text}</Button>
               </PrismicNextLink>
            </div>

            <div className="grid grid-cols-2 gap-5 place-content-between place-items-start mt-6">
               {slice.primary.facilities.map((facility, index) => (
                  <div key={index} className="col-span-1 flex items-center gap-2">
                     <span>
                        {generateIcon({
                           iconType: facility.icon || '',
                           className: 'text-yellow-600',
                        })}
                     </span>
                     <span className='font-medium'>{facility.name}</span>
                  </div>
               ))}
            </div>
         </div>
         <div className="col-span-5">
            <FacilitiCaroucel destinations={slice.primary.destinations} />
         </div>
      </div>
   );
};

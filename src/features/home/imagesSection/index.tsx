import Bounded from '@/components/common/containers/bounded';
import Badge from '@/components/custom/badges/badge';
import { imageComponent } from '@/slices/ImagesSection';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import React from 'react';

export const ImageSection = ({ slice }: { slice: Content.ImagesSectionSlice }) => {
   return (
      <Bounded>
         <div className="grid grid-cols-12 gap-6 place-items-center">
            <div className="col-span-12 md:col-span-6">
               <div className="columns-2 lg:columns-3 gap-3 mx-auto">
                  {slice.primary.images.map((image, index) => (
                     <div
                        className="w-full md:max-w-[11.25rem] h-fit mb-3 rounded-[2.5rem] overflow-hidden"
                        key={index}
                     >
                        <PrismicNextImage
                           field={image.image}
                           alt=""
                           loading="lazy"
                           className="w-full h-full transform transition-transform group-hover:scale-110 duration-300"
                        />
                     </div>
                  ))}
               </div>
            </div>

            <div className="col-span-12 md:col-span-6 mt-10 md:mt-0">
               <div className="flex flex-col justify-start items-start gap-6">
                  <Badge color="white" className="px-7 py-2 text-lg cursor-pointer">
                     {slice.primary.tag || ''}
                  </Badge>
                  <PrismicRichText field={slice.primary.heading} components={imageComponent} />
                  <PrismicRichText field={slice.primary.body} components={imageComponent} />
               </div>
            </div>
         </div>
      </Bounded>
   );
};

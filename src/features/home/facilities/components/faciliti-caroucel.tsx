'use client';

import {
   Carousel,
   CarouselContent,
   CarouselItem
} from '@/components/ui/carousel';
import { Content, GroupField } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Simplify } from '../../../../../prismicio-types';

export const FacilitiCaroucel = ({
   destinations,
}: {
   destinations: GroupField<Simplify<Content.FacilitiesSectionSliceDefaultPrimaryDestinationsItem>>;
}) => {
   const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

   return (
      <Carousel
         className="w-fit"
         opts={{
            align: 'start',
            loop: true,
         }}
         plugins={[plugin.current]}
         onMouseEnter={plugin.current.stop}
         onMouseLeave={plugin.current.reset}
      >
         <CarouselContent>
            {destinations.map((des, index) => (
               <CarouselItem key={index} className="w-full">
                  <div className="flex justify-between items-center gap-4 pointer-events-none">
                     <div className="aspect-video w-full h-full rounded-lg overflow-hidden">
                        <PrismicNextImage
                           field={des.image}
                           alt=""
                           className="w-full h-full object-cover"
                        />
                     </div>
                     <div>
                        <PrismicRichText field={des.type} />
                        <PrismicRichText field={des.name} />
                        <PrismicNextLink field={des.button_link}>
                           <div className="bg-transparent text-yellow-600 flex justify-start items-center gap-0">
                              <span className="font-medium">{des.button_text}</span>
                              <ArrowRight className="w-5 h-5 ml-3" />
                           </div>
                        </PrismicNextLink>
                     </div>
                  </div>
               </CarouselItem>
            ))}
         </CarouselContent>
         {/* <CarouselPrevious />
         <CarouselNext /> */}
      </Carousel>
   );
};

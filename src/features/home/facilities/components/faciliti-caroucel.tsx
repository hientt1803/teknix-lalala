'use client';

import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';
import { Content, GroupField } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Simplify } from '../../../../../prismicio-types';
import { Card } from '@/components/ui/card';

export const FacilitiCaroucel = ({
   destinations,
}: {
   destinations: GroupField<Simplify<Content.FacilitiesSectionSliceDefaultPrimaryDestinationsItem>>;
}) => {
   const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

   return (
      <Card className="p-5 rounded-lg overflow-hidden">
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
            <CarouselContent className="w-fit">
               {destinations.map((des, index) => (
                  <CarouselItem key={index} className="w-full">
                     <div className="grid grid-cols-7 items-center gap-4">
                        <div className="col-span-3 aspect-auto md:aspect-[4/6] rounded-lg overflow-hidden">
                           <PrismicNextImage
                              field={des.image}
                              alt=""
                              className="w-full h-full object-cover"
                           />
                        </div>
                        <div className="col-span-4">
                           <PrismicRichText
                              field={des.type}
                              components={{
                                 paragraph: ({ children }) => (
                                    <Paragraph className="font-[500] !text-sm text-slate-800 mb-2 pointer-events-none">
                                       {children}
                                    </Paragraph>
                                 ),
                              }}
                           />
                           <PrismicRichText
                              field={des.name}
                              components={{
                                 heading3: ({ children }) => (
                                    <Heading className="text-base font-[600] text-wrap">
                                       {children}
                                    </Heading>
                                 ),
                              }}
                           />
                           <div className="mt-4 w-fit py-3 px-2 hover:bg-yellow-100 hover:text-yellow-800 hover:rounded-lg">
                              <PrismicNextLink field={des.button_link}>
                                 <div className="bg-transparent text-yellow-600 flex justify-start items-center gap-0">
                                    <span className="font-medium">{des.button_text}</span>
                                    <ArrowRight className="w-5 h-5 ml-3" />
                                 </div>
                              </PrismicNextLink>
                           </div>
                        </div>
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 w-10 h-10 bg-slate-800 hover:bg-slate-900 border-0 bg-opacity-20 text-white hover:text-slate-100" />
            <CarouselNext className="-right-0 w-10 h-10 bg-slate-800 hover:bg-slate-900 border-0 bg-opacity-20 text-white hover:text-slate-100" />
         </Carousel>
      </Card>
   );
};

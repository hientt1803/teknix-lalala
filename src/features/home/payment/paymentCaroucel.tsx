'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Content, GroupField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import Autoplay from 'embla-carousel-autoplay';
import { Simplify } from '../../../../prismicio-types';
import React from 'react';

export const PaymentCaroucel = ({
   payments,
}: {
   payments: GroupField<Simplify<Content.PaymentSectionSliceDefaultPrimaryPaymentsItem>>;
}) => {
   const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

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
            {payments.map((payment, index) => (
               <CarouselItem key={index} className="basis-1/4">
                  <div className="border rounded-lg px-5 py-2 flex justify-center items-center pointer-events-none">
                     <PrismicNextImage
                        field={payment.logo}
                        alt=""
                        className="w-fit h-[1.875rem] object-contain"
                     />
                  </div>
               </CarouselItem>
            ))}
            {payments.map((payment, index) => (
               <CarouselItem key={index} className="basis-1/4">
                  <div className="border rounded-lg px-5 py-2 flex justify-center items-center pointer-events-none">
                     <PrismicNextImage
                        field={payment.logo}
                        alt=""
                        className="w-fit h-[1.875rem] object-contain"
                     />
                  </div>
               </CarouselItem>
            ))}
         </CarouselContent>
         {/* <CarouselPrevious />
         <CarouselNext /> */}
      </Carousel>
   );
};

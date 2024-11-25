'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Content, GroupField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import Autoplay from 'embla-carousel-autoplay';
import { Simplify } from '../../../../prismicio-types';

export const PaymentCaroucel = ({
   payments,
}: {
   payments: GroupField<Simplify<Content.PaymentSectionSliceDefaultPrimaryPaymentsItem>>;
}) => {
   return (
      <Carousel
         className="w-fit"
         opts={{
            align: 'start',
            loop: true,
         }}
         plugins={[
            Autoplay({
               delay: 2000,
            }),
         ]}
      >
         <CarouselContent>
            {payments.map((payment, index) => (
               <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="border rounded-md px-5 py-2 flex justify-center items-center">
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

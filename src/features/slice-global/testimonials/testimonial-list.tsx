import React from 'react';
import { TestimonialCard } from './testimonial-card';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';

export const TestimonialList = () => {
   return (
      <React.Fragment>
         <Carousel
            className="w-fit h-full"
            opts={{
               align: 'start',
               loop: true,
            }}
         >
            <CarouselContent>
               {Array(5)
                  .fill(1)
                  .map((_, index) => (
                     <CarouselItem key={index} className="basis-1/2 md:basic-1/3 lg:basis-1/4">
                        <TestimonialCard />
                     </CarouselItem>
                  ))}
            </CarouselContent>

            <CarouselPrevious className="absolute top-[130%] left-[15%] lg:left-[35%] xl:left-[60%] bg-neutral-200 text-neutral-900 z-[9999]" />
            <CarouselNext className="absolute top-[130%] right-[80%] lg:right-[60%] xl:right-[35%] bg-neutral-200 text-neutral-900 z-[9999]" />
         </Carousel>
      </React.Fragment>
   );
};

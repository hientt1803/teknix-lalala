import React from 'react';
import { TestimonialCard } from './testimonial-card';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';

export const TestimonialWithGridVariantList = () => {
   return (
      <React.Fragment>
         <Carousel
            className="w-[25rem]"
            opts={{
               align: 'start',
               loop: true,
            }}
         >
            <CarouselContent className='p-5'>
               {Array(5)
                  .fill(1)
                  .map((_, index) => (
                     <CarouselItem key={index} className="basis-1/1 w-[25rem]">
                        <TestimonialCard />
                     </CarouselItem>
                  ))}
            </CarouselContent>

            <CarouselPrevious className="bg-neutral-200 text-neutral-900 z-[9999]" />
            <CarouselNext className="bg-neutral-200 text-neutral-900 z-[9999]" />
         </Carousel>
      </React.Fragment>
   );
};

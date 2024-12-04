import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { TestimonialCard } from './testimonial-card';

export const TestimonialList = () => {
  return (
    <React.Fragment>
      <Carousel
        className="h-full w-fit"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 })
            .fill(1)
            .map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basic-1/3 basis-1/2 lg:basis-1/4"
              >
                <TestimonialCard />
              </CarouselItem>
            ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-[15%] top-[130%] z-[9999] bg-neutral-200 text-neutral-900 lg:left-[35%] xl:left-[60%]" />
        <CarouselNext className="absolute right-[80%] top-[130%] z-[9999] bg-neutral-200 text-neutral-900 lg:right-[60%] xl:right-[35%]" />
      </Carousel>
    </React.Fragment>
  );
};

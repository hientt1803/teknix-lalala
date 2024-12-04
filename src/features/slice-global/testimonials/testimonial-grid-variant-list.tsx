import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { TestimonialCard } from './testimonial-card';

export const TestimonialWithGridVariantList = () => {
  return (
    <React.Fragment>
      <Carousel
        className="w-full md:w-[25rem]"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="p-5">
          {Array.from({ length: 5 })
            .fill(1)
            .map((_, index) => (
              <CarouselItem key={index} className="basis-1/1 w-[25rem]">
                <TestimonialCard />
              </CarouselItem>
            ))}
        </CarouselContent>

        <CarouselPrevious className="z-[9999] hidden md:block bg-neutral-200 text-neutral-900" />
        <CarouselNext className="z-[9999] hidden md:block bg-neutral-200 text-neutral-900" />
      </Carousel>
    </React.Fragment>
  );
};

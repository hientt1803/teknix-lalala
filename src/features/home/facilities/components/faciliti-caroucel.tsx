'use client';

import { Content, GroupField } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight } from 'lucide-react';
import React from 'react';

import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Simplify } from '../../../../../prismicio-types';

export const FacilitiCaroucel = ({
  destinations,
}: {
  destinations: GroupField<
    Simplify<Content.FacilitiesSectionSliceDefaultPrimaryDestinationsItem>
  >;
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <Card className="overflow-hidden rounded-lg p-5">
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
                <div className="col-span-3 aspect-auto overflow-hidden rounded-lg md:aspect-[4/6]">
                  <PrismicNextImage
                    field={des.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="col-span-4">
                  <PrismicRichText
                    field={des.type}
                    components={{
                      paragraph: ({ children }) => (
                        <Paragraph className="pointer-events-none mb-2 !text-sm font-[500] text-neutral-800">
                          {children}
                        </Paragraph>
                      ),
                    }}
                  />
                  <PrismicRichText
                    field={des.name}
                    components={{
                      heading3: ({ children }) => (
                        <Heading className="text-wrap text-base font-[600]">
                          {children}
                        </Heading>
                      ),
                    }}
                  />
                  <div className="mt-4 w-fit px-2 py-3 hover:rounded-lg hover:bg-yellow-100 hover:text-yellow-800">
                    <PrismicNextLink field={des.button_link}>
                      <div className="flex items-center justify-start gap-0 bg-transparent text-yellow-600">
                        <span className="font-medium">{des.button_text}</span>
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </div>
                    </PrismicNextLink>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-3 h-10 w-10 border-0 bg-neutral-800 bg-opacity-20 text-white hover:bg-neutral-900 hover:text-neutral-100" />
        <CarouselNext className="-right-0 h-10 w-10 border-0 bg-neutral-800 bg-opacity-20 text-white hover:bg-neutral-900 hover:text-neutral-100" />
      </Carousel>
    </Card>
  );
};

import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';

import Heading from '@/components/common/typography/heading';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type PromotionCarouselProps = {
  promotions: Content.PromotionSectionSliceCarouselPrimaryPromotionsItem[];
};
const PromotionCarousel = ({ promotions }: PromotionCarouselProps) => {
  const item = promotions.map((promotion, index) => (
    <CarouselItem
      key={index}
      className="pointer-events-none aspect-video md:basis-1/2 lg:basis-1/3"
    >
      <div className="group relative z-0 flex w-full flex-1 overflow-hidden rounded-2xl">
        <div className="aspect-video h-60 w-full"></div>
        <PrismicNextImage
          alt=""
          field={promotion.background_image}
          className="absolute inset-0 h-full w-full rounded-2xl object-cover text-transparent transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 inset-y-0 p-4 sm:p-8">
          <div
            className={cn('flex h-full flex-1', {
              'items-end justify-end text-end text-white':
                promotion.type === 'right',
              'items-start justify-start text-start': promotion.type === 'left',
            })}
          >
            <div
              className={cn('flex h-full flex-col justify-between', {
                'items-start': promotion.type === 'left',
                'items-end': promotion.type === 'right',
              })}
            >
              <PrismicRichText
                field={promotion.sub_heading}
                components={{
                  heading3: ({ children }) => (
                    <Heading
                      size="sm"
                      className={cn('!text-base font-normal', {
                        'text-white': promotion.type === 'right',
                        'rounded-lg bg-yellow-400 px-2 py-1':
                          promotion.withbackgroundtext,
                      })}
                    >
                      {children}
                    </Heading>
                  ),
                }}
              />

              <div className="space-y-1">
                <PrismicRichText
                  field={promotion.heading}
                  components={{
                    heading2: ({ children }) => (
                      <Heading
                        size="sm"
                        className={cn('!text-2xl', {
                          'text-white': promotion.type === 'right',
                          'rounded-lg bg-yellow-400 px-2 py-1':
                            promotion.withbackgroundtext,
                        })}
                      >
                        {children}
                      </Heading>
                    ),
                  }}
                />
                <PrismicRichText
                  field={promotion.heading2}
                  components={{
                    heading2: ({ children }) => (
                      <Heading
                        size="sm"
                        className={cn('!text-2xl', {
                          'text-white': promotion.type === 'right',
                          'rounded-lg bg-yellow-400 px-2 py-1':
                            promotion.withbackgroundtext,
                        })}
                      >
                        {children}
                      </Heading>
                    ),
                  }}
                />
              </div>
              <Button
                className={cn('rounded-full px-8 py-6', {
                  'bg-yellow-400 text-neutral-900 hover:bg-neutral-900 hover:text-white':
                    promotion.withbackgroundtext,
                })}
              >
                {promotion.button_text}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="z-[1] aspect-video h-full w-full"></div>
      </div>
    </CarouselItem>
  ));
  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
      }}
    >
      <CarouselContent>{item}</CarouselContent>
      <CarouselPrevious className="invisible left-2 transition-all ease-in group-hover:visible" />
      <CarouselNext className="invisible right-2 transition-all ease-in group-hover:visible" />
      <CarouselDots className="absolute inset-x-0 bottom-3" />
    </Carousel>
  );
};

export default PromotionCarousel;

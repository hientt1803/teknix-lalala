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
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { ArrowRight } from 'lucide-react';

type PromotionCarouselProps = {
   promotions: Content.PromotionSectionSliceCarouselPrimaryPromotionsItem[];
};
const PromotionCarousel = ({ promotions }: PromotionCarouselProps) => {
   const item = promotions.map((promotion, index) => (
      <CarouselItem
         key={index}
         className="aspect-video  md:basis-1/2 lg:basis-1/3 pointer-events-none"
      >
         <div className="relative flex w-full group rounded-2xl z-0 overflow-hidden flex-1">
            <div className="aspect-video w-full h-60"></div>
            <PrismicNextImage
               alt=""
               field={promotion.background_image}
               className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 absolute inset-0 h-full w-full text-transparent"
            />
            <div className="absolute inset-y-0 inset-x-0 p-4 sm:p-8">
               <div
                  className={cn('flex flex-1 h-full', {
                     'justify-end items-end text-end text-white': promotion.type === 'right',
                     'justify-start items-start text-start': promotion.type === 'left',
                  })}
               >
                  <div
                     className={cn('flex flex-col h-full justify-between ', {
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
                                    'bg-yellow-400 px-2 py-1 rounded-lg':
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
                                       'bg-yellow-400 px-2 py-1 rounded-lg ':
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
                                       'bg-yellow-400 px-2 py-1 rounded-lg ':
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
                        className={cn('px-8 py-6 rounded-full', {
                           'bg-yellow-400 text-slate-900 hover:bg-slate-900 hover:text-white':
                              promotion.withbackgroundtext,
                        })}
                     >
                        {promotion.button_text}
                        <ArrowRight className="w-4 h-4" />
                     </Button>
                  </div>
               </div>
            </div>
            <div className="aspect-video w-full h-full z-[1]"></div>
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
         <CarouselPrevious className="left-2 invisible group-hover:visible transition-all ease-in" />
         <CarouselNext className="right-2 invisible group-hover:visible transition-all ease-in" />
         <CarouselDots className="absolute inset-x-0 bottom-3" />
      </Carousel>
   );
};

export default PromotionCarousel;

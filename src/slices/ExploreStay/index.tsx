import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import {
   Carousel,
   CarouselContent,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel';
import { ExploreStayList } from '@/features/slice-global/explore-stay/explore-stay-list';
import { getHotDestination } from '@/services/global';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';

/**
 * Props for `ExploreStay`.
 */
export type ExploreStayProps = SliceComponentProps<Content.ExploreStaySlice>;
const components: JSXMapSerializer = {
   heading2: ({ children }) => <Heading>{children}</Heading>,
   paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
/**
 * Component for "ExploreStay" Slices.
 */
const ExploreStay = async ({ slice }: ExploreStayProps): Promise<JSX.Element> => {
   const topDestination = await getHotDestination();

   return (
      <Bounded
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="py-0 md:py-16"
      >
         <Carousel
            opts={{
               align: 'start',
               loop: true,
            }}
         >
            <div className="relative flex  sm:items-end justify-between mb-12 lg:mb-16 text-neutral-900 dark:text-neutral-50">
               <div className="max-w-2xl">
                  <PrismicRichText field={slice.primary.heading} components={components} />
                  <PrismicRichText field={slice.primary.body} components={components} />
               </div>
               <div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
                  <div className="relative flex items-center text-neutral-900 dark:text-neutral-300 ">
                     <div className="relative w-10 h-10 mr-[6px]" title="Prev">
                        <CarouselPrevious className="absolute top-0 left-0 translate-y-0 w-full h-full" />
                     </div>
                     <div className=" relative w-10 h-10" title="Next">
                        <CarouselNext className="absolute top-0 left-0 translate-y-0 w-full h-full" />
                     </div>
                  </div>
               </div>
            </div>

            <CarouselContent>
               <ExploreStayList slice={slice} topDestination={topDestination} />
            </CarouselContent>
         </Carousel>
      </Bounded>
   );
};

export default ExploreStay;

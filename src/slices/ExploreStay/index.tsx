import { Content } from '@prismicio/client';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';

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
const ExploreStay = async ({
  slice,
}: ExploreStayProps): Promise<JSX.Element> => {
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
        <div className="relative mb-12 flex justify-between text-neutral-900 dark:text-neutral-50 sm:items-end lg:mb-16">
          <div className="max-w-2xl">
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <PrismicRichText
              field={slice.primary.body}
              components={components}
            />
          </div>
          <div className="mt-4 flex flex-shrink-0 justify-end sm:ml-2 sm:mt-0">
            <div className="relative flex items-center text-neutral-900 dark:text-neutral-300">
              <div className="relative mr-[6px] h-10 w-10" title="Prev">
                <CarouselPrevious className="absolute left-0 top-0 h-full w-full translate-y-0" />
              </div>
              <div className="relative h-10 w-10" title="Next">
                <CarouselNext className="absolute left-0 top-0 h-full w-full translate-y-0" />
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

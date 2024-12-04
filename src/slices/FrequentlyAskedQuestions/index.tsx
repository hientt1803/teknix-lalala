import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';

/**
 * Props for `FrequentlyAskedQuestions`.
 */
export type FrequentlyAskedQuestionsProps =
  SliceComponentProps<Content.FrequentlyAskedQuestionsSlice>;

export const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading className="!leading-normal">{children}</Heading>
  ),
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};

/**
 * Component for "FrequentlyAskedQuestions" Slices.
 */
const FrequentlyAskedQuestions = ({
  slice,
}: FrequentlyAskedQuestionsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20"
    >
      <div className="grid grid-cols-1 place-items-center gap-5 md:grid-cols-2">
        <div className="flex flex-col items-start justify-start gap-3">
          <PrismicRichText
            field={slice?.primary?.heading}
            components={components}
          />
          <PrismicRichText
            field={slice?.primary?.description}
            components={components}
          />
          <div className="iitems-center mt-10 flex gap-4">
            <Button className="px-4 py-6 text-lg">
              Contact Us <ArrowRight className="ml-1 size-6" />
            </Button>
            <Button className="px-4 py-6 text-lg" variant={'ghost'}>
              Help center <ArrowRight className="ml-1 size-6" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1 flex flex-col gap-3">
            <div className="overflow-hidden rounded-xl">
              <PrismicNextImage
                field={slice.primary.images[0]?.image}
                alt=""
                className="h-full max-h-[230px] w-full transform object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-xl">
              <PrismicNextImage
                field={slice.primary.images[1]?.image}
                alt=""
                className="h-full max-h-[230px] w-full transform object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="aspect-[1/1.5] overflow-hidden rounded-xl">
              <PrismicNextImage
                field={slice.primary.images[2]?.image}
                alt=""
                className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default FrequentlyAskedQuestions;

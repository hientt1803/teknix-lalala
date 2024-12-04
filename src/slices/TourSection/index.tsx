import { Content } from '@prismicio/client';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import TourCard from '@/components/custom/cards/tour-card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { filterDatas, mockTours } from './mock';

/**
 * Props for `TourSection`.
 */
export type TourSectionProps = SliceComponentProps<Content.TourSectionSlice>;
const components: JSXMapSerializer = {
  heading2: ({ children }) => <Heading>{children}</Heading>,
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
/**
 * Component for "TourSection" Slices.
 */
const TourSection = ({ slice }: TourSectionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-16"
    >
      {/* <div className="absolute inset-y-0 w-screen xl:max-w-[1340px] 1920:max-w-screen-1920 left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-20 " /> */}

      <div className="relative">
        <div className="relative mb-8 flex flex-col items-center justify-between sm:flex-row">
          {/* HEADING */}
          <div className="relative mb-10 flex flex-col justify-between text-neutral-900 dark:text-neutral-50 sm:flex-row sm:items-end md:mb-12">
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
          </div>
          {/* TABS */}
          <div className="flex items-center gap-2">
            {filterDatas.map((datas, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full px-6 py-5">
                    {datas.name}
                    <ChevronDown className="h-4 w-4 text-neutral-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {datas.items.map((item, index) => (
                    <DropdownMenuItem key={index}>{item.name}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
        {/* CARD LIST */}
        <div className="grid gap-6 sm:grid-cols-3 md:gap-8">
          {mockTours.map((pro, index) => (
            <TourCard {...pro} key={index} />
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default TourSection;

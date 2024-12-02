import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { filterDatas, mockTours } from './mock';
import TourCard from '@/components/custom/cards/tour-card';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
         className="py-16 relative"
      >
         {/* <div className="absolute inset-y-0 w-screen xl:max-w-[1340px] 1920:max-w-screen-1920 left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-20 " /> */}

         <div className="relative">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 relative">
               {/* HEADING */}
               <div className=" relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50">
                  <div className="max-w-2xl">
                     <PrismicRichText field={slice.primary.heading} components={components} />
                     <PrismicRichText field={slice.primary.body} components={components} />
                  </div>
               </div>
               {/* TABS */}
               <div className="flex items-center gap-2">
                  {filterDatas.map((datas, index) => (
                     <DropdownMenu key={index}>
                        <DropdownMenuTrigger asChild>
                           <Button variant='outline' className='py-5 px-6 rounded-full'>
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
            <div className="grid gap-6 md:gap-8 sm:grid-cols-3">
               {mockTours.map((pro, index) => (
                  <TourCard {...pro} key={index} />
               ))}
            </div>
         </div>
      </Bounded>
   );
};

export default TourSection;

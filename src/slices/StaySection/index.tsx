import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { propertyList } from './mock';
import StayCard from '@/components/custom/cards/stay-card';
import { ArrowRight } from 'lucide-react';

/**
 * Props for `StaySection`.
 */
export type StaySectionProps = SliceComponentProps<Content.StaySectionSlice>;
const components: JSXMapSerializer = {
   heading2: ({ children }) => <Heading>{children}</Heading>,
   paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
/**
 * Component for "StaySection" Slices.
 */
const StaySection = ({ slice }: StaySectionProps): JSX.Element => {
   return (
      <Bounded
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="py-16 relative"
      >
         <div className="absolute inset-y-0 w-screen xl:max-w-[1340px] 1920:max-w-screen-1920 left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-slate-50 dark:bg-black dark:bg-opacity-20 " />

         <div className="relative">
            <div className="flex flex-col mb-8 relative">
               {/* HEADING */}
               <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50">
                  <div className="max-w-2xl">
                     <PrismicRichText field={slice.primary.heading} components={components} />
                     <PrismicRichText field={slice.primary.body} components={components} />
                  </div>
               </div>
               {/* TABS */}
               <div className="flex items-center gap-3">
                  {[
                     'All',
                     'Luxury',
                     'Standard',
                     'Villa',
                     'Cottage',
                     'Townhouses',
                     'Shared Space',
                  ].map((item, index) => (
                     <Button
                        key={index}
                        variant="outline"
                        className="py-6 px-7 text-base min-w-32 rounded-full"
                     >
                        {item}
                     </Button>
                  ))}
               </div>
            </div>
            {/* CARD LIST */}
            <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
               {propertyList.map((pro, index) => (
                  <StayCard {...pro} key={index} />
               ))}
            </div>
         </div>
      </Bounded>
   );
};

export default StaySection;

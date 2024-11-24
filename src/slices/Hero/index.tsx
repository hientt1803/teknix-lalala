import Bounded from '@/components/common/containers/bounded';
import { SearchGroup } from '@/components/common/searchGroup/searchGroup';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { MainContent } from '@/features/home/banner/mainContent';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { JSXMapSerializer, SliceComponentProps } from '@prismicio/react';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;
export const heroComponents: JSXMapSerializer = {
   heading1: ({ children }) => (
      <Heading as="h1" className="text-3xl md:text-7xl font-medium text-white">
         {children}
      </Heading>
   ),
   paragraph: ({ children }) => (
      <Paragraph as="p" className="text-white dark:text-white text-sm">
         {children}
      </Paragraph>
   ),
};

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="w-full"
      >
         {slice.variation == 'default' && (
            <div className="relative block w-full h-[60.625rem]">
               {/* Background */}
               <PrismicNextImage
                  field={slice.primary.background}
                  alt=""
                  className="absolute w-full h-[60.625rem] object-cover z-[2]"
                  loading="lazy"
               />

               {/* Content */}
               <MainContent slice={slice} index={0} slices={[]} context={undefined} />

               {/* Search Group */}
               <Bounded className='relative'>
                  <SearchGroup />
               </Bounded>
            </div>
         )}
      </section>
   );
};

export default Hero;

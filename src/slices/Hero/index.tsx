import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const BackGroundImageSkeleton = dynamic(() =>
   import('@/features/home/banner/backgroundImage').then((mod) => mod.BackGroundImageSkeleton),
);
export const BackgroundImage = dynamic(
   () => import('@/features/home/banner/backgroundImage').then((mod) => mod.BackgroundImage),
   { loading: () => <BackGroundImageSkeleton /> },
);

export const MainContent = dynamic(() =>
   import('@/features/home/banner/mainContent').then((mod) => mod.MainContent),
);
export const SearchGroup = dynamic(() =>
   import('@/components/common/searchGroup/searchGroup').then((mod) => mod.SearchGroup),
);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;
export const heroComponents: JSXMapSerializer = {
   heading1: ({ children }) => (
      <Heading as="h1" className="text-3xl md:text-6xl 1920:text-7xl font-medium text-white">
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
         className="w-full mb-40 md:mb-0"
      >
         {slice.variation == 'default' && (
            <div className="relative w-full h-[calc(100vh+50px)] flex flex-col gap-6 xl:gap-10 justify-center items-center">
               {/* Background */}
               <BackgroundImage image={slice.primary.background} />
               <div className="absolute inset-0 bg-black/60"></div>

               {/* Content */}
               <MainContent slice={slice} />
               {/* Search Group */}
               <Bounded>
                  <SearchGroup />
               </Bounded>
            </div>
         )}
      </section>
   );
};

export default Hero;

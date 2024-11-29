import Bounded from '@/components/common/containers/bounded';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const BackGroundImageSkeleton = dynamic(() =>
   import('@/features/home/banner/backgroundImage').then((mod) => mod.BackGroundImageSkeleton),
);
export const BackgroundImage = dynamic(
   () => import('@/features/home/banner/backgroundImage').then((mod) => mod.BackgroundImage),
   {
      loading: () => (
         <div className="min-h-[50rem]">
            <BackGroundImageSkeleton />
         </div>
      ),
   },
);

export const MainContent = dynamic(() =>
   import('@/features/home/banner/mainContent').then((mod) => mod.MainContent),
);
export const SearchGroup = dynamic(
   () => import('@/components/common/searchGroup/searchGroup').then((mod) => mod.SearchGroup),
   {
      ssr: false,
   },
);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="w-full min-h-[50rem] mb-40 md:mb-0"
      >
         {slice.variation == 'default' && (
            <div className="relative w-full h-screen py-8 md:py-0 flex flex-col gap-6 xl:gap-10 justify-center items-center">
               {/* Background */}
               <BackgroundImage image={slice.primary.background} />
               {/* <div className="absolute inset-0 bg-black/70"></div> */}

               {/* Content */}
               <MainContent slice={slice} />

               {/* Search Group */}
               <Bounded>
                  <SearchGroup className="-mb-64 md:mt-0" showBorder showTabs />
               </Bounded>
            </div>
         )}
      </section>
   );
};

export default Hero;

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

import Bounded from '@/components/common/containers/bounded';

export const BackGroundImageSkeleton = dynamic(() =>
  import('@/features/home/banner/backgroundImage').then(
    module_ => module_.BackGroundImageSkeleton,
  ),
);
export const BackgroundImage = dynamic(
  () =>
    import('@/features/home/banner/backgroundImage').then(
      module_ => module_.BackgroundImage,
    ),
  {
    loading: () => (
      <div className="min-h-[50rem]">
        <BackGroundImageSkeleton />
      </div>
    ),
  },
);

export const MainContent = dynamic(() =>
  import('@/features/home/banner/mainContent').then(
    module_ => module_.MainContent,
  ),
);
export const SearchGroup = dynamic(
  () =>
    import('@/components/common/searchGroup/searchGroup').then(
      module_ => module_.SearchGroup,
    ),
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
      className="mb-40 min-h-[50rem] w-full md:mb-0"
    >
      {slice.variation == 'default' && (
        <div className="relative flex h-screen w-full flex-col items-center justify-center gap-6 py-8 md:py-0 xl:gap-10">
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

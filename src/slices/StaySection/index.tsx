import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import Bounded from '@/components/common/containers/bounded';
import dynamic from 'next/dynamic';

export const StaysSection = dynamic(() =>
  import('@/features/slice-global/stays/stays-section').then(
    module_ => module_.StaysSection,
  ),
);

/**
 * Props for `StaySection`.
 */
export type StaySectionProps = SliceComponentProps<Content.StaySectionSlice>;

/**
 * Component for "StaySection" Slices.
 */
const StaySection = ({ slice }: StaySectionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-16"
    >
      {/* <div className="absolute inset-y-0 w-screen xl:max-w-[1340px] 1920:max-w-screen-1920 left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-50 dark:bg-black dark:bg-opacity-20 " /> */}
      <StaysSection {...slice} />
    </Bounded>
  );
};

export default StaySection;

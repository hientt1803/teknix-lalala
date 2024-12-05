import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import Bounded from '@/components/common/containers/bounded';
import dynamic from 'next/dynamic';
export const ToursSection = dynamic(() =>
  import('@/features/slice-global/tours/tours-section').then(
    module_ => module_.ToursSection,
  ),
);

/**
 * Props for `TourSection`.
 */
export type TourSectionProps = SliceComponentProps<Content.TourSectionSlice>;
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
      <ToursSection {...slice} />
    </Bounded>
  );
};

export default TourSection;

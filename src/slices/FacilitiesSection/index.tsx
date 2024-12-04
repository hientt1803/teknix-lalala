import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

import Bounded from '@/components/common/containers/bounded';

export const FacilitiesContainer = dynamic(() =>
  import('@/features/home/facilities').then(
    module_ => module_.FacilitiesContainer,
  ),
);

/**
 * Props for `FacilitiesSection`.
 */
export type FacilitiesSectionProps =
  SliceComponentProps<Content.FacilitiesSectionSlice>;

/**
 * Component for "FacilitiesSection" Slices.
 */
const FacilitiesSection = ({ slice }: FacilitiesSectionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FacilitiesContainer slice={slice} />
    </Bounded>
  );
};

export default FacilitiesSection;

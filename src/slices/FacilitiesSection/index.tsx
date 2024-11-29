import Bounded from '@/components/common/containers/bounded';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const FacilitiesContainer = dynamic(() =>
   import('@/features/home/facilities').then((mod) => mod.FacilitiesContainer),
);

/**
 * Props for `FacilitiesSection`.
 */
export type FacilitiesSectionProps = SliceComponentProps<Content.FacilitiesSectionSlice>;

/**
 * Component for "FacilitiesSection" Slices.
 */
const FacilitiesSection = ({ slice }: FacilitiesSectionProps): JSX.Element => {
   return (
      <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         <FacilitiesContainer slice={slice} />
      </Bounded>
   );
};

export default FacilitiesSection;

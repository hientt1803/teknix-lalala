import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import Bounded from '@/components/common/containers/bounded';
import dynamic from 'next/dynamic';

export const CloudLogo = dynamic(() =>
  import('@/features/slice-global/logos/cloud-logo').then(
    module_ => module_.CloudLogo,
  ),
);

/**
 * Props for `LogosSection`.
 */
export type LogosSectionProps = SliceComponentProps<Content.LogosSectionSlice>;

/**
 * Component for "LogosSection" Slices.
 */
const LogosSection = ({ slice }: LogosSectionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <CloudLogo {...slice} />
    </Bounded>
  );
};

export default LogosSection;

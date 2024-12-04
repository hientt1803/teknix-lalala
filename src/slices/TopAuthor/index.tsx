import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

import Bounded from '@/components/common/containers/bounded';

/**
 * Props for `TopAuthor`.
 */
export type TopAuthorProps = SliceComponentProps<Content.TopAuthorSlice>;
/**
 * Component for "TopAuthor" Slices.
 */
const TopAuthorLazy = dynamic(
  () => import('@/features/home/topauthor/topauthor').then(mob => mob.default),
  {
    loading: () => <div>Kiad</div>,
  },
);

const TopAuthor = ({ slice }: TopAuthorProps): JSX.Element => {
  return (
    <Bounded
      className="relative py-16"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <TopAuthorLazy
        body={slice.primary.heading}
        heading={slice.primary.body}
      />
    </Bounded>
  );
};

export default TopAuthor;

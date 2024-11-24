import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `TopAuthor`.
 */
export type TopAuthorProps = SliceComponentProps<Content.TopAuthorSlice>;

/**
 * Component for "TopAuthor" Slices.
 */
const TopAuthor = ({ slice }: TopAuthorProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for top_author (variation: {slice.variation}) Slices
      </section>
   );
};

export default TopAuthor;

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `NewsSection`.
 */
export type NewsSectionProps = SliceComponentProps<Content.NewsSectionSlice>;

/**
 * Component for "NewsSection" Slices.
 */
const NewsSection = ({ slice }: NewsSectionProps): JSX.Element => {
   return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
         Placeholder component for news_section (variation: {slice.variation}) Slices
      </section>
   );
};

export default NewsSection;

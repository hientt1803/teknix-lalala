import { Content } from '@prismicio/client';
import { JSXMapSerializer, SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';

export const NewHeader = dynamic(() =>
  import('@/features/home/news/newHeader').then(module_ => module_.NewHeader),
);
export const ListNews = dynamic(() =>
  import('@/features/home/news/listNews').then(module_ => module_.ListNews),
);

/**
 * Props for `NewsSection`.
 */
export type NewsSectionProps = SliceComponentProps<Content.NewsSectionSlice>;
export const newComponent: JSXMapSerializer = {
  heading2: ({ children }) => <Heading>{children}</Heading>,
  paragraph: ({ children }) => (
    <Paragraph className="text-neutral-500">{children}</Paragraph>
  ),
};

/**
 * Component for "NewsSection" Slices.
 */
const NewsSection = ({ slice }: NewsSectionProps): JSX.Element => {
  return (
    <Bounded
      className="relative py-16"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <NewHeader slice={slice} />
      <ListNews />
    </Bounded>
  );
};

export default NewsSection;

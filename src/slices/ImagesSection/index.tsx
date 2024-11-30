import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Content } from '@prismicio/client';
import { JSXMapSerializer, SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

export const ImageSection = dynamic(() =>
   import('@/features/home/imagesSection/index').then((mod) => mod.ImageSection),
);

/**
 * Props for `ImagesSection`.
 */
export type ImagesSectionProps = SliceComponentProps<Content.ImagesSectionSlice>;
export const imageComponent: JSXMapSerializer = {
   heading2: ({ children }) => <Heading className="text-white">{children}</Heading>,
   paragraph: ({ children }) => <Paragraph className="text-neutral-500">{children}</Paragraph>,
};

/**
 * Component for "ImagesSection" Slices.
 */
const ImagesSection = ({ slice }: ImagesSectionProps): JSX.Element => {
   return (
      <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="w-full bg-neutral-950 dark:bg-neutral-800 py-16 relative"
      >
         <ImageSection slice={slice} />
      </section>
   );
};

export default ImagesSection;

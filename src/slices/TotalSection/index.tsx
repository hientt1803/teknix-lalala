import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import React from 'react';

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Separator } from '@/components/ui/separator';

/**
 * Props for `TotalSection`.
 */
export type TotalSectionProps = SliceComponentProps<Content.TotalSectionSlice>;
export const totalComponents: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" className="text-3xl font-bold text-white md:text-6xl">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <Paragraph as="p" className="text-lg text-white dark:text-white">
      {children}
    </Paragraph>
  ),
};

/**
 * Component for "TotalSection" Slices.
 */
const TotalSection = ({ slice }: TotalSectionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full min-w-full py-16"
    >
      <Bounded>
        <div className="relative flex h-full min-h-[18.75rem] w-full items-center justify-center md:min-h-[18.75rem]">
          {/* Background image */}
          <div className="absolute inset-0 h-full min-h-[18.75rem] w-full md:min-h-[18.75rem]">
            <PrismicNextImage
              field={slice.primary.background}
              alt=""
              height={350}
              className="z-[1] h-full min-h-[18.75rem] w-full object-fill md:min-h-[18.75rem] lg:object-contain"
            />
          </div>

          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="z-10 grid h-full w-full max-w-full grid-cols-12 place-content-center place-items-start gap-3 p-5 md:max-w-[62.5rem] lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:gap-2">
              {slice.primary.totals.map((total, index) => (
                <div key={index} className="col-span-6">
                  <div className="flex items-center gap-10">
                    <div className="flex flex-col items-start justify-start gap-3">
                      <PrismicRichText
                        field={total.title}
                        components={totalComponents}
                      />
                      <PrismicRichText
                        field={total.description}
                        components={totalComponents}
                      />
                    </div>
                    {index !== slice.primary.totals.length - 1 && (
                      <Separator
                        orientation="vertical"
                        className="mx-6 h-16 w-[1px]"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default TotalSection;

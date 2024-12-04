import { Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import dynamic from 'next/dynamic';

import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';
import { generateIcon } from '@/utilities/generate';

export const FacilitiCaroucel = dynamic(
  () =>
    import('./components/faciliti-caroucel').then(
      module_ => module_.FacilitiCaroucel,
    ),
  {
    ssr: false,
  },
);
const facilityComponents: JSXMapSerializer = {
  heading2: ({ children }) => <Heading>{children}</Heading>,
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};

export const FacilitiesContainer = ({
  slice,
}: {
  slice: Content.FacilitiesSectionSlice;
}) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-12 lg:col-span-6">
        <PrismicRichText
          field={slice.primary.heading}
          components={facilityComponents}
        />
        <PrismicRichText
          field={slice.primary.body}
          components={facilityComponents}
        />

        <div className="mb-5 mt-3">
          <PrismicNextLink field={slice.primary.button_link}>
            <Button className="px-6 py-5 font-medium">
              {slice.primary.button_text}
            </Button>
          </PrismicNextLink>
        </div>

        <div className="mt-6 grid grid-cols-2 place-content-between place-items-start gap-5">
          {slice.primary.facilities.map((facility, index) => (
            <div key={index} className="col-span-1 flex items-center gap-2">
              <span>
                {generateIcon({
                  iconType: facility.icon || '',
                  className: 'text-yellow-600',
                })}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400">
                {facility.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 md:col-span-12 lg:col-span-6">
        <FacilitiCaroucel destinations={slice.primary.destinations} />
      </div>
    </div>
  );
};

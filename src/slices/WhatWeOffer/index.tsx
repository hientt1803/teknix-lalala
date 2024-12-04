import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { cn } from '@/lib/utils';
import { Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import { ArrowRight } from 'lucide-react';

/**
 * Props for `WhatWeOffer`.
 */
export type WhatWeOfferProps = SliceComponentProps<Content.WhatWeOfferSlice>;
export const Components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading className="!leading-normal">{children}</Heading>
  ),
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};

/**
 * Component for "WhatWeOffer" Slices.
 */
const WhatWeOffer = ({ slice }: WhatWeOfferProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20"
    >
      <div
        className={cn(
          'flex flex-col',
          slice?.variation == 'default'
            ? 'items-start justify-start'
            : 'items-center justify-center',
        )}
      >
        <PrismicRichText
          field={slice?.primary?.heading}
          components={Components}
        />
        <PrismicRichText
          field={slice?.primary?.description}
          components={{
            paragraph: ({ children }) => (
              <p className="!text-xl !text-neutral-500 dark:text-neutral-100">
                {children}
              </p>
            ),
          }}
        />
      </div>

      {slice?.variation == 'default' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {slice?.primary?.services?.map((item, index) => (
            <div
              key={index}
              className="flex h-full flex-col items-start justify-between rounded-md p-7"
            >
              <div className="rounded-xl p-4 shadow-2xl">
                <PrismicNextImage
                  field={item?.icon}
                  alt=""
                  className="size-8 dark:invert-[1]"
                />
              </div>

              <div className="my-5 flex-grow">
                <Heading
                  as="h6"
                  className="cursor-pointer !text-lg hover:text-yellow-600"
                >
                  {' '}
                  {item?.title}
                </Heading>

                <Paragraph className="text-wrap !text-sm text-neutral-600">
                  {item?.description}
                </Paragraph>
              </div>

              <div className="group flex cursor-pointer items-center gap-2">
                <span className="text-sm group-hover:text-yellow-600">
                  Learn more
                </span>
                <ArrowRight className="size-3 group-hover:text-yellow-600" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {slice?.primary?.services?.map((service, index) => (
            <div
              key={index}
              className="flex h-full flex-col flex-wrap items-center justify-center rounded-md p-7"
            >
              <div className="rounded-xl p-4 shadow-2xl">
                <PrismicNextImage
                  field={service?.icon}
                  alt=""
                  className="size-8 dark:invert-[1]"
                />
              </div>

              <div className="my-5 flex-grow">
                <Heading
                  as="h6"
                  className="cursor-pointer text-center !text-xl hover:text-yellow-600"
                >
                  {' '}
                  {service?.title}
                </Heading>

                <Paragraph className="text-wrap text-center !text-base text-neutral-600">
                  {service?.description}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      )}
    </Bounded>
  );
};

export default WhatWeOffer;

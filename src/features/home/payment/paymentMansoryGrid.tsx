import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import { CheckIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import Badge from '@/components/custom/badges/badge';
import { cn } from '@/lib/utils';

export const PaymentCaroucel = dynamic(
  () => import('./paymentCaroucel').then(module_ => module_.PaymentCaroucel),
  {
    ssr: false,
  },
);
const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading className="text-4xl">{children}</Heading>
  ),
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
export const PaymentMansoryGrid = ({
  slice,
}: {
  slice: Content.PaymentSectionSlice;
}) => {
  return (
    <Bounded className="flex h-full w-full flex-col items-center justify-center">
      <div className="z-10 mx-auto flex h-full w-full items-center justify-between gap-2">
        <div className="grid grid-cols-12 gap-10">
          {/* List image */}
          <div
            className={cn(
              slice.variation == 'default'
                ? 'order-1 col-span-12 md:col-span-5'
                : 'order-2 col-span-12 md:col-span-4',
            )}
          >
            {slice.variation == 'default' ? (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6">
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <PrismicNextImage
                      field={slice.primary.images[0]?.image}
                      alt=""
                      className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-span-6 mt-12">
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <PrismicNextImage
                      field={slice.primary.images[1]?.image}
                      alt=""
                      className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-span-6 -mt-12">
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <PrismicNextImage
                      field={slice.primary.images[2]?.image}
                      alt=""
                      className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <PrismicNextImage
                      field={slice.primary.images[3]?.image}
                      alt=""
                      className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="z-10 aspect-square overflow-hidden rounded-xl">
                  <PrismicNextImage
                    field={slice.primary.images[0]?.image}
                    alt=""
                    className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="absolute -bottom-24 left-0 aspect-auto overflow-hidden rounded-xl md:-left-44">
                  <PrismicNextImage
                    field={slice.primary.images[1]?.image}
                    alt=""
                    className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="absolute -bottom-40 right-10 aspect-square overflow-hidden rounded-xl">
                  <PrismicNextImage
                    field={slice.primary.images[2]?.image}
                    alt=""
                    className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="absolute -right-12 -top-12 -z-[1] aspect-square">
                  <PrismicNextImage
                    field={slice.primary.images[3]?.image}
                    alt=""
                    className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className={cn(
              slice.variation == 'default'
                ? 'order-2 col-span-12 mt-20 md:col-span-7'
                : 'order-1 col-span-12 md:col-span-6 md:col-start-2',
            )}
          >
            <Badge
              className="mb-5 bg-[#f2f4f6] px-5 py-4 text-sm font-medium text-neutral-900"
              color="gray"
            >
              {slice.primary.tag || ''}
            </Badge>

            <div className="mb-5">
              <PrismicRichText
                field={slice?.primary?.heading}
                components={components}
              />
            </div>

            <div className="mb-5">
              {slice.variation === 'default' && (
                <PrismicRichText
                  field={slice?.primary?.title}
                  components={components}
                />
              )}
            </div>

            <div className="my-10">
              <div className="grid grid-cols-12 gap-3">
                {slice?.variation !== 'withBackground' &&
                  slice?.primary?.benefits?.map((bene, index) => (
                    <div
                      className={cn(
                        slice.variation === 'default'
                          ? 'col-span-6'
                          : 'col-span-12',
                      )}
                      key={index}
                    >
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-black dark:text-neutral-200">
                          {bene.text}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {slice?.variation == 'default' && (
              <PrismicRichText
                field={slice?.primary?.payment_label}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-sm">{children}</p>
                  ),
                }}
              />
            )}

            <div
              className={
                slice.variation == 'default'
                  ? 'mt-4 max-w-lg'
                  : 'mt-8 max-w-[25rem]'
              }
            >
              <PaymentCaroucel payments={slice.primary.payments} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';

/**
 * Props for `HowItWork`.
 */
export type HowItWorkProps = SliceComponentProps<Content.HowItWorkSlice>;
const components: JSXMapSerializer = {
  heading2: ({ children }) => <Heading>{children}</Heading>,
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};
/**
 * Component for "HowItWork" Slices.
 */
const HowItWork = ({ slice }: HowItWorkProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-16"
    >
      {slice.variation == 'default' && (
        <Bounded>
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="nc-Section-Heading relative mb-12 flex flex-col justify-between text-neutral-900 dark:text-neutral-50 sm:flex-row sm:items-end lg:mb-16">
              <div className="mx-auto w-full max-w-2xl text-center">
                <PrismicRichText
                  field={slice.primary.heading}
                  components={components}
                />
                <PrismicRichText
                  field={slice.primary.body}
                  components={components}
                />
              </div>
            </div>
            <div className="relative mt-10 grid gap-20 md:grid-cols-3">
              <Image
                src="/dash.svg"
                alt="dash"
                className="absolute inset-x-0 top-10 hidden md:block"
              />
              {slice.primary.howitworks.map((item, index) => (
                <div
                  key={index}
                  className="relative mx-auto flex max-w-xs flex-col items-center gap-5"
                >
                  <div className="mx-auto max-w-[200px]">
                    <PrismicNextImage
                      field={item.image_light}
                      alt=""
                      className="block h-full w-full object-cover dark:hidden"
                    />
                    <PrismicNextImage
                      field={item.image_dark}
                      alt=""
                      className="hidden h-full w-full object-cover dark:block"
                    />
                  </div>
                  <div className="mt-auto text-center">
                    <PrismicRichText
                      field={item.title}
                      components={{
                        heading3: ({ children }) => (
                          <h3 className="text-xl font-semibold">{children}</h3>
                        ),
                      }}
                    />
                    <PrismicRichText
                      field={item.description}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="mt-5 block text-neutral-500 dark:text-neutral-400">
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Bounded>
      )}

      {slice.variation == 'withPlane' && (
        <div className="relative w-full bg-[#e3f0ff] dark:bg-[#1d2024] p-20">
          <Bounded>
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <PrismicRichText
              field={slice.primary.body}
              components={{
                paragraph: ({ children }) => (
                  <p className="mt-2 !text-xl !font-normal text-neutral-600 dark:text-neutral-400">
                    {children}
                  </p>
                ),
              }}
            />
            <div className="mt-16 grid max-w-full grid-cols-1 md:grid-cols-2 gap-6 md:max-w-[80%]">
              {slice?.primary?.howitworks?.map((item, index) => (
                <div
                  key={index}
                  className="mb-6 flex items-start justify-between gap-5"
                >
                  <Button
                    size={'icon'}
                    variant={'secondary'}
                    className="rounded-full p-4 text-xl font-medium hover:bg-neutral-800 hover:text-neutral-200"
                  >
                    {index + 1}
                  </Button>
                  <div className="flex flex-col items-start justify-start gap-0">
                    <PrismicRichText
                      field={item?.title}
                      components={{
                        heading3: ({ children }) => (
                          <h3 className="text-xl font-semibold">{children}</h3>
                        ),
                      }}
                    />
                    <PrismicRichText
                      field={item?.description}
                      components={components}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Bounded>

          <div className="hidden md:absolute right-0 bottom-0">
            <PrismicNextImage
              field={slice?.primary?.images[0]?.image}
              alt=""
              className="h-fit w-fit"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HowItWork;

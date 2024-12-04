import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import Heading from '@/components/common/typography/heading';
import { Button } from '@/components/ui/button';

export const TestimonialWithGridVariantList = dynamic(() =>
  import(
    '@/features/slice-global/testimonials/testimonial-grid-variant-list'
  ).then(module_ => module_.TestimonialWithGridVariantList),
);
export const TestimonialList = dynamic(() =>
  import('@/features/slice-global/testimonials/testimonial-list').then(
    module_ => module_.TestimonialList,
  ),
);

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = ({ slice }: TestimonialsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20"
    >
      {slice?.variation == 'default' && (
        <div className="relative w-full overflow-hidden">
          {/* Left title */}
          <Bounded>
            <Button className="rounded-full border border-neutral-200 bg-[#fefa17] px-5 py-6 text-black hover:bg-neutral-100">
              <div className="flex items-center gap-0">
                <Image
                  src="/assets/images/testimonials/client1.png"
                  width={22}
                  height={22}
                  alt=""
                  className="h-6 w-6"
                />
                <Image
                  src="/assets/images/testimonials/client2.png"
                  width={22}
                  height={22}
                  alt=""
                  className="-ml-2 h-6 w-6"
                />
                <Image
                  src="/assets/images/testimonials/client3.png"
                  width={22}
                  height={22}
                  alt=""
                  className="-ml-2 h-6 w-6"
                />
              </div>
              <span className="text-sm font-medium">Testimonials</span>
            </Button>

            <PrismicRichText
              field={slice?.primary?.heading}
              components={{
                heading1: ({ children }) => (
                  <Heading className="mt-2 md:mt-3">{children}</Heading>
                ),
              }}
            />
          </Bounded>

          <div className="my-16 grid w-full grid-cols-12 gap-3">
            <div className="col-span-1 md:col-span-3" />
            <div className="col-span-1 md:col-span-9">
              <TestimonialList />
            </div>
          </div>

          {/* Background */}
          <Image
            src={'/assets/images/home/bg-payment-plane.svg'}
            alt=""
            className="right-20 top-0 hidden object-cover md:absolute"
          />
          <Image
            src={'/assets/images/home/payment-background.png'}
            alt=""
            className="-mt-28 h-[12.5rem] w-[90%] object-contain md:h-[15.625rem] md:w-[60%]"
          />

          <div className="absolute bottom-0 left-0 right-0 h-[1px] w-full bg-neutral-200" />
        </div>
      )}

      {slice?.variation == 'grid' && (
        <Bounded className="h-full w-full">
          <div className="relative h-full w-full">
            <div className="flex flex-col items-center justify-center gap-3">
              <Button className="mx-auto rounded-full border border-neutral-200 bg-[#fefa17] px-5 py-6 text-black hover:bg-neutral-100">
                <div className="flex items-center gap-0">
                  <Image
                    src="/assets/images/testimonials/client1.png"
                    width={22}
                    height={22}
                    alt=""
                    className="h-6 w-6"
                  />
                  <Image
                    src="/assets/images/testimonials/client2.png"
                    width={22}
                    height={22}
                    alt=""
                    className="-ml-2 h-6 w-6"
                  />
                  <Image
                    src="/assets/images/testimonials/client3.png"
                    width={22}
                    height={22}
                    alt=""
                    className="-ml-2 h-6 w-6"
                  />
                </div>
                <span className="text-sm font-medium">Testimonials</span>
              </Button>

              <PrismicRichText
                field={slice?.primary?.heading}
                components={{
                  heading1: ({ children }) => (
                    <Heading className="mt-2 text-center md:mt-3">
                      {children}
                    </Heading>
                  ),
                }}
              />
            </div>

            <div className="">
              <div className="grid grid-cols-1 py-16 md:grid-cols-2">
                <PrismicNextImage
                  field={slice?.primary?.image}
                  alt=""
                  className="z-20 h-full md:h-[75%] w-full md:w-[75%] object-contain"
                />

                <TestimonialWithGridVariantList />
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-700 p-0">
              <div className="flex items-center justify-between flex-wrap p-0">
                {slice?.primary?.supports?.map((sup, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row w-full md:w-1/3 items-center justify-start gap-2 p-6 ${
                      index < slice.primary.supports.length - 1
                        ? 'border-b md:border-r border-neutral-300 dark:border-neutral-600'
                        : ''
                    }`}
                  >
                    {/* icon */}
                    <div className="flex flex-col items-center justify-center p-5">
                      <PrismicNextImage
                        field={sup?.icon}
                        alt=""
                        className="h-12 w-12 dark:invert-[1]"
                      />
                    </div>

                    {/* content */}
                    <div className="flex flex-col justify-center items-center md:items-start gap-1">
                      <span className="text-lg font-bold text-center md:text-start">{sup?.heading}</span>
                      <span className="text-sm text-neutral-500 text-center">
                        {sup?.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background */}
            <Image
              src={'/assets/images/testimonials/bg-testimonial.8610a296.png'}
              alt=""
              className="hidden md:absolute -left-48 top-[40%] z-[1] object-contain"
            />
          </div>
        </Bounded>
      )}
    </section>
  );
};

export default Testimonials;

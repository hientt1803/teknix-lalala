import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import Image from 'next/image';

import Bounded from '@/components/common/containers/bounded';
import Heading from '@/components/common/typography/heading';
import Paragraph from '@/components/common/typography/paragraph';
import { Button } from '@/components/ui/button';

/**
 * Props for `WhyBookAtLalala`.
 */
export type WhyBookAtLalalaProps =
  SliceComponentProps<Content.WhyBookAtLalalaSlice>;
export const WhyBookComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading className="!leading-normal">{children}</Heading>
  ),
  paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
};

/**
 * Component for "WhyBookAtLalala" Slices.
 */
const WhyBookAtLalala = ({ slice }: WhyBookAtLalalaProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-20"
    >
      {slice.variation == 'default' && (
        <Bounded className="relative">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7 flex flex-col items-start justify-start gap-3">
              <Button className="rounded-full bg-[#fefa17] px-5 py-6 text-black hover:bg-neutral-100">
                <Image
                  src="/assets/images/about/real.svg"
                  width={30}
                  height={30}
                  alt=""
                />
                <span className="text-base font-medium">
                  {slice?.primary?.button_text}
                </span>
              </Button>

              <PrismicRichText
                field={slice?.primary?.heading}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mt-2 block text-6xl font-normal text-neutral-900 dark:text-neutral-100 md:mt-3">
                      {children}
                    </p>
                  ),
                }}
              />
              <PrismicRichText
                field={slice?.primary?.heading_desc}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mt-2 block text-xl font-normal text-neutral-500 dark:text-neutral-400 md:mt-3">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>

            <div className="col-span-12 md:col-span-5">
              <Image
                src={'/assets/images/about/flight.png'}
                alt=""
                width={250}
                height={150}
                className="-ml-14 mb-10"
              />
              <PrismicRichText
                field={slice?.primary?.sub_heading}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mt-2 text-2xl font-semibold text-neutral-800 dark:text-neutral-300 md:mt-3">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          </div>

          <PrismicNextImage
            field={slice?.primary?.main_image}
            alt=""
            className="-mb-64 mt-20 rounded-2xl"
          />
        </Bounded>
      )}

      <div className="mt-20">
        {slice.variation == 'withoutImage' && (
          <div className="bg-[#ffec88] dark:bg-[#ffdc88]">
            <Bounded className="pb-36 pt-72">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <Button className="w-fit rounded-full bg-white px-5 py-6 text-black hover:bg-neutral-100 hover:text-neutral-900">
                    <Image
                      src="/assets/images/home/banner-earth.png"
                      width={20}
                      height={20}
                      alt=""
                    />
                    <span className="text-base font-medium">
                      {slice?.primary?.button_text}
                    </span>
                  </Button>

                  <PrismicRichText
                    field={slice?.primary?.heading}
                    components={{
                      heading1: ({ children }) => (
                        <Heading className="!leading-normal dark:text-neutral-900">
                          {children}
                        </Heading>
                      ),
                    }}
                  />
                  <PrismicRichText
                    field={slice?.primary?.heading_desc}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="mt-2 block text-xl font-normal text-neutral-700 dark:text-neutral-700 md:mt-3">
                          {children}
                        </p>
                      ),
                    }}
                  />

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    {slice?.primary?.ads?.map((ad, index) => (
                      <div
                        className="flex flex-col items-start justify-start gap-1"
                        key={index}
                      >
                        <span className="text-4xl font-semibold dark:text-neutral-50">
                          {ad?.digit}
                        </span>
                        <span className="max-w-36 text-xl font-normal text-neutral-600 dark:text-neutral-500">
                          {ad?.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid h-full grid-cols-1 md:grid-cols-2 place-content-center place-items-center gap-6">
                  <div className="h-full">
                    <div className="boder-neutral-300 flex flex-col items-center justify-center gap-3 rounded-xl border bg-[#fff0ec] p-6">
                      <PrismicNextImage
                        field={slice?.primary?.features[0]?.icon}
                        alt=""
                        className="h-8 w-8"
                      />
                      <span className="text-xl font-semibold text-neutral-800 dark:text-neutral-900">
                        {slice?.primary?.features[0]?.title}
                      </span>
                      <span className="text-center text-xl font-normal text-neutral-500">
                        {slice?.primary?.features[0]?.description}
                      </span>
                    </div>
                    <div className="boder-neutral-300 mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border bg-[#e3f0ff] p-6">
                      <PrismicNextImage
                        field={slice?.primary?.features[1]?.icon}
                        alt=""
                        className="h-8 w-8"
                      />
                      <span className="text-xl font-semibold text-neutral-800 dark:text-neutral-900">
                        {slice?.primary?.features[1]?.title}
                      </span>
                      <span className="text-center text-xl font-normal text-neutral-500">
                        {slice?.primary?.features[1]?.description}
                      </span>
                    </div>
                  </div>
                  <div className="md:-mt-14 w-full h-full">
                    <div className="boder-neutral-300 flex flex-col items-center justify-center gap-3 rounded-xl border bg-[#e4f9f9] p-6">
                      <PrismicNextImage
                        field={slice?.primary?.features[2]?.icon}
                        alt=""
                        className="h-8 w-8"
                      />
                      <span className="text-xl font-semibold text-neutral-800 dark:text-neutral-900">
                        {slice?.primary?.features[2]?.title}
                      </span>
                      <span className="text-center text-xl font-normal text-neutral-500">
                        {slice?.primary?.features[2]?.description}
                      </span>
                    </div>
                    <div className="boder-neutral-300 mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border bg-[#efefeb] p-6">
                      <PrismicNextImage
                        field={slice?.primary?.features[3]?.icon}
                        alt=""
                        className="h-8 w-8"
                      />
                      <span className="text-xl font-semibold text-neutral-800 dark:text-neutral-900">
                        {slice?.primary?.features[3]?.title}
                      </span>
                      <span className="text-center text-xl font-normal text-neutral-500">
                        {slice?.primary?.features[3]?.description}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Bounded>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyBookAtLalala;

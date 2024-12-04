import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import Link from 'next/link';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';

/**
 * Props for `GridSection`.
 */
export type GridSectionProps = SliceComponentProps<Content.GridSectionSlice>;

/**
 * Component for "GridSection" Slices.
 */
const GridSection = ({ slice }: GridSectionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-8 md:py-16"
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 flex sm:col-span-6 lg:col-span-4">
          <Link
            href="#"
            className="group relative z-0 flex w-full flex-1 overflow-hidden rounded-2xl"
          >
            <div className="aspect-[16/10] w-full sm:aspect-[16/12] xl:aspect-video"></div>
            <PrismicNextImage
              alt=""
              field={slice.primary.items[0]?.image}
              className="absolute inset-0 h-full w-full rounded-2xl object-cover text-transparent transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
              <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
              <PrismicRichText
                field={slice.primary.items[0]?.name}
                components={{
                  heading3: ({ children }) => (
                    <h2 className="relative text-lg font-semibold lg:text-xl">
                      {children}
                    </h2>
                  ),
                }}
              />
              <span className="relative mt-1.5 block text-sm text-neutral-100">
                {slice.primary.items[0]?.properties?.toFixed(0)} properties
              </span>
            </div>
          </Link>
        </div>
        <div className="col-span-12 grid grid-rows-2 gap-6 sm:col-span-6 lg:col-span-4">
          <Link
            href="#"
            className="group relative z-0 flex w-full flex-1 overflow-hidden rounded-2xl"
          >
            <div className="aspect-[16/10] w-full sm:aspect-[16/12] xl:aspect-video">
              <PrismicNextImage
                alt=""
                field={slice.primary.items[1]?.image}
                className="absolute inset-0 h-full w-full rounded-2xl object-cover text-transparent transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
              <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
              <PrismicRichText
                field={slice.primary.items[1]?.name}
                components={{
                  heading3: ({ children }) => (
                    <h2 className="relative text-lg font-semibold lg:text-xl">
                      {children}
                    </h2>
                  ),
                }}
              />
              <span className="relative mt-1.5 block text-sm text-neutral-100">
                {slice.primary.items[1]?.properties?.toFixed(0)} properties
              </span>
            </div>
          </Link>
          <Link
            href="#"
            className="group relative z-0 flex w-full flex-1 overflow-hidden rounded-2xl"
          >
            <div className="aspect-[16/10] w-full sm:aspect-[16/12] xl:aspect-video"></div>
            <PrismicNextImage
              alt=""
              field={slice.primary.items[2]?.image}
              className="absolute inset-0 h-full w-full rounded-2xl object-cover text-transparent transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
              <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
              <PrismicRichText
                field={slice.primary.items[2]?.name}
                components={{
                  heading3: ({ children }) => (
                    <h2 className="relative text-lg font-semibold lg:text-xl">
                      {children}
                    </h2>
                  ),
                }}
              />
              <span className="relative mt-1.5 block text-sm text-neutral-100">
                {slice.primary.items[2]?.properties?.toFixed(0)} properties
              </span>
            </div>
          </Link>
        </div>
        <div className="col-span-12 flex sm:col-span-6 lg:col-span-4">
          <Link
            href="#"
            className="group relative z-0 flex w-full flex-1 overflow-hidden rounded-2xl"
          >
            <div className="aspect-[16/10] w-full sm:aspect-[16/12] xl:aspect-[16/9]"></div>
            <PrismicNextImage
              alt=""
              field={slice.primary.items[3]?.image}
              className="absolute inset-0 h-full w-full rounded-2xl object-cover text-transparent transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
              <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
              <PrismicRichText
                field={slice.primary.items[3]?.name}
                components={{
                  heading3: ({ children }) => (
                    <h2 className="relative text-lg font-semibold lg:text-xl">
                      {children}
                    </h2>
                  ),
                }}
              />
              <span className="relative mt-1.5 block text-sm text-neutral-100">
                {slice.primary.items[3]?.properties?.toFixed(0)} properties
              </span>
            </div>
          </Link>
        </div>
      </div>
    </Bounded>
  );
};

export default GridSection;

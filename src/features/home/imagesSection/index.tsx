import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { Grip } from 'lucide-react';
import React from 'react';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import Badge from '@/components/custom/badges/badge';
import { Button } from '@/components/ui/button';
import { imageComponent } from '@/slices/ImagesSection';

export const ImageSection = ({
  slice,
}: {
  slice: Content.ImagesSectionSlice;
}) => {
  return (
    <>
      {slice.variation === 'default' && (
        <Bounded>
          <div className="grid grid-cols-12 place-content-center place-items-center gap-6">
            <div className="col-span-12 md:col-span-6">
              <div className="mx-auto columns-2 place-content-center place-items-center gap-3 lg:columns-3">
                {slice.primary.images.map((image, index) => (
                  <div
                    className="mb-3 h-fit w-full overflow-hidden rounded-[2.5rem] md:max-w-[11.25rem]"
                    key={index}
                  >
                    <PrismicNextImage
                      field={image.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 mt-10 md:col-span-6 md:mt-0">
              <div className="flex flex-col items-start justify-start gap-4">
                <Badge
                  color="white"
                  className="cursor-pointer px-7 py-2 text-lg"
                >
                  {slice.primary.tag || ''}
                </Badge>
                <PrismicRichText
                  field={slice.primary.heading}
                  components={imageComponent}
                />
                <PrismicRichText
                  field={slice.primary.body}
                  components={imageComponent}
                />
              </div>
            </div>
          </div>
        </Bounded>
      )}
      {slice.variation === 'center' && (
        <Bounded className="flex flex-col items-center justify-center gap-16">
          <Image
            src="/assets/images/home/bg-video.png"
            className="absolute bottom-0 z-0 h-full w-full object-cover"
            alt=""
          />
          <div className="flex max-w-[50rem] flex-col items-center justify-center gap-4 text-center">
            <Badge
              color="white"
              className="cursor-pointer bg-yellow-300 px-5 py-3 text-lg"
            >
              {slice.primary.tag || ''}
            </Badge>

            <PrismicRichText
              field={slice.primary.heading}
              components={imageComponent}
            />
          </div>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-5">
              <div className="relative h-full w-full">
                <PrismicNextImage
                  className="h-full w-full rounded-3xl object-cover"
                  field={slice.primary.images[0]?.image}
                  alt=""
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="relative h-16 w-16 rounded-full bg-white shadow-inner">
                    <span className="absolute inset-0 flex items-center justify-center text-neutral-900">
                      <svg
                        className="h-8 w-8"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="grid h-full grid-cols-1 gap-5">
                <div className="relative">
                  <PrismicNextImage
                    className="aspect-[4/3] h-full w-full rounded-3xl object-cover"
                    field={slice.primary.images[1]?.image}
                    alt=""
                  />
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="relative h-10 w-10 rounded-full bg-white shadow-inner">
                      <span className="absolute inset-0 flex items-center justify-center text-neutral-900">
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <PrismicNextImage
                    className="aspect-[3/4] h-full w-full rounded-3xl object-cover"
                    field={slice.primary.images[2]?.image}
                    alt=""
                  />
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="relative h-10 w-10 rounded-full bg-white shadow-inner">
                      <span className="absolute inset-0 flex items-center justify-center text-neutral-900">
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="grid h-full grid-cols-1 gap-5">
                <div className="relative">
                  <PrismicNextImage
                    className="h-full w-full rounded-3xl object-cover"
                    field={slice.primary.images[3]?.image}
                    alt=""
                  />
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="relative h-10 w-10 rounded-full bg-white shadow-inner">
                      <span className="absolute inset-0 flex items-center justify-center text-neutral-900">
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <PrismicNextImage
                    className="h-full w-full rounded-3xl object-cover"
                    field={slice.primary.images[4]?.image}
                    alt=""
                  />
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="relative h-10 w-10 rounded-full bg-white shadow-inner">
                      <span className="absolute inset-0 flex items-center justify-center text-neutral-900">
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            className="rounded-full bg-yellow-300 px-5 py-6 text-base"
            variant="ghost"
          >
            <Grip />
            Load More Tours
          </Button>
        </Bounded>
      )}
    </>
  );
};

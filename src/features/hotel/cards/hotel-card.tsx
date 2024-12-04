import { Heart, MapPin, MapPinnedIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  IHotelDataHotels,
  IHotelDataMapHotels,
} from '@/stores/features/stay/type';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { calculateKilometerDistance } from '@/utilities/geo';
import {
  convertKebabToTitleCase,
  convertToTitleCase,
  replaceSize,
} from '@/utilities/string';

type HotelCArdType = {
  hotel?: IHotelDataHotels;
  selectedMap?: IHotelDataMapHotels;
  distance: number;
  displayType: 'list' | 'grid';
  directLink: string;
};

const HotelCard = (props: HotelCArdType) => {
  const { selectedMap, hotel, distance, displayType, directLink } = props;

  // const items = selectedMap?.images?.slice(0, 5).map((item, index) => (
  //    <CarouselItem
  //       key={index}
  //       className={cn(
  //          displayType == 'list'
  //             ? 'aspect-square md:aspect-[7/6] m-0 p-0'
  //             : 'aspect-square m-0 p-0',
  //       )}
  //    >
  //       <Image
  //          src={replaceSize(item) || '/assets/images/place-holder-image.svg'}
  //          className="w-full h-full object-cover rounded-md"
  //          alt={selectedMap?.name}
  //          loading="lazy"
  //       />
  //    </CarouselItem>
  // ));

  return (
    <Card className="group relative h-full w-full overflow-hidden rounded-[1.875rem] border-neutral-200 transition-shadow hover:shadow-xl dark:border-neutral-700">
      <div className={cn('grid h-full w-full grid-cols-5 items-center')}>
        <div
          className={cn(
            displayType == 'list' ? 'col-span-5 lg:col-span-2' : 'col-span-5',
          )}
        >
          <div className="relative z-10 h-full">
            <div
              className={cn(
                displayType == 'list'
                  ? 'm-0 aspect-video p-0 lg:aspect-[7/6]'
                  : 'm-0 aspect-video p-0 lg:aspect-auto',
              )}
            >
              <Image
                src={replaceSize(selectedMap?.images[0] || '')}
                className="h-full w-full rounded-md object-cover"
                alt={selectedMap?.name}
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute left-5 top-5 z-20">
            <Button
              variant={'default'}
              size={'icon'}
              className="text-md rounded-full bg-neutral-100 p-2 text-black hover:bg-neutral-100 hover:text-yellow-400 dark:bg-neutral-700 dark:text-neutral-200"
            >
              <Heart />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={cn(
            'z-20 flex h-full w-full flex-col items-start justify-between rounded-[1.875rem] bg-white dark:bg-neutral-900 dark:text-neutral-200',
            displayType == 'list'
              ? 'col-span-5 -mt-6 ml-0 p-5 [height:calc(100%+24px)] lg:col-span-3 lg:-ml-6 lg:mt-0 lg:h-full lg:rounded-[1.875rem] lg:pr-2 lg:[width:calc(100%+24px)]'
              : 'relative col-span-5 -mt-6 rounded-[1.875rem] p-3 [height:calc(100%+24px)]',
          )}
        >
          <div className="w-full p-5 lg:p-0 lg:px-3">
            {/* HEAD */}
            <div
              className={cn(
                'flex w-full items-center justify-between',
                displayType == 'list' ? '' : 'mb-5',
              )}
            >
              <div
                className={cn(
                  'mb-3 rounded-full border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 shadow-2xl dark:border-neutral-600 dark:text-neutral-200',
                  displayType == 'list'
                    ? ''
                    : 'absolute -top-3 right-10 bg-white dark:bg-neutral-700',
                )}
              >
                {Array.from({ length: Number(selectedMap?.star_rating || 0) })
                  .fill(1)
                  .map((_, index) => (
                    <React.Fragment key={index}>⭐</React.Fragment>
                  ))}
                <span className="text-neutral-500 dark:text-neutral-400">
                  (627 reviews)
                </span>
              </div>
            </div>

            {/* NAME & LOCATION */}
            <div className="mb-4">
              <Link href={directLink}>
                <h3
                  className={cn(
                    'mb-1 line-clamp-2 cursor-pointer text-2xl capitalize hover:text-yellow-700',
                    displayType == 'list' ? 'font-[600]' : 'text-lg font-[550]',
                  )}
                >
                  {selectedMap?.name ||
                    convertToTitleCase(hotel?.hotel_id || '')}
                </h3>
              </Link>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-neutral-700 dark:text-neutral-300" />
                <span
                  className={cn(
                    'text-base text-neutral-700 dark:text-neutral-400',
                    displayType == 'list' ? '' : 'text-sm',
                  )}
                >
                  {selectedMap?.address}
                </span>
              </p>
              <p className="flex items-center gap-2 text-neutral-700 dark:text-neutral-400">
                <MapPinnedIcon className="size-4" />
                <span className="text-sm">
                  {calculateKilometerDistance(distance)} from a center
                </span>
              </p>
            </div>

            {/* ADAMENTINE */}
            <div className="my-5">
              <div className="flex flex-wrap items-center justify-start gap-2">
                {hotel?.rates[0]?.amenities_data?.map((amentine, index) => (
                  <React.Fragment key={amentine}>
                    <div className="cursor-pointer rounded-full border border-neutral-300 p-2 px-4 text-xs text-neutral-800 hover:shadow-md dark:border-neutral-500 dark:text-neutral-200">
                      {convertKebabToTitleCase(amentine)}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* SERVICE */}
            {displayType == 'list' && (
              <div className="group">
                <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
                  {hotel?.rates[0]?.payment_options?.payment_types[0]
                    ?.cancellation_penalties?.free_cancellation_before ===
                  null ? (
                    <div className="mb-1 flex items-center gap-1 text-xs text-red-600">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        className="me-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                      </svg>
                      Non Refundable
                    </div>
                  ) : (
                    <div className="mb-1 flex items-center gap-1 text-xs text-green-600">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        className="me-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                      </svg>
                      <span className="text-neutral-800 dark:text-neutral-200">
                        {
                          hotel?.rates[0]?.payment_options?.payment_types[0]
                            ?.cancellation_penalties?.free_cancellation_before
                        }
                      </span>
                    </div>
                  )}

                  {hotel?.rates[0]?.meal && (
                    <div className="mb-1 flex items-center gap-1 text-sm text-green-600">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        className="me-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                      </svg>
                      <span className="text-neutral-800 dark:text-neutral-200">
                        Free Breakfast
                      </span>
                    </div>
                  )}

                  <div className="mb-1 flex items-center gap-1 text-sm text-green-600">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      className="me-2"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                    </svg>
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Free Wifi
                    </span>
                  </div>
                  <div className="mb-1 flex items-center gap-1 text-sm text-green-600">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      className="me-2"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                    </svg>
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Luxury Rooms
                    </span>
                  </div>
                  <div className="mb-1 flex items-center gap-1 text-sm text-green-600">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      className="me-2"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                    </svg>
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Business Rooms
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PRICE */}
          <div className="flex w-full flex-wrap items-center justify-between p-5 lg:p-0 lg:px-3">
            <span className="flex items-center gap-2 text-xl font-bold">
              {displayType == 'list' && (
                <span className="text-base font-light text-neutral-500">
                  From
                </span>
              )}
              <span className={cn(displayType == 'list' ? '' : 'text-base')}>
                {`${formatCurrencyWithCodeAsSuffix(
                  Number(
                    hotel?.rates[0]?.payment_options?.payment_types[0]
                      ?.show_amount || 0,
                  ),
                  hotel?.rates[0]?.payment_options?.payment_types[0]
                    ?.show_currency_code || 'VND',
                )}`}
              </span>
              {displayType == 'list' && (
                <span className="text-base font-light text-neutral-500">
                  {' '}
                  / nights
                </span>
              )}
              {/* <span className="line-through text-neutral-400 text-sm font-normal ml-2">
                        $1000
                     </span> */}
            </span>
            {/* {displayType == 'list' ? (
                     <Link href={directLink}>
                        <Button variant="default" className="text-sm">
                           Book now
                        </Button>
                     </Link>
                  ) : ( */}
            <Link href={directLink}>
              <Button
                variant="default"
                className={cn(
                  'mt-2 rounded-full bg-neutral-100 text-sm font-medium text-black transition-all duration-300 ease-in-out hover:bg-neutral-800 hover:text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 sm:mt-0',
                )}
              >
                {displayType == 'list' ? 'See Availability' : 'Book now'}
              </Button>
            </Link>
            {/* )} */}
          </div>
        </div>
      </div>

      {/* Right sell off */}
      <div
        className="absolute right-10 top-0 z-30 flex h-[2.75rem] w-[2.75rem] items-center justify-center bg-cover bg-no-repeat text-center text-sm font-medium text-black"
        style={{
          background: 'url(/assets/images/hotel/sale.png)',
          backgroundPosition: '50%',
        }}
      >
        <span className="-mt-2">-25%</span>
      </div>
    </Card>
  );
};

export default HotelCard;

export const HotelCardSkeleton = ({
  displayType = 'grid',
}: {
  displayType?: 'list' | 'grid';
}) => {
  return (
    <Card className="group relative h-full w-full overflow-hidden rounded-[1.875rem] border-neutral-200 transition-shadow hover:shadow-xl dark:border-neutral-700">
      <div className={cn('grid h-full w-full grid-cols-5 items-center')}>
        <div
          className={cn(
            displayType == 'list' ? 'col-span-5 lg:col-span-2' : 'col-span-5',
          )}
        >
          <div className="relative z-10 h-full">
            <div
              className={cn(
                displayType == 'list'
                  ? 'm-0 aspect-video p-0 lg:aspect-[7/6]'
                  : 'm-0 aspect-video p-0 lg:aspect-[1/1]',
              )}
            >
              <Skeleton className="h-full w-full rounded-md object-cover" />
            </div>
          </div>
          <div className="absolute left-5 top-5 z-20">
            <Button
              variant={'default'}
              size={'icon'}
              className="text-md rounded-full bg-neutral-100 p-2 text-black hover:bg-neutral-100 hover:text-yellow-400 dark:bg-neutral-700 dark:text-neutral-200"
            >
              <Skeleton className="h-fit w-fit" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={cn(
            'z-20 flex h-full w-full flex-col items-start justify-between rounded-[1.875rem] bg-white dark:bg-neutral-900 dark:text-neutral-200',
            displayType == 'list'
              ? 'col-span-5 -mt-6 ml-0 p-5 [height:calc(100%+24px)] lg:col-span-3 lg:-ml-6 lg:mt-0 lg:h-full lg:rounded-[1.875rem] lg:pr-2 lg:[width:calc(100%+24px)]'
              : 'relative col-span-5 -mt-6 rounded-[1.875rem] p-3 [height:calc(100%+24px)]',
          )}
        >
          <div className="w-full p-5 lg:p-0 lg:px-3">
            {/* HEAD */}
            <div
              className={cn(
                'flex w-full items-center justify-between',
                displayType == 'list' ? '' : 'mb-5',
              )}
            >
              <div
                className={cn(
                  'mb-3 rounded-full border border-neutral-200 px-3 py-2 shadow-2xl dark:border-neutral-600',
                  displayType == 'list'
                    ? ''
                    : 'absolute -top-3 right-10 bg-white dark:bg-neutral-700',
                )}
              >
                <div className="flex items-center gap-3">
                  <span>
                    {Array.from({ length: 5 })
                      .fill(1)
                      .map((_, index) => (
                        <React.Fragment key={index}>⭐</React.Fragment>
                      ))}
                  </span>
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>

            {/* NAME & LOCATION */}
            <div className="my-3">
              <Skeleton
                className={cn('h-8 w-[80%]', displayType !== 'list' && '')}
              />

              <div className="mt-1 flex items-center gap-2">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className={'h-4 w-[50%]'} />
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className={'h-4 w-[50%]'} />
              </div>
            </div>

            {/* ADAMENTINE */}
            <div className="my-4">
              <div className="flex flex-wrap items-center justify-start gap-2">
                {Array.from({ length: 3 })
                  .fill(1)
                  ?.map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-7 w-20 rounded-full p-2 px-4"
                    />
                  ))}
              </div>
            </div>

            {/* SERVICE */}
            {displayType == 'list' && (
              <div>
                <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
                  {Array.from({ length: 2 })
                    .fill(1)
                    ?.map((_, index) => (
                      <div key={index} className="mb-3 flex items-center gap-1">
                        <Skeleton className="size-4 rounded-md" />
                        <Skeleton className={'h-4 w-[80%]'} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* PRICE */}
          <div className="flex w-full flex-wrap items-center justify-between p-5 lg:p-0 lg:px-3">
            <Skeleton className={'h-6 w-[40%]'} />

            <Skeleton className={'h-8 w-28 rounded-full'} />
          </div>
        </div>
      </div>

      {/* Right sell off */}
      <div
        className="absolute right-10 top-0 z-30 flex h-[2.75rem] w-[2.75rem] items-center justify-center bg-cover bg-no-repeat text-center text-sm font-medium text-black"
        style={{
          background: 'url(/assets/images/hotel/sale.png)',
          backgroundPosition: '50%',
        }}
      >
        <Skeleton className={cn(displayType == 'list' ? '' : 'text-base')} />
      </div>
    </Card>
  );
};

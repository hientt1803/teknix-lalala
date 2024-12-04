import { Map, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IHotelReservation } from '@/stores/features/stay/type';

const SearchGroup = dynamic(() =>
  import('@/components/common/searchGroup/searchGroup').then(
    mob => mob.SearchGroup,
  ),
);

export const BannerSection = ({
  data,
  scrollIntoListRoomSection,
  scrollIntoLocationSection,
}: {
  data?: IHotelReservation;
  scrollIntoListRoomSection: () => void;
  scrollIntoLocationSection: () => void;
}) => {
  return (
    <>
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-lg"
        style={{
          background:
            "url('/assets/images/checkout/banner-hotel.png') center center",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '550px',
        }}
      >
        <div className="absolute left-0 top-0 z-[1] h-full w-full bg-gradient-to-r from-neutral-800 to-neutral-900 opacity-60" />
        <div className="z-10 flex h-full w-full items-start justify-between gap-2 px-10">
          <div className="flex flex-col items-start justify-start gap-5">
            <div className="w-fit rounded-full bg-neutral-100 px-6 py-2 dark:bg-neutral-200">
              <span className="flex items-center gap-1 text-sm">
                {data?.star_rating === 0
                  ? '0 star'
                  : new Array(data?.star_rating)
                      .fill(1)
                      .map((_, index) => (
                        <React.Fragment key={index}>⭐</React.Fragment>
                      ))}
              </span>
            </div>
            <div className="flex max-w-[56.25rem] items-center gap-2 text-4xl font-semibold leading-tight text-white dark:text-neutral-200 md:text-6xl">
              Welcome to {data?.name}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-100 dark:text-neutral-300">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MapPin className="size-4 text-neutral-300" />
                  <span className="font-medium text-neutral-100 dark:text-neutral-300">
                    {data?.address}
                  </span>
                </li>
                <li className="flex cursor-pointer items-center gap-2">
                  <Map className="size-4 text-neutral-300" />
                  <span
                    className="font-medium text-neutral-100 dark:text-neutral-300"
                    onClick={scrollIntoLocationSection}
                  >
                    Show on Map
                  </span>
                </li>
                <li>
                  <Button
                    variant="default"
                    className={cn(
                      'mt-5 min-w-44 rounded-full bg-neutral-100 text-sm font-medium text-black transition-all duration-300 ease-in-out hover:bg-neutral-800 hover:text-neutral-200',
                    )}
                    onClick={scrollIntoListRoomSection}
                  >
                    Book now
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -top-24 mx-0 lg:mx-2">
        <SearchGroup showBorder showTabs isFromHotelDetail />
      </div>
    </>
  );
};

'use client';

import { Content } from '@prismicio/client';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import Image from '@/components/common/images/image';
import { CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { HotDestination } from '@/services/global';
import { setSearchGlobalLocation } from '@/stores/features/global/global-slice';
import { useAppSelector } from '@/stores/hook';
import {
  convertStringToDate,
  formatDateToYearMonthDay,
} from '@/utilities/datetime';

export const ExploreStayList = ({
  slice,
  topDestination,
}: {
  slice: Content.ExploreStaySlice;
  topDestination: HotDestination[] | null;
}) => {
  const router = useRouter();

  // redux
  const globalState = useAppSelector(state => state.globalSlice.searchGlobal);
  const dispatch = useDispatch();

  const handleDirectAndSearch = (destination: HotDestination) => {
    dispatch(
      setSearchGlobalLocation({
        name: destination?.city_name,
        searchType: 'region',
        hotelId: destination?.id,
        lat: Number(destination?.lat),
        lon: Number(destination?.long),
        placeId: Number(destination?.place_id),
      }),
    );

    setCookie('locationSearch', destination?.city_name);
    setCookie('locationImage', destination?.image_url);

    // convert data
    const startDate = formatDateToYearMonthDay(
      convertStringToDate(globalState.dateRange.startDate),
    );
    const endDate = formatDateToYearMonthDay(
      convertStringToDate(globalState.dateRange.endDate),
    );

    let adults = 0;
    globalState.people
      ? globalState.people.forEach(item => {
          adults += item.adults;
        })
      : [];

    const params = new URLSearchParams({
      checkin: startDate,
      checkout: endDate,
      language: 'en',
      adults: adults.toString(),
      currency: 'VND',
    });

    let childrens = 0;
    globalState.people.map(item => {
      item.children.forEach((child, index) => {
        childrens++;
        params.append(`childrens[${index}]`, String(child));
      });
    });

    params.append(
      'latitude',
      String(globalState?.location?.lat) || '10.0364634',
    );
    params.append(
      'longtitude',
      String(globalState?.location?.lon) || '105.7875821',
    );
    params.append('region', String(globalState?.location.name) || '');

    router.push(`/hotel?${params.toString()}`);
  };

  return (
    <>
      {topDestination && (
        <>
          {(slice.variation === 'default'
            ? topDestination
            : topDestination
          ).map((des, index) => (
            <CarouselItem className="basis-1/2 md:basis-1/5" key={index}>
              <div className="flex flex-col">
                <div
                  className={cn(
                    'group relative w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl',
                    {
                      'aspect-square sm:aspect-[5/4]':
                        slice.variation === 'default',
                      'aspect-square sm:aspect-[4/6]':
                        slice.variation === 'destination',
                    },
                  )}
                  onClick={() => handleDirectAndSearch(des)}
                >
                  <Image
                    src={des.image_url}
                    className="h-full w-full rounded-2xl object-cover"
                    alt="nc-imgs"
                    loading="lazy"
                  />

                  <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
                </div>
                <div className="mt-4 truncate">
                  <h2
                    className="cursor-pointer truncate text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg"
                    onClick={() => handleDirectAndSearch(des)}
                  >
                    {des.city_name}
                  </h2>
                  <span className="mt-2 block text-sm text-neutral-600 dark:text-neutral-400">
                    {des.hotel_count} properties
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </>
      )}
    </>
  );
};

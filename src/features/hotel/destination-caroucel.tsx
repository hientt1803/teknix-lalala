'use client';

import { setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Image from '@/components/common/images/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { API_URL } from '@/configs';
import { HotDestination } from '@/services/global';
import { useAppSelector } from '@/stores';
import { setSearchGlobalLocation } from '@/stores/features/global/global-slice';
import { setTriggerSearch } from '@/stores/features/stay/stay-slice';
import {
  convertStringToDate,
  formatDateToYearMonthDay,
} from '@/utilities/datetime';

export const DestinationCaroucel = () => {
  // next api

  // redux
  const dispatch = useDispatch();
  const globalState = useAppSelector(state => state.globalSlice.searchGlobal);

  // State
  const [listDestination, setListDestination] = useState<HotDestination[]>([]);

  // Logic
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/global/hot_destinations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      setListDestination(data);
    };

    fetchData();
  }, []);

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

    params.append('latitude', String(destination?.lat) || '10.0364634');
    params.append('longtitude', String(destination?.long) || '105.7875821');
    params.append('region', String(destination?.city_name) || '');

    dispatch(setTriggerSearch(true));

    globalThis.history.pushState({}, '', `/hotel?${params.toString()}`);
    // router.push('/hotel?' + params?.toString(), {
    //   scroll: false,
    // });
  };

  return (
    <div className="hidden md:block">
      <Carousel
        className="my-20 w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {listDestination?.map((des, index) => (
            <CarouselItem
              key={index}
              className="ml-5 md:basis-1/2 lg:basis-1/12"
              onClick={() => handleDirectAndSearch(des)}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="aspect-vide overflow-hidden rounded-full">
                  <Image
                    src={des?.image_url}
                    alt={des?.city_name}
                    className="h-[120px] w-full cursor-pointer"
                  />
                </div>

                <div className="flex flex-col items-center justify-center gap-2 text-sm">
                  <div className="cursor-pointer text-center font-medium">
                    {des?.city_name}
                  </div>
                  <div className="cursor-pointer text-xs font-medium text-neutral-500">
                    {des?.hotel_count} Hotels
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
          {listDestination?.map((des, index) => (
            <CarouselItem
              key={index}
              className="ml-5 md:basis-1/2 lg:basis-1/12"
              onClick={() => handleDirectAndSearch(des)}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="aspect-vide overflow-hidden rounded-full">
                  <Image
                    src={des?.image_url}
                    alt={des?.city_name}
                    className="h-[120px] w-full cursor-pointer"
                  />
                </div>

                <div className="flex flex-col items-center justify-center gap-2 text-sm">
                  <div className="cursor-pointer text-center font-medium">
                    {des?.city_name}
                  </div>
                  <div className="cursor-pointer text-xs font-medium text-neutral-500">
                    {des?.hotel_count} Hotels
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
          {listDestination?.map((des, index) => (
            <CarouselItem
              key={index}
              className="ml-5 md:basis-1/2 lg:basis-1/12"
              onClick={() => handleDirectAndSearch(des)}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="aspect-vide overflow-hidden rounded-full">
                  <Image
                    src={des?.image_url}
                    alt={des?.city_name}
                    className="h-[120px] w-full cursor-pointer"
                  />
                </div>

                <div className="flex flex-col items-center justify-center gap-2 text-sm">
                  <div className="cursor-pointer text-center font-medium">
                    {des?.city_name}
                  </div>
                  <div className="cursor-pointer text-xs font-medium text-neutral-500">
                    {des?.hotel_count} Hotels
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-5 bg-neutral-200 text-black hover:bg-neutral-800 hover:text-white" />
        <CarouselNext className="-right-5 bg-neutral-200 text-black hover:bg-neutral-800 hover:text-white" />
      </Carousel>
    </div>
  );
};

'use client';

import { getDistance } from 'geolib';
import { LayoutGrid, LayoutList } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProgressStore } from '@/hooks/use-progress';
import { Category } from '@/lib/MarkerCategories';
import { PlaceValues } from '@/lib/Places';
import {
  setTriggerSearch,
  useLazyGetListHotelByGeoSearchEngineQuery,
} from '@/stores/features/stay';
import {
  IHotelDataMapHotels,
  IHotelSearchGeoEngineRequest,
} from '@/stores/features/stay/type';
import { useAppSelector } from '@/stores/hook';
import { formatDateToYearMonthDay } from '@/utilities/datetime';

const ListHotelWithoutMap = dynamic(() =>
  import('./list-hotel').then(module_ => module_.ListHotelWithoutMap),
);
const FilterDrawer = dynamic(() =>
  import('../filters/filter-drawer').then(module_ => module_.FilterDrawer),
);
const ListFilter = dynamic(() =>
  import('../filters/list-filter').then(module_ => module_.ListFilter),
);

export const WithoutMapContainer = () => {
  // redux
  const globalSearchState = useAppSelector(
    state => state.globalSlice.searchGlobal,
  );
  const isSearchGlobal = useAppSelector(
    state => state.staySlice.isTriggerGlobal,
  );
  const dispatch = useDispatch();

  // Api
  const [
    fetchHotelByGeo,
    {
      data: searchHotelGeo,
      isLoading: searchHotelGeoLoading,
      isFetching: searchHotelGeoFetching,
    },
  ] = useLazyGetListHotelByGeoSearchEngineQuery();

  // Hook
  const { start, done } = useProgressStore();

  // Logic
  const fetchDataFromApi = () => {
    let checkin = new Date(globalSearchState.dateRange.startDate);
    let checkout = new Date(globalSearchState.dateRange.endDate);

    const searchParams = {
      checkin: formatDateToYearMonthDay(checkin),
      checkout: formatDateToYearMonthDay(checkout),
      language: globalSearchState?.lang?.cca2 || 'US',
      guests: globalSearchState.people,
      currency: globalSearchState?.currency?.code || 'VND',
      latitude: globalSearchState?.location?.lat || 10.036_463_4,
      longitude: globalSearchState?.location?.lon || 105.787_582_1,
      radius: globalSearchState?.location?.radius || 30_000,
      place_id: globalSearchState?.location?.placeId || 238_946_329,
    };

    fetchHotelByGeo(searchParams as IHotelSearchGeoEngineRequest);
  };

  useEffect(() => {
    if (isSearchGlobal) {
      fetchDataFromApi();
    }
  }, [isSearchGlobal]);

  useEffect(() => {
    if (searchHotelGeoLoading || searchHotelGeoFetching) {
      start();
    } else {
      done();
    }
  }, [searchHotelGeoLoading, searchHotelGeoFetching]);

  useEffect(() => {
    dispatch(setTriggerSearch(true));
  }, []);

  const kilometDistanceFromOrigin = useCallback(
    (selectedMap: IHotelDataMapHotels) => {
      const latitude = globalSearchState.location?.lat || 30;
      const longtitude = globalSearchState.location?.lon || 20;

      const result = getDistance(
        {
          latitude: latitude,
          longitude: longtitude,
        },
        {
          latitude: selectedMap?.latitude || 0,
          longitude: selectedMap?.longitude || 0,
        },
      );

      return result;
    },
    [],
  );

  const hotelsWithMapData = useMemo(() => {
    const hotels = searchHotelGeo?.hotels?.map(hotel => {
      const selectedMap = searchHotelGeo?.map_hotels?.find(
        item => item.id === hotel.hotel_id,
      );

      let distance = 0;
      if (selectedMap) {
        distance = kilometDistanceFromOrigin(selectedMap);
      }

      return { hotel, selectedMap, distance };
    });

    return hotels?.sort((a, b) => a.distance - b.distance);
  }, [searchHotelGeo, kilometDistanceFromOrigin]);

  const placeData = useMemo(() => {
    return (
      hotelsWithMapData?.map(hotel => {
        const place: PlaceValues = {
          id: hotel.hotel.hotel_id,
          address: hotel.selectedMap?.address || '',
          image:
            hotel.selectedMap?.images.map(img =>
              img.replace('{size}', '640x400'),
            ) || [],
          category: Category.HOTEL,
          position: [
            hotel.selectedMap?.latitude || 0,
            hotel.selectedMap?.longitude || 0,
          ],
          title: hotel.selectedMap?.name || '',
          price: Number.parseFloat(
            hotel?.hotel?.rates[0]?.daily_prices[0] || '0',
          ),
          star: hotel.selectedMap?.star_rating || 0,
        };
        return place; // Return place for each mapped hotel
      }) || []
    ); // Ensure an empty array if hotelsWithMapData is undefined
  }, [hotelsWithMapData]);

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-3">
          <div className="block w-full lg:hidden">
            <div className="mx-auto">
              <FilterDrawer
                placeData={placeData}
                searchGlobal={globalSearchState}
              />
            </div>
          </div>
          <div className="hidden lg:col-span-3 lg:block">
            <ListFilter
              placeData={placeData}
              searchGlobal={globalSearchState}
            />
          </div>
        </div>
        <div className="col-span-12 w-full lg:col-span-9">
          <Tabs defaultValue="list" className="w-full overflow-hidden">
            <div className="mb-6 flex flex-col items-center justify-between gap-3 lg:flex-row lg:items-start">
              <div className="flex w-full flex-col items-center justify-between lg:flex-row">
                <div className="flex flex-wrap items-center justify-start gap-3">
                  <TabsList className="flex items-center gap-0 bg-transparent">
                    <TabsTrigger
                      value="list"
                      className="rounded-none rounded-l-lg px-1 py-2 text-neutral-400 data-[state=active]:border-none data-[state=active]:text-black data-[state=active]:shadow-none dark:text-neutral-600 dark:data-[state=active]:text-neutral-200"
                    >
                      <LayoutList className="h-5 w-5" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="grid"
                      className="rounded-none rounded-r-lg px-1 py-2 text-neutral-400 data-[state=active]:border-none data-[state=active]:text-black data-[state=active]:shadow-none dark:text-neutral-600 dark:data-[state=active]:text-neutral-200"
                    >
                      <LayoutGrid className="h-5 w-5" />
                    </TabsTrigger>
                  </TabsList>
                  <span className="dark:text-neutral-300">
                    1 - 10 of {hotelsWithMapData?.length || 0} hotels found
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  <div className="mr-2 flex cursor-pointer items-center gap-2 hover:underline dark:text-neutral-200">
                    Clear Filters
                  </div>
                  <Select>
                    <div className="flex items-center rounded-md border border-neutral-200 px-1 dark:border-neutral-600">
                      <div className="text-sm text-neutral-500 dark:text-neutral-300">
                        Show
                      </div>
                      <SelectTrigger className="w-fit border-none shadow-none outline-none">
                        <SelectValue placeholder="10" defaultValue={'10'} />
                      </SelectTrigger>
                    </div>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <div className="flex items-center rounded-md border border-neutral-200 px-1 dark:border-neutral-600">
                      <div className="text-sm text-neutral-500 dark:text-neutral-300">
                        Sort by:
                      </div>
                      <SelectTrigger className="w-fit border-none shadow-none outline-none">
                        <SelectValue placeholder="Name" defaultValue={'name'} />
                      </SelectTrigger>
                    </div>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="mb-4 w-full bg-neutral-200 dark:bg-neutral-400" />

            <TabsContent value="list" className="w-full">
              <div className="grid w-full grid-cols-12 gap-6">
                <div className="col-span-12">
                  <ListHotelWithoutMap
                    type="list"
                    hotelsWithMapData={hotelsWithMapData}
                    searchHotelGeoFetching={searchHotelGeoFetching}
                    searchHotelGeoLoading={searchHotelGeoLoading}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="grid" className="w-full">
              <div className="w-full">
                <ListHotelWithoutMap
                  type="grid"
                  hotelsWithMapData={hotelsWithMapData}
                  searchHotelGeoFetching={searchHotelGeoFetching}
                  searchHotelGeoLoading={searchHotelGeoLoading}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

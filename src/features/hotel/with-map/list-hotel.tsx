'use client';

import { getDistance } from 'geolib';
import { XIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch } from 'react-redux';

import Map from '@/components/common/map';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { AppConfig } from '@/lib/AppConfig';
import { Category } from '@/lib/MarkerCategories';
import { PlaceValues } from '@/lib/Places';
// import { Places } from '@/lib/Places';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/stores';
import {
  setTriggerSearch,
  useLazyGetListHotelByGeoSearchEngineQuery,
} from '@/stores/features/stay';
import {
  IHotelDataMapHotels,
  IHotelSearchGeoEngineRequest,
} from '@/stores/features/stay/type';
import { formatDateToYearMonthDay } from '@/utilities/datetime';

import HotelCard, { HotelCardSkeleton } from '../cards/hotel-card';
import { ListHotelWioutMapType } from '../without-map/list-hotel';

export const ListHotel = ({
  type = 'list',
  visibleItem = 10,
}: ListHotelWioutMapType) => {
  // redux
  const globalSearchState = useAppSelector(
    state => state.globalSlice.searchGlobal,
  );
  const isSearchGlobal = useAppSelector(
    state => state.staySlice.isTriggerGlobal,
  );
  const dispatch = useDispatch();

  // state
  const [hasMore, setHasMore] = useState(true);
  const [visibleItems, setVisibleItems] = useState(visibleItem);

  // Api
  const [
    fetchHotelByGeo,
    {
      data: searchHotelGeo,
      isLoading: searchHotelGeoLoading,
      isFetching: searchHotelGeoFetching,
    },
  ] = useLazyGetListHotelByGeoSearchEngineQuery();

  // Logic
  const fetchDataFromApi = () => {
    const searchParams = {
      checkin: formatDateToYearMonthDay(
        new Date(globalSearchState.dateRange.startDate),
      ),
      checkout: formatDateToYearMonthDay(
        new Date(globalSearchState.dateRange.endDate),
      ),
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

  const loadMore = useCallback(() => {
    if (hotelsWithMapData) {
      if (visibleItems >= hotelsWithMapData?.length) {
        setHasMore(false);
      } else {
        setVisibleItems(previousItems => previousItems + visibleItem);
      }
    }
  }, [hotelsWithMapData, visibleItem, visibleItems]);

  if (searchHotelGeoLoading || searchHotelGeoFetching) {
    return (
      <div
        className={cn(
          'grid w-full gap-3',
          type == 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
            : 'grid-cols-1',
        )}
      >
        {Array.from({ length: 3 })
          .fill(1)
          .map((_, index) => (
            <HotelCardSkeleton displayType={type} key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-28 pb-24 lg:pb-28 xl:max-w-none xl:pr-0 2xl:pl-10">
      <div>
        <div className="relative flex min-h-screen">
          <div className="min-h-screen w-full flex-shrink-0 xl:w-[780px] xl:px-8 2xl:w-[880px]">
            <div className="mb-12 flex w-full flex-col items-start justify-start lg:mb-16">
              <div className="">
                <h2 className="line-clamp-1 text-4xl font-semibold leading-snug">
                  Stays in New York
                </h2>
                <span className="mt-3 block text-neutral-500 dark:text-neutral-400">
                  120 stays
                  <span className="mx-2">·</span>
                  Oct 18 - Oct 30
                  <span className="mx-2">·</span>2 Guests
                </span>
              </div>
              {/* <FilterCollapse /> */}
            </div>

            {/* LIST HOTEL */}
            {/* <InfiniteScroll
                     pageStart={0}
                     loadMore={loadMore}
                     hasMore={hasMore}
                     loader={
                        <>
                           {Array(2)
                              .fill(1)
                              .map((_, index) => (
                                 <HotelCardSkeleton displayType={type} key={index} />
                              ))}
                        </>
                     }
                     useWindow={true}
                     className="w-full h-full"
                  >
                     <div className="grid grid-cols-1 gap-8">
                        {hotelsWithMapData
                           ?.slice(0, visibleItems)
                           ?.map((hotel, index) => (
                              <HotelCard
                                 key={index}
                                 selectedMap={hotel.selectedMap}
                                 hotel={hotel.hotel}
                                 distance={hotel.distance}
                                 displayType={type}
                              />
                           ))}
                     </div>
                  </InfiniteScroll> */}

            <Pagination className="py-16">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                  //    onClick={(e) => {
                  //       e.preventDefault();
                  //       const prevPage = page > 1 ? page - 1 : 1;
                  //       router.replace(`?page=${prevPage}`);
                  //    }}
                  //    href={`?page=${page > 1 ? page - 1 : 1}`}
                  />
                </PaginationItem>
                {/* {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                        const currentPage = startPage + index;
                        return (
                           <PaginationItem key={currentPage}>
                              <Link
                                 shallow
                                 className={buttonVariants({
                                    variant: page === currentPage ? 'default' : 'outline',
                                    size: 'icon',
                                    className: 'rounded-full p-6',
                                 })}
                                 href={`?page=${currentPage}`}
                              >
                                 {currentPage}
                              </Link>
                           </PaginationItem>
                        );
                     })} */}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                  //    onClick={(e) => {
                  //       e.preventDefault();
                  //       const nextPage = page < totalPages ? page + 1 : page;
                  //       router.replace(`?page=${nextPage}`);
                  //    }}
                  //    href={`?page=${page < totalPages ? page + 1 : page}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <Dialog>
            <DialogTrigger className="fixed bottom-8 left-1/2 z-30 flex -translate-x-1/2 transform cursor-pointer items-center justify-center space-x-3 rounded-full bg-neutral-900 px-6 py-2 text-sm text-white shadow-2xl xl:hidden">
              <i className="las la-map text-lg"></i>
              <span>Show map</span>
            </DialogTrigger>
            <DialogContent className="h-screen min-w-full">
              <DialogClose className="absolute left-5 top-5 z-[999]">
                <Button size="icon" className="rounded-2xl" variant={'ghost'}>
                  <XIcon />
                </Button>
              </DialogClose>
              {false ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <>
                  {/* {!placeData || placeData.length <= 0 ? (
                                        <Skeleton className="w-full h-full" />
                                    ) : ( */}
                  {/* <Map
                                        data={placeData}
                                        center={[
                                            searchGlobal.location.lat,
                                            searchGlobal.location.lon,
                                        ]}
                                    /> */}
                  {/* )} */}
                </>
              )}
            </DialogContent>
          </Dialog>
          <div className="hidden xl:static xl:block xl:flex-grow">
            <div className="fixed left-0 top-0 h-full w-full overflow-hidden rounded-md xl:sticky xl:top-[88px] xl:h-[calc(100vh-88px)]">
              {false ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <Map
                  data={placeData}
                  center={[
                    globalSearchState?.location?.lat || 0,
                    globalSearchState?.location?.lon || 0,
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

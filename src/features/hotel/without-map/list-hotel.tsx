'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { cn } from '@/lib/utils';
import {
  IHotelDataHotels,
  IHotelDataMapHotels,
} from '@/stores/features/stay/type';

const HotelCard = dynamic(() =>
  import('../cards/hotel-card').then(module_ => module_.default),
);
const HotelCardSkeleton = dynamic(() =>
  import('../cards/hotel-card').then(module_ => module_.HotelCardSkeleton),
);

export type ListHotelWioutMapType = {
  type: 'list' | 'grid';
  visibleItem?: number;
  hotelsWithMapData:
    | {
        hotel: IHotelDataHotels;
        selectedMap: IHotelDataMapHotels | undefined;
        distance: number;
      }[]
    | undefined;
  searchHotelGeoLoading: boolean;
  searchHotelGeoFetching: boolean;
};

export const ListHotelWithoutMap = (props: ListHotelWioutMapType) => {
  const {
    type = 'list',
    visibleItem = 10,
    hotelsWithMapData,
    searchHotelGeoFetching,
    searchHotelGeoLoading,
  } = props;

  // next api
  const searchParams = useSearchParams();

  // state
  const [hasMore, setHasMore] = useState(true);
  const [visibleItems, setVisibleItems] = useState(visibleItem);

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
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      threshold={300}
      loader={
        <>
          <div
            className={cn(
              'grid gap-3',
              type == 'list' ? 'grid-cols-1' : 'grid-cols-3',
            )}
          >
            {Array.from({ length: 2 })
              .fill(1)
              .map((_, index) => (
                <HotelCardSkeleton displayType={type} key={index} />
              ))}
          </div>
        </>
      }
      useWindow={true}
      className="h-full w-full"
    >
      <div
        key={'infinity-scroll-key'}
        className={cn(
          'grid w-full',
          type == 'list'
            ? 'grid-cols-1 gap-5'
            : 'grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {hotelsWithMapData?.slice(0, visibleItems)?.map((hotel, index) => {
          const directLink = `/hotel/${hotel.hotel.hotel_id}?${searchParams.toString()}`;

          return (
            <>
              {hotel?.selectedMap && (
                <HotelCard
                  key={index}
                  selectedMap={hotel.selectedMap}
                  hotel={hotel.hotel}
                  distance={hotel.distance}
                  displayType={type}
                  directLink={directLink}
                />
              )}
            </>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};

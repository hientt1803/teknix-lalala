'use client';

import { cn } from '@/lib/utils';
import { IHotelDataHotels, IHotelDataMapHotels } from '@/stores/features/stay/type';
import { useAppSelector } from '@/stores/hook';
import { convertStringToDate, formatDateUTC } from '@/utilities/datetime';
import { useCallback, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { HotelCardSkeleton } from '../cards/hotel-card';
import dynamic from 'next/dynamic';

const HotelCard = dynamic(() => import('../cards/hotel-card').then((mod) => mod.default), {
   loading: () => <HotelCardSkeleton displayType={'list'} />,
});

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

   // redux
   const globalSearchState = useAppSelector((state) => state.globalSlice.searchGlobal);

   // state
   const [hasMore, setHasMore] = useState(true);
   const [visibleItems, setVisibleItems] = useState(visibleItem);

   const loadMore = useCallback(() => {
      if (hotelsWithMapData) {
         if (visibleItems >= hotelsWithMapData?.length) {
            setHasMore(false);
         } else {
            setVisibleItems((prevItems) => prevItems + visibleItem);
         }
      }
   }, [hotelsWithMapData, visibleItem, visibleItems]);

   const totalAdults = useMemo(() => {
      let total = 0;
      globalSearchState.people.forEach((room) => {
         total += room.adults;
      });
      return total;
   }, [globalSearchState.people]);

   const totalChildren = useMemo(() => {
      let total = 0;
      globalSearchState.people.forEach((room) => {
         total += room.children.length;
      });
      return total;
   }, [globalSearchState.people]);

   const guestPlaceHolder = totalAdults + totalChildren;

   if (searchHotelGeoLoading || searchHotelGeoFetching) {
      return (
         <div
            className={cn(
               'w-full grid gap-3',
               type == 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1',
            )}
         >
            {Array(3)
               .fill(1)
               .map((_, index) => (
                  <HotelCardSkeleton displayType={type} key={index} />
               ))}
         </div>
      );
   }

   return (
      <div>
         <div className="flex justify-between items-start flex-wrap w-full mb-12 lg:mb-6">
            <h2 className="text-4xl font-semibold leading-snug line-clamp-1">
               Stays in {globalSearchState?.location.name}
            </h2>
            <span className="block text-slate-500 dark:text-slate-400 mt-3">
               {hotelsWithMapData?.length || 0} stays
               <span className="mx-2">·</span>
               {formatDateUTC(convertStringToDate(globalSearchState.dateRange.startDate))} -{' '}
               {formatDateUTC(convertStringToDate(globalSearchState.dateRange.endDate))}
               <span className="mx-2">·</span> {guestPlaceHolder} Guest
            </span>
         </div>
         <InfiniteScroll
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
            <div
               className={cn(
                  'w-full grid',
                  type == 'list'
                     ? 'grid-cols-1 gap-3'
                     : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5',
               )}
            >
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
         </InfiniteScroll>

         {/* <div className="mt-10">
            <Pagination>
               <PaginationContent>
                  <PaginationItem>
                     <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationNext href="#" />
                  </PaginationItem>
               </PaginationContent>
            </Pagination>
         </div> */}
      </div>
   );
};

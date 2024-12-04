'use client';

import { addDays, format, formatDate } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { HotelCardSkeleton } from '@/features/hotel/cards/hotel-card';
import { useProgressStore } from '@/hooks/use-progress';
import { cn } from '@/lib/utils';
import { onOpen } from '@/stores/features/dialog';
import {
  setReserveForm,
  setTriggerRoomSearch,
  useLazyGetRoomActiveByHotelIdQuery,
} from '@/stores/features/stay';
import { IReserveForm, Rate } from '@/stores/features/stay/type';
import { useAppSelector } from '@/stores/hook';

import RoomCard from '../card-room-v2';

export const ListRoomSections = ({ id }: { id: string }) => {
  // next api
  const router = useRouter();

  // Redux
  const searchGlobal = useAppSelector(state => state.globalSlice.searchGlobal);
  const user = useAppSelector(state => state.userSlice.access_token);
  const hotel = useAppSelector(state => state.staySlice);
  const dispatch = useDispatch();

  // API Query
  const [fetchRoom, { data: hotelData, isLoading, isFetching }] =
    useLazyGetRoomActiveByHotelIdQuery();

  // States
  const [showAll, setShowAll] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // hook
  const { start, done } = useProgressStore();

  // Logic
  useEffect(() => {
    dispatch(setTriggerRoomSearch(true));
  }, []);

  useEffect(() => {
    if (isLoading || isFetching) {
      start();
    } else {
      done();
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (hotel.isTriggerRoomSearch) {
      const params = {
        checkin:
          searchGlobal?.dateRange?.startDate ||
          formatDate(new Date(), 'yyyy-MM-dd'),
        checkout:
          searchGlobal?.dateRange?.endDate ||
          formatDate(addDays(new Date(), 1), 'yyyy-MM-dd'),
        currency: searchGlobal?.currency?.code || 'USD',
        language: searchGlobal?.lang?.cca2 || 'en',
        guests: searchGlobal.people || [{ adults: 1, children: [] }],
        id,
        residency: searchGlobal?.lang?.cca2 || 'en',
      };

      fetchRoom(params);
    }
  }, [hotel.isTriggerRoomSearch]);

  const roomGroup = useMemo(() => {
    if (!hotelData?.hotels[0]?.rates) return [];

    // Deduplicate based on `room_data_trans.main_name`
    const uniqueRooms = hotelData.hotels[0].rates.filter(
      (rate, index, self) =>
        index ===
        self.findIndex(
          r => r.room_data_trans.main_name === rate.room_data_trans.main_name,
        ),
    );

    return uniqueRooms;
  }, [hotelData?.hotels]);

  // Filtered Data
  const filteredData = useMemo(() => {
    if (selectedFilter === 'All') return roomGroup;
    return roomGroup.filter(
      rate => rate.room_data_trans.main_name === selectedFilter,
    );
  }, [selectedFilter, roomGroup]);

  const totalAdults = useMemo(() => {
    let total = 0;
    searchGlobal.people?.forEach(room => {
      total += room.adults;
    });
    return total;
  }, [searchGlobal.people]);

  const totalChildren = useMemo(() => {
    let total = 0;
    searchGlobal.people?.forEach(room => {
      total += room.children.length;
    });
    return total;
  }, [searchGlobal.people]);

  const handleReservation = (rate: Rate) => {
    if (user && user !== '') {
      const dataReserve: IReserveForm = {
        ...hotel,
        hotel_id: id || '',
        room_id: rate.room_name,
        book_hash: rate.book_hash,
        match_hash: rate.match_hash,
        checkin_date: format(
          searchGlobal.dateRange.startDate,
          "yyyy-MM-dd'T'HH:mm:ss",
        ),
        checkout_date: format(
          searchGlobal.dateRange.endDate,
          "yyyy-MM-dd'T'HH:mm:ss",
        ),
        num_guests: totalAdults + totalChildren,
        rate: rate,
      };

      dispatch(setReserveForm(dataReserve));

      router.push('/checkout');
    } else {
      dispatch(onOpen());
    }
  };

  return (
    <div className="my-14">
      {/* Heading Section */}
      <div className="mb-5">
        <h1 className="mb-3 text-5xl font-semibold dark:text-neutral-200">
          Our Best Rooms
        </h1>
        <p className="text-xl font-medium text-neutral-400">
          Book online today and look forward to a relaxing stay with us
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-14 flex flex-wrap gap-2">
        {/* Room-Specific Filters */}
        {isLoading || isFetching ? (
          <>
            {Array.from({ length: 5 })
              .fill(1)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className={
                    'w-44 cursor-pointer rounded-full border border-neutral-200 p-6 text-sm font-medium hover:shadow-xl md:text-base'
                  }
                />
              ))}
          </>
        ) : (
          <>
            {/* "All" Filter */}
            <div className="relative">
              <div
                className={cn(
                  'cursor-pointer rounded-3xl border border-neutral-200 px-6 py-4 text-sm font-medium hover:shadow-xl dark:border-neutral-600 dark:text-neutral-300 md:text-base',
                  selectedFilter === 'All' &&
                    'bg-neutral-700 text-neutral-200 dark:bg-neutral-800 dark:text-neutral-100',
                )}
                onClick={() => setSelectedFilter('All')}
              >
                All
              </div>
              <Button
                size="icon"
                className="absolute -right-2 -top-2 rounded-full bg-neutral-900 p-0 dark:border dark:border-neutral-500 dark:bg-neutral-700 dark:text-neutral-200"
              >
                {roomGroup.length}
              </Button>
            </div>

            {(showAll ? roomGroup : roomGroup.slice(0, 10)).map(group => (
              <div
                className="relative"
                key={group.book_hash}
                onClick={() =>
                  setSelectedFilter(group.room_data_trans.main_name)
                }
              >
                <div
                  className={cn(
                    'cursor-pointer rounded-full border border-neutral-200 px-6 py-4 text-sm font-medium hover:shadow-xl dark:border-neutral-600 dark:text-neutral-300 md:text-base',
                    selectedFilter === group.room_data_trans.main_name &&
                      'bg-neutral-700 text-neutral-200 dark:bg-neutral-800 dark:text-neutral-100',
                  )}
                >
                  {group.room_data_trans.main_name}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Show More Button */}
        {roomGroup.length > 10 && (
          <Button
            onClick={() => setShowAll(previous => !previous)}
            className="relative h-auto rounded-full border bg-white px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 sm:px-6 sm:text-base"
          >
            {showAll ? 'Hide' : 'View more'}
            <ChevronDown />
          </Button>
        )}
      </div>

      {/* Room List Section */}
      <div className="grid gap-5">
        {isLoading || isFetching ? (
          Array.from({ length: 2 }).map((_, index) => (
            <HotelCardSkeleton displayType="list" key={index} />
          ))
        ) : filteredData.length > 0 ? (
          filteredData.map((room, index) => {
            const selectedMap = hotelData?.map_hotels.find(
              item => item.id === id,
            );
            const roomGroup = hotelData?.map_hotels[0]?.room_groups?.find(
              item =>
                item?.name_struct?.main_name ===
                room?.room_data_trans?.main_room_type,
            );

            return (
              selectedMap && (
                <RoomCard
                  key={index}
                  roomRate={room}
                  roomGroup={roomGroup}
                  selectedMap={selectedMap}
                  searchGlobal={searchGlobal}
                  displayType={index % 2 ? 'right' : 'left'}
                  handleReservation={handleReservation}
                />
              )
            );
          })
        ) : (
          <p className="mb-10 text-xl text-neutral-700">No rooms available.</p>
        )}
      </div>
    </div>
  );
};

'use client';

import { Button } from '@/components/ui/button';
import { HotelCardSkeleton } from '@/features/hotel/cards/hotel-card';
import { cn } from '@/lib/utils';
import { setReserveForm, useGetRoomActiveByHotelIdQuery } from '@/stores/features/stay';
import { IReserveForm, Rate } from '@/stores/features/stay/type';
import { useAppSelector } from '@/stores/hook';
import { addDays, format, formatDate } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import RoomCard from '../card-room-v2';

export const ListRoomSections = ({ id }: { id: string }) => {
   // next api
   const router = useRouter();

   // Redux
   const searchGlobal = useAppSelector((state) => state.globalSlice.searchGlobal);
   const user = useAppSelector((state) => state.userSlice.access_token);
   const hotel = useAppSelector((state) => state.staySlice.reserveForm);
   const dispatch = useDispatch();

   // API Query
   const {
      data: roomsData,
      isLoading,
      isFetching,
   } = useGetRoomActiveByHotelIdQuery({
      checkin: searchGlobal?.dateRange?.startDate || formatDate(new Date(), 'yyyy-MM-dd'),
      checkout:
         searchGlobal?.dateRange?.endDate || formatDate(addDays(new Date(), 1), 'yyyy-MM-dd'),
      currency: searchGlobal?.currency?.code || 'USD',
      language: searchGlobal?.lang?.cca2 || 'en',
      guests: searchGlobal.people || [{ adults: 1, children: [] }],
      id,
      residency: searchGlobal?.lang?.cca2 || 'en',
   });

   // Local States
   const [showAll, setShowAll] = useState(false);
   const [selectedFilter, setSelectedFilter] = useState('All');

   // Logic
   const roomGroup = useMemo(() => {
      if (!roomsData?.hotels[0]?.rates) return [];

      // Deduplicate based on `room_data_trans.main_name`
      const uniqueRooms = roomsData.hotels[0].rates.filter(
         (rate, index, self) =>
            index ===
            self.findIndex((r) => r.room_data_trans.main_name === rate.room_data_trans.main_name),
      );

      return uniqueRooms;
   }, [roomsData?.hotels]);

   // Filtered Data
   const filteredData = useMemo(() => {
      if (selectedFilter === 'All') return roomGroup;
      return roomGroup.filter((rate) => rate.room_data_trans.main_name === selectedFilter);
   }, [selectedFilter, roomGroup]);

   const totalAdults = useMemo(() => {
      let total = 0;
      searchGlobal.people?.forEach((room) => {
         total += room.adults;
      });
      return total;
   }, [searchGlobal.people]);

   const totalChildren = useMemo(() => {
      let total = 0;
      searchGlobal.people?.forEach((room) => {
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
            checkin_date: format(searchGlobal.dateRange.startDate, "yyyy-MM-dd'T'HH:mm:ss"),
            checkout_date: format(searchGlobal.dateRange.endDate, "yyyy-MM-dd'T'HH:mm:ss"),
            num_guests: totalAdults + totalChildren,
            rate: rate,
         };

         dispatch(setReserveForm(dataReserve));

         router.push('/checkout');
      } else {
         router.push(`/auth?redirect=/stay/${id}`);
      }
   };

   return (
      <div>
         {/* Heading Section */}
         <div className="mb-5">
            <h1 className="text-5xl font-semibold mb-3">Our Best Rooms</h1>
            <p className="text-xl font-medium text-neutral-400">
               Book online today and look forward to a relaxing stay with us
            </p>
         </div>

         {/* Filter Section */}
         <div className="flex flex-wrap gap-2 mb-14">
            {/* "All" Filter */}
            <div className="relative">
               <div
                  className={cn(
                     'border border-neutral-200 cursor-pointer hover:shadow-xl rounded-3xl px-6 py-4 text-sm md:text-base font-medium',
                     selectedFilter === 'All' && 'bg-neutral-700 text-neutral-200',
                  )}
                  onClick={() => setSelectedFilter('All')}
               >
                  All
               </div>
               <Button
                  size="icon"
                  className="absolute -top-2 -right-2 rounded-full bg-neutral-900 p-0"
               >
                  {roomGroup.length}
               </Button>
            </div>

            {/* Room-Specific Filters */}
            {(showAll ? roomGroup : roomGroup.slice(0, 10)).map((group) => (
               <div
                  className="relative"
                  key={group.book_hash}
                  onClick={() => setSelectedFilter(group.room_data_trans.main_name)}
               >
                  <div
                     className={cn(
                        'border border-neutral-200 cursor-pointer hover:shadow-xl rounded-full px-6 py-4 text-sm md:text-base font-medium',
                        selectedFilter === group.room_data_trans.main_name &&
                           'bg-neutral-700 text-neutral-200',
                     )}
                  >
                     {group.room_data_trans.main_name}
                  </div>
               </div>
            ))}

            {/* Show More Button */}
            {roomGroup.length > 10 && (
               <Button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="relative h-auto px-4 py-3 sm:px-6 border rounded-full bg-white text-sm sm:text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
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
                  const selectedMap = roomsData?.map_hotels.find((item) => item.id === id);
                  return (
                     selectedMap && (
                        <RoomCard
                           key={index}
                           roomData={room}
                           selectedMap={selectedMap}
                           displayType={index % 2 ? 'right' : 'left'}
                           handleReservation={handleReservation}
                        />
                     )
                  );
               })
            ) : (
               <p className="text-neutral-700 text-xl mb-10">No rooms available.</p>
            )}
         </div>
      </div>
   );
};

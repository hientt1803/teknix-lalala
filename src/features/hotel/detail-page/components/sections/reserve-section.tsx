'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import AmountAction from '@/components/custom/amount-action';
import ButtonLoading from '@/components/custom/button-loading';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { childYears } from '@/configs';
import { useProgressStore } from '@/hooks/use-progress';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/stores/hook';
import {
   setSearchGlobalDateRange,
   setSearchGlobalPeople,
} from '@/stores/features/global/global-slice';
import { useGetRoomActiveByHotelIdQuery } from '@/stores/features/stay/stay-api';
import { isEqualObjects } from '@/utilities/comparator';
import { countTotalDaysInRange } from '@/utilities/datetime';
import { addDays, formatDate, isEqual, toDate } from 'date-fns';
import {
   CalendarIcon,
   EditIcon,
   PlusIcon,
   SearchIcon,
   StarOff,
   TrashIcon,
   UsersIcon,
   XCircleIcon,
} from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useDispatch } from 'react-redux';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';

const ReserveSection = ({
   id,
   scrollIntoView,
}: {
   id: string;
   scrollIntoView?: (params?: any) => void;
}) => {
   const dispatch = useDispatch();
   const searchGlobal = useAppSelector((state) => state.globalSlice.searchGlobal);

   const { done, start } = useProgressStore();
   const { data, isLoading, isFetching } = useGetRoomActiveByHotelIdQuery({
      checkin: searchGlobal?.dateRange?.startDate || formatDate(new Date(), 'yyyy-MM-dd'),
      // checkout:
      //    searchGlobal?.dateRange?.endDate || formatDate(addDays(new Date(), 2), 'yyyy-MM-dd'),
      checkout: formatDate(addDays(new Date(), 2), 'yyyy-MM-dd'),
      currency: 'VND',
      language: 'en',
      guests: searchGlobal.people || [
         {
            adults: 1,
            children: [],
         },
      ],
      id: id,
      residency: 'VN',
   });

   const [openDate, setOpenDate] = useState(false);
   const [openGuest, setOpenGuest] = useState(false);

   const [date, setDate] = useState<DateRange | undefined>();
   const [dateUpdate, setDataUpdate] = useState<DateRange | undefined>();
   const [people, setPeople] = useState<{ adults: number; children: number[] }[]>();
   const [updatePeople, setUpdatePeople] = useState<{ adults: number; children: number[] }[]>();

   const totalAdults = useMemo(() => {
      let total = 0;
      updatePeople?.forEach((room) => {
         total += room.adults;
      });
      return total;
   }, [updatePeople]);

   const totalChildren = useMemo(() => {
      let total = 0;
      updatePeople?.forEach((room) => {
         total += room.children.length;
      });
      return total;
   }, [updatePeople]);

   const totalDay = useMemo(() => {
      let total = countTotalDaysInRange(
         formatDate((dateUpdate && dateUpdate.from) || new Date(), 'yyyy-MM-dd'),
         formatDate((dateUpdate && dateUpdate.to) || new Date(), 'yyyy-MM-dd'),
      );
      return total;
   }, [dateUpdate]);

   const handleSelectedDate = (dates: any) => {
      setDataUpdate(dates);

      if (dates[0] && dates[1]) {
         setOpenDate(false);
      }
   };
   const isChange = useMemo(() => !isEqualObjects(people, updatePeople), [updatePeople, people]);

   const isChangeDate = useMemo(() => {
      // Check if both date arrays are defined
      if (date && dateUpdate) {
         // Return true if any date is null or if they are not equal
         return (
            date.from === null ||
            dateUpdate.from === null ||
            date.to === null ||
            dateUpdate.to === null ||
            !isEqual(date.from || '', dateUpdate.from || '') ||
            !isEqual(date.to || '', dateUpdate.to || '')
         );
      }
      // If either date array is null or undefined, return true (indicating a change)
      return false;
   }, [date, dateUpdate]);

   // Handle changes for adults in a room
   const handleAdultChange = useCallback((value: number, index: number) => {
      setUpdatePeople((prev) =>
         prev?.map((room, i) => (i === index ? { ...room, adults: value } : room)),
      );
   }, []);

   // Handle adding a child to the room
   const handleAddChild = useCallback((value: number, index: number) => {
      setUpdatePeople((prev) =>
         prev?.map((room, i) =>
            i === index
               ? { ...room, children: [...room.children, value] } // Adds a new child with an incremented value
               : room,
         ),
      );
   }, []);

   // Handle remove a child to the room
   const handleRemoveChild = useCallback((childIndex: number, roomIndex: number) => {
      setUpdatePeople((prev) => {
         if (!prev) return prev;

         // Create a deep copy of the people array
         const updatedPeople = [...prev];

         // Ensure the roomIndex is valid
         if (roomIndex < 0 || roomIndex >= updatedPeople.length) return prev;

         // Create a copy of the children array for the specific room
         const updatedChildren = [...updatedPeople[roomIndex].children];

         // Remove the specific child based on childIndex
         updatedChildren.splice(childIndex, 1);

         // Update the room with the new children array
         updatedPeople[roomIndex] = {
            ...updatedPeople[roomIndex],
            children: updatedChildren,
         };

         return updatedPeople;
      });
   }, []);

   // Handle add room
   const handleAddRoom = useCallback(() => {
      const newRoom = {
         adults: 1,
         children: [],
      };
      setUpdatePeople((prev) => (prev ? [...prev, newRoom] : [newRoom]));
   }, []);

   const handleDeleteRoom = useCallback((roomIndex: number) => {
      console.log(roomIndex);

      setUpdatePeople((prev) => {
         if (!prev || prev.length <= 1) return prev; // Prevent deleting the last room

         // Ensure the roomIndex is within bounds
         if (roomIndex < 0 || roomIndex >= prev.length) return prev;

         // Filter out the room at the specified index
         const newPeoples = prev.filter((_, index) => index !== roomIndex);

         return newPeoples;
      });
   }, []);

   useEffect(() => {
      if (isLoading || isFetching) {
         start();
      } else {
         done();
      }
   }, [isLoading, isFetching]);

   const handleSearchChange = useCallback(() => {
      if (isChange || isChangeDate) {
         // Dispatch actions to update the state
         dispatch(setSearchGlobalPeople(updatePeople));
         if (dateUpdate) {
            dispatch(
               setSearchGlobalDateRange({
                  startDate: formatDate(
                     (dateUpdate.from || new Date()).toLocaleDateString(),
                     'yyyy-MM-dd',
                  ),
                  endDate: formatDate(
                     (dateUpdate.to || new Date()).toLocaleDateString(),
                     'yyyy-MM-dd',
                  ),
               }),
            );
         }
      }

      // Use a timeout to simulate a delay for loading state
      setPeople(updatePeople);
      setDate(dateUpdate);
   }, [dispatch, isChange, isChangeDate, updatePeople, dateUpdate]);

   useEffect(() => {
      // First rendering
      if (searchGlobal) {
         setPeople(searchGlobal.people);
         setUpdatePeople(searchGlobal.people);
         setDate({
            from: toDate(searchGlobal.dateRange.startDate),
            to: toDate(searchGlobal.dateRange.endDate),
         });
         setDataUpdate({
            from: toDate(searchGlobal.dateRange.startDate || new Date().toLocaleDateString()),
            to: toDate(searchGlobal.dateRange.endDate || new Date().toLocaleDateString()),
         });
      }
   }, []);

   const onClosePop = () => {
      if (dateUpdate && dateUpdate.from !== null && dateUpdate.to === null) {
         setDataUpdate({
            from: dateUpdate.from,
            to: addDays(dateUpdate.from || new Date(), 1),
         });
      }
   };

   const fields = (
      <div className="space-y-8 w-full">
         {updatePeople?.map((room, index) => {
            // const totalGuest = room.adults + room.children.length;
            return (
               <div key={index} className="flex flex-col gap-5">
                  <div className="flex justify-between">
                     <h3 className="font-semibold">#Room {index + 1}</h3>

                     <TooltipProvider>
                        <Tooltip>
                           <TooltipTrigger>
                              <Button
                                 size={'icon'}
                                 disabled={updatePeople.length <= 1}
                                 onClick={() => handleDeleteRoom(index)}
                                 className="bg-red-600 disabled:bg-slate-400"
                              >
                                 <TrashIcon size="1rem" className="text-white" />
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>Delete room</p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </div>
                  <div className="flex justify-between items-center w-full">
                     <div className="flex flex-col gap-2">
                        <span>Adults</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                           Ages 18 or above
                        </span>
                     </div>

                     <AmountAction
                        value={room.adults}
                        onChange={(value) => handleAdultChange(value, index)}
                     />
                  </div>

                  <div className="flex justify-between items-start">
                     <div className="flex flex-col gap-2">
                        <span>Children</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                           Ages 1 - 17
                        </span>
                     </div>
                     <div className={`grid grid-cols-1 gap-4 w-28`}>
                        {room.children.map((child, childrenIndex) => (
                           <div
                              className="border border-slate-200 dark:border-slate-800 text-center p-2 rounded-lg flex items-center justify-between"
                              key={childrenIndex}
                           >
                              <div className="w-4/5">{child} years</div>

                              <div className="w-1/5 ">
                                 <XCircleIcon
                                    className="cursor-pointer w-5 h-5"
                                    strokeWidth={1.5}
                                    onClick={() => handleRemoveChild(childrenIndex, index)}
                                 />
                              </div>
                           </div>
                        ))}
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button
                                 variant="outline"
                                 disabled={room.children.length >= 4}
                                 className={`${room.children.length >= 4 && 'hidden'}`}
                              >
                                 {room.children.length >= 1 ? <PlusIcon /> : 'Add child'}
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent
                              className={cn('max-h-72', {
                                 hidden: room.children.length >= 4,
                              })}
                           >
                              <ScrollArea className="h-72">
                                 <DropdownMenuGroup>
                                    {childYears.map((year) => (
                                       <DropdownMenuItem
                                          onClick={() => {
                                             handleAddChild(year, index);
                                          }}
                                          key={year}
                                       >
                                          {year} years
                                       </DropdownMenuItem>
                                    ))}
                                 </DropdownMenuGroup>
                              </ScrollArea>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  </div>
                  <div className="w-full border-b border-slate-200 dark:border-slate-600" />
               </div>
            );
         })}
      </div>
   );

   if (isLoading) return <ReserveCardSkeleton />;
   return (
      <div className="border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl p-4">
         <div className="flex justify-between">
            <span className="text-3xl font-semibold">
               {formatCurrencyWithCodeAsSuffix(data?.hotels[0]?.rates[0]?.daily_prices[0] || 0)}
               <span className="ml-1 text-base font-normal text-slate-500 dark:text-slate-400">
                  /night
               </span>
            </span>
            <div className="flex items-center space-x-1 text-sm">
               <div className="pb-[2px]">
                  <StarOff className="w-5 h-5 text-yellow-500" />
               </div>
               <span className="font-medium">{data?.map_hotels[0]?.star_rating || 0}</span>
               <span className="text-slate-500 dark:text-slate-400">(112)</span>
            </div>
         </div>
         <form className="flex flex-col border border-slate-100 dark:border-slate-700 rounded-3xl my-5">
            <Popover
               open={openDate}
               onOpenChange={setOpenDate}
               // position="bottom-end"
               // onClose={onClosePop}
            >
               <PopoverTrigger>
                  <div
                     className="z-10 relative flex flex-1"
                     onClick={() => {
                        setOpenGuest(false);
                        setOpenDate((o) => !o);
                     }}
                  >
                     <div
                        className={cn(
                           'flex-1 z-10 flex relative p-4 xl:p-6 items-center cursor-pointer space-x-3 focus:outline-none',
                           {
                              'rounded-t-3xl rounded-b-none': openDate,
                           },
                        )}
                     >
                        <div className="text-slate-300 dark:text-slate-400">
                           <CalendarIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-grow text-left">
                           <span className="block xl:text-lg font-semibold">
                              {`${formatDate(
                                 (dateUpdate && dateUpdate.from) || new Date(),
                                 'MMM dd',
                              )} - ${formatDate(
                                 (dateUpdate && dateUpdate.to) || new Date(),
                                 'MMM dd',
                              )}` || 'Check in - out'}
                           </span>
                           <span className="block mt-1 text-sm text-slate-400 leading-none font-light">
                              Check in - Check out
                           </span>
                        </div>
                     </div>
                     <div className="absolute top-4 right-4 text-slate-400">
                        <EditIcon />
                     </div>
                     {/* {openDate && (
                                <IconCircleXFilled
                                    // onClick={() => setLocationSearch("")}
                                    className="absolute z-10 w-5 h-5 lg:w-6 lg:h-6 text-sm text-neutral-300 rounded-full flex items-center justify-center right-1 lg:right-3 top-1/2 transform -translate-y-1/2"
                                />
                            )} */}
                  </div>
               </PopoverTrigger>

               <PopoverContent className="w-full overflow-hidden rounded-3xl shadow-lg ring-1 ring-neutral-100 ring-opacity-5 bg-white p-8 hidden lg:block">
                  <div className="">
                     <Calendar
                        mode="range"
                        numberOfMonths={2}
                        selected={dateUpdate}
                        onSelect={setDataUpdate}
                        fromDate={new Date()}
                     />
                  </div>
               </PopoverContent>
            </Popover>
            <div className="w-full border-b border-slate-200 dark:border-slate-700 " />
            <Popover open={openGuest} onOpenChange={setOpenGuest}>
               <PopoverTrigger>
                  <div
                     className="flex relative flex-1"
                     onClick={() => {
                        setOpenDate(false);
                        setOpenGuest((o) => !o);
                     }}
                  >
                     <div
                        className={cn('flex-1 z-10 flex items-center focus:outline-none', {
                           'rounded-b-3xl rounded-t-none': openGuest,
                        })}
                     >
                        <div className="relative z-10 flex-1 flex text-left items-center p-4 xl:p-6 cursor-pointer space-x-3 focus:outline-none">
                           <div className="text-slate-300 dark:text-slate-400">
                              <UsersIcon className="w-6 h-6" />
                           </div>
                           <div className="flex-grow">
                              <span className="block xl:text-lg font-semibold">
                                 {totalAdults + totalChildren > 0
                                    ? totalAdults + totalChildren + ' Guest'
                                    : 'Guest'}
                              </span>
                              <span className="block mt-1 text-sm text-slate-400 leading-none font-light">
                                 {totalAdults + totalChildren > 0 ? 'Guests' : 'Add guest'}
                              </span>
                           </div>
                        </div>
                     </div>
                     <div className="absolute top-4 right-4 text-slate-400">
                        <EditIcon />
                     </div>
                     {/* {openGuest && (
                                <IconCircleXFilled
                                    // onClick={() => setLocationSearch("")}
                                    className="absolute z-10 w-5 h-5 lg:w-6 lg:h-6 text-sm text-neutral-300 rounded-full flex items-center justify-center right-1 lg:right-3 top-1/2 transform -translate-y-1/2"
                                />
                            )} */}
                  </div>
               </PopoverTrigger>

               <PopoverContent className="w-full  overflow-hidden rounded-3xl shadow-lg ring-1 ring-neutral-100 ring-opacity-5 bg-white p-8 hidden lg:block">
                  <div className="space-y-8">
                     {fields}
                     <div className="">
                        <Button variant="ghost" onClick={handleAddRoom}>
                           <PlusIcon className="mr-2 w-5 h-5" /> Add a room
                        </Button>
                     </div>
                  </div>
               </PopoverContent>
            </Popover>
         </form>
         {!data?.hotels[0]?.rates || data.hotels[0].rates.length <= 0 ? (
            <h3 className="text-lg text-center font-semibold text-red-900">
               No room availiable
               <br />
               <span className="text-sm font-normal text-slate-500 dark:text-slate-50">
                  Switch your dates or guest count to continue with room availability.
               </span>
            </h3>
         ) : (
            <>
               <div className="flex flex-col space-y-4">
                  <div className="flex justify-between text-slate-600 dark:text-slate-50">
                     <span>
                        {formatCurrencyWithCodeAsSuffix(data?.hotels[0]?.rates[0].daily_prices[0] || 0)}
                        <span className="mx-2">x</span>
                        {totalDay} night
                     </span>
                     <span>
                        {formatCurrencyWithCodeAsSuffix(
                           (Number(data?.hotels[0]?.rates[0].daily_prices[0]) || 1) * totalDay,
                        )}
                     </span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-50">
                     <span>Service charge</span>
                     <span>{formatCurrencyWithCodeAsSuffix(0)}</span>
                  </div>
                  <div className="border-b border-slate-200 dark:border-slate-700"></div>
                  <div className="flex justify-between font-semibold">
                     <span>Total</span>
                     <span>
                        {formatCurrencyWithCodeAsSuffix(
                           (Number(data?.hotels[0]?.rates[0].daily_prices[0]) || 0) * totalDay,
                        )}
                     </span>
                  </div>
               </div>
            </>
         )}
         <ButtonLoading
            // component={Link}
            loading={isLoading || isFetching}
            // disabled={!data?.hotels || data.hotels.length <= 0}
            onClick={() => {
               if (isChange || isChangeDate) {
                  handleSearchChange(); // Call the function to handle search changes
               }
               scrollIntoView && scrollIntoView({ alignment: 'start' }); // Always scroll into view
            }}
            color={isChange || isChangeDate ? 'red.6' : ''}
            // href="/checkout"
            className={cn(
               'w-full mt-8 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600',
               {
                  'bg-red-800 hover:bg-red-900': isChange || isChangeDate,
               },
            )}
         >
            {isChange || isChangeDate ? (
               <>
                  <SearchIcon className="w-5 h-5 mr-2" /> Search
               </>
            ) : (
               'Reserve'
            )}
         </ButtonLoading>
      </div>
   );
};

export default ReserveSection;

const ReserveCardSkeleton = () => {
   return <Skeleton className="w-full h-[500px] rounded-3xl" />;
};

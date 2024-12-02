'use client';

import { Button } from '@/components/ui/button';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { setTriggerRoomSearch, setTriggerSearch } from '@/stores/features/stay';
import { useAppSelector } from '@/stores/hook';
import { convertStringToDate, formatDateToYearMonthDay, formatDateUTC } from '@/utilities/datetime';
import { setCookie } from 'cookies-next';
import { Search, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InputSearchDateRangeSkeleton } from '../input/dateRange/input-search-date-range-skeleton';
import { InputSearchGuestSkeleton } from '../input/guest/input-search-guest-skeleton';
import { InputSearchLocationSkeleton } from '../input/location/inputSearchLocationSkeleton';

const InputSearchLocation = dynamic(
   () => import('../input/location/inputSearchLocation').then((mod) => mod.InputSearchLocation),
   {
      loading: () => <InputSearchLocationSkeleton />,
      ssr: false,
   },
);
const InputSearchDateRange = dynamic(
   () => import('../input/dateRange/inputSearchDateRange').then((mod) => mod.InputSearchDateRange),
   {
      loading: () => <InputSearchDateRangeSkeleton />,
   },
);
const InputSearchGuest = dynamic(
   () => import('../input/guest/inputSearchGuest').then((mod) => mod.InputSearchGuest),
   {
      loading: () => <InputSearchGuestSkeleton />,
   },
);

interface SearchGroupType {
   typeProp?: 'hotel' | 'flight';
   className?: string;
   tabWrapperClassname?: string;
   isFromHotelDetail?: boolean;
   showTabs?: boolean;
   showBorder?: boolean;
}

export const SearchGroup = ({
   typeProp = 'hotel',
   className,
   tabWrapperClassname,
   isFromHotelDetail = false,
   showTabs = false,
   showBorder = false,
}: SearchGroupType) => {
   // Next api
   const router = useRouter();
   const pathname = usePathname();

   // Redux
   const globalState = useAppSelector((state) => state.globalSlice.searchGlobal);
   const hotelSearchLoadingState = useAppSelector((state) => state.staySlice.isTriggerGlobal);
   const roomSearchLoading = useAppSelector((state) => state.staySlice.isTriggerRoomSearch);
   const dispatch = useDispatch();

   // State

   // Logic
   useEffect(() => {
      dispatch(setTriggerSearch(false));
      dispatch(setTriggerRoomSearch(false));
   }, []);

   const handleSearchDirection = () => {
      // convert data
      const startDate = formatDateToYearMonthDay(
         convertStringToDate(globalState.dateRange.startDate),
      );
      const endDate = formatDateToYearMonthDay(convertStringToDate(globalState.dateRange.endDate));

      let adults = 0;
      globalState.people
         ? globalState.people.forEach((item) => {
              adults += item.adults;
           })
         : [];

      // add data to params
      const params = new URLSearchParams({
         checkin: startDate,
         checkout: endDate,
         language: 'en',
         adults: adults.toString(),
         currency: 'VND',
      });

      let childrens = 0;
      globalState.people.map((item) => {
         item.children.forEach((child, index) => {
            childrens++;
            params.append(`childrens[${index}]`, String(child));
         });
      });

      params.append('latitude', String(globalState?.location?.lat) || '10.0364634');
      params.append('longtitude', String(globalState?.location?.lon) || '105.7875821');
      params.append('region', String(globalState?.location.name) || '');

      if (isFromHotelDetail) {
         dispatch(setTriggerRoomSearch(true));
      } else {
         if (globalState.location.searchType === 'hotel') {
            params.append('id', globalState.location.hotelId!);
            router.push(`/hotel/${globalState.location.hotelId}?${params.toString()}`);
         } else {
            if (pathname == '/hotel') {
               dispatch(setTriggerSearch(true));

               const searchUrl = new URLSearchParams(window.location.search);
               if (searchUrl.toString().includes('msg=notfound')) {
                  window.history.pushState({}, '', `/hotel?${params.toString()}`);
               }

               // set cookie for Meta Data
               setCookie('locationSearch', globalState.location.name);
               setCookie(
                  'dateRange',
                  `${formatDateUTC(convertStringToDate(globalState.dateRange.startDate))} - ${formatDateUTC(convertStringToDate(globalState.dateRange.endDate))}`,
               );

               // direct to new route
               window.history.pushState({}, '', `/hotel?${params.toString()}`);
               // router.replace(`/hotel?${params.toString()}`, {
               //   scroll: false,
               // });
            } else {
               // trigger search
               dispatch(setTriggerSearch(true));

               // set cookie for Meta Data
               setCookie('locationSearch', globalState.location.name);
               setCookie(
                  'dateRange',
                  `${formatDateUTC(convertStringToDate(globalState.dateRange.startDate))} - ${formatDateUTC(convertStringToDate(globalState.dateRange.endDate))}`,
               );

               // direct to new route
               router.push(`/hotel?${params.toString()}`);
            }
         }
      }
   };

   const TabContent = ({ type = typeProp }: { type: 'hotel' | 'flight' }) => (
      <div
         className={cn(
            showBorder ? 'border border-neutral-200 dark:border-neutral-700 p-4 rounded-xl' : '',
         )}
      >
         {/* Hotels */}
         {type == 'hotel' && (
            <div className="w-full flex justify-between items-center gap-x-3 gap-y-5 flex-wrap">
               {/* Location */}
               <div className="flex-1">
                  <InputSearchLocation />
               </div>

               <div className="w-full h-[1px] md:w-[1px] md:h-12 bg-neutral-200 dark:bg-neutral-700 mx-0 md:mx-5" />

               {/* Daterange */}
               <div className="flex-1">
                  <InputSearchDateRange />
               </div>

               <div className="w-full h-[1px] md:w-[1px] md:h-12 bg-neutral-200 dark:bg-neutral-700 mx-0 md:mx-5" />

               {/* Guest */}
               <div className="flex-1 mr-6">
                  <InputSearchGuest />
               </div>

               {/* Button */}
               <Button
                  variant="default"
                  className="flex-1 min-w-[9.375rem] w-fit xl:max-w-[9.375rem] py-7 px-7 rounded-full bg-black dark:bg-neutral-100 text-white dark:text-neutral-800 text-lg hover:bg-neutral-800 hover:text-white font-normal"
                  onClick={() => handleSearchDirection()}
                  disabled={hotelSearchLoadingState && pathname == '/'}
               >
                  {hotelSearchLoadingState || roomSearchLoading ? (
                     <span className="h-4 w-4 animate-spin rounded-full border-4 border-gray-200 border-t-neutral-800" />
                  ) : (
                     <>
                        <Search className="w-5 h-5 text-neutral-200 dark:text-neutral-800" />
                        Search
                     </>
                  )}
               </Button>
            </div>
         )}

         {/* Fligh */}
         {type == 'flight' && (
            <>
               {/* HEADER */}
               <div>
                  <div className="flex gap-2 items-center flex-wrap mb-2">
                     <Button
                        variant="default"
                        className="bg-black text-white text-sm px-4 py-1 rounded-2xl"
                     >
                        Round-trip
                     </Button>
                     <Button
                        variant="default"
                        className="bg-black text-white text-sm px-4 py-1 rounded-2xl"
                     >
                        One-way
                     </Button>

                     <div className="w-[1px] h-12 bg-neutral-200 mx-6 " />

                     <Select>
                        <SelectTrigger className="w-fit rounded-2xl">
                           <SelectValue
                              defaultValue={'business'}
                              placeholder={'business'}
                              defaultChecked
                              className="rounded-2xl"
                           />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="economy">Economy</SelectItem>
                           <SelectItem value="business">Business</SelectItem>
                           <SelectItem value="miltiple">Miltiple</SelectItem>
                        </SelectContent>
                     </Select>

                     <Select>
                        <SelectTrigger className="w-fit rounded-2xl">
                           <SelectValue
                              defaultValue={'2 Guest'}
                              placeholder={'2 Guest'}
                              defaultChecked
                              className="rounded-2xl"
                           />
                        </SelectTrigger>
                        <SelectContent className="min-w-[21.875rem] p-4 rounded-lg">
                           <div className="flex justify-between items-center gap-3 mb-4">
                              <div className="flex flex-col items-start justify-start gap-0">
                                 <span className="font-medium text-md">Adults</span>
                                 <span className="font-medium text-sm text-neutral-500">
                                    Ages 13 or above
                                 </span>
                              </div>

                              {/* <GroupInputQuantity quantity={1} /> */}
                           </div>
                           <div className="flex justify-between items-center gap-3 mb-4">
                              <div className="flex flex-col items-start justify-start gap-0">
                                 <span className="font-medium text-md">Children</span>
                                 <span className="font-medium text-sm text-neutral-500">
                                    Ages 2 - 12
                                 </span>
                              </div>

                              {/* <GroupInputQuantity quantity={1} /> */}
                           </div>
                           <div className="flex justify-between items-center gap-3">
                              <div className="flex flex-col items-start justify-start gap-0">
                                 <span className="font-medium text-md">Infants</span>
                                 <span className="font-medium text-sm text-neutral-500">
                                    Ages 0-2
                                 </span>
                              </div>

                              {/* <GroupInputQuantity quantity={1} /> */}
                           </div>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="w-full h-[1px] bg-neutral-200 mt-2" />
               </div>

               {/* MAIN CONTENT */}
               <div className="flex justify-between items-center gap-x-3 gap-y-5 flex-wrap mt-2">
                  {/* Location */}
                  <div className="flex-[2]">
                     <InputSearchLocation title="Flying from" />
                  </div>

                  <div className="w-full h-[1px] md:w-[1px] md:h-12 bg-neutral-200 mx-0 md:mx-5" />

                  {/* Location */}
                  <div className="flex-[2]">
                     <InputSearchLocation title="Flying to" />
                  </div>

                  <div className="w-full h-[1px] md:w-[1px] md:h-12 bg-neutral-200 mx-0 md:mx-5" />

                  {/* Daterange */}
                  <div className="flex-grow flex-[2]">
                     <InputSearchDateRange title="Pick up Date" />
                  </div>

                  {/* Button */}
                  <Button
                     variant="default"
                     className="flex-1 min-w-[11.25rem] w-fit xl:max-w-[11.25rem] rounded-lg bg-black dark:bg-neutral-100 text-white dark:text-neutral-800 text-xl hover:bg-neutral-800 hover:text-white font-normal"
                  >
                     <Search className="w-5 h-5 text-neutral-200 dark:text-neutral-800" />
                     Search
                  </Button>
               </div>
            </>
         )}
      </div>
   );

   return (
      <div className={cn('w-full relative z-30', className)}>
         <div
            className={cn(
               'w-full bg-white dark:bg-neutral-800 shadow-md rounded-xl p-7',
               tabWrapperClassname,
            )}
         >
            <Tabs value={typeProp} className="w-full">
               {showTabs && (
                  <TabsList className="w-full h-full flex justify-between items-center flex-wrap md:flex-nowrap bg-transparent">
                     <div className="w-full">
                        <TabsTrigger
                           value="hotel"
                           className="bg-white dark:bg-neutral-900 dark:text-neutral-100 text-black px-5 py-2 text-md font-normal rounded-[1.875rem] data-[state=active]:bg-black dark:data-[state=active]:bg-neutral-100 data-[state=active]:text-white dark:data-[state=active]:text-black data-[state=active]:shadow-md"
                        >
                           Hotels
                        </TabsTrigger>
                        <TabsTrigger
                           value="tour"
                           className="bg-white dark:bg-neutral-900 dark:text-neutral-100 text-black px-5 py-2 text-md font-normal rounded-[1.875rem] data-[state=active]:bg-black dark:data-[state=active]:bg-neutral-100 data-[state=active]:text-white dark:data-[state=active]:text-black data-[state=active]:shadow-md"
                        >
                           Tour
                        </TabsTrigger>
                        <TabsTrigger
                           value="flight"
                           className="bg-white dark:bg-neutral-900 dark:text-neutral-100 text-black px-5 py-2 text-md font-normal rounded-[1.875rem] data-[state=active]:bg-black dark:data-[state=active]:bg-neutral-100 data-[state=active]:text-white dark:data-[state=active]:text-black data-[state=active]:shadow-md"
                        >
                           Flight
                        </TabsTrigger>
                     </div>

                     <div className="font-normal text-neutral-500 dark:text-neutral-300 flex items-center gap-1 flex-nowrap mt-3 md:mt-0">
                        <User className="w-4 h-4" />
                        <span className="text-md text-nowrap">Need some help?</span>
                     </div>
                  </TabsList>
               )}

               <TabsContent value="hotel" className="w-full">
                  <TabContent type="hotel" />
               </TabsContent>
               <TabsContent value="tour" className="w-full">
                  <TabContent type="hotel" />
               </TabsContent>
               <TabsContent value="flight" className="w-full">
                  <TabContent type="flight" />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
};

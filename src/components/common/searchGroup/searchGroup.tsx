import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, User } from 'lucide-react';
import { MainButton } from '../button/mainButton';
import { InputSearchDateRange } from '../input/dateRange/inputSearchDateRange';
import { InputSearchGuest } from '../input/guest/inputSearchGuest';
import { GroupPeopleInput } from '../input/guest/selectGuestInput';
import { InputSearchLocation } from '../input/location/inputSearchLocation';

export const SearchGroup = () => {
   const TabContent = ({ type }: { type: 'hotel' | 'fligh' }) => (
      <div className="border border-neutral-200 p-4 rounded-xl">
         {/* Hotels */}
         {type == 'hotel' && (
            <div className="flex justify-between items-center gap-2">
               {/* Location */}
               <div className="flex-[2]">
                  <InputSearchLocation />
               </div>

               <div className="w-[1px] h-12 bg-neutral-200 mx-10 " />

               {/* Daterange */}
               <div className="flex-[2]">
                  <InputSearchDateRange />
               </div>

               <div className="w-[1px] h-12 bg-neutral-200 mx-10 " />

               {/* Guest */}
               <div className="flex-[2] mr-6">
                  <InputSearchGuest />
               </div>

               {/* Button */}
               <MainButton
                  variant="default"
                  className="flex-1 bg-black dark:bg-neutral-100 text-white dark:text-neutral-800 text-xl hover:bg-neutral-800 hover:text-white"
                  leftIcon={<Search className="w-6 h-6 text-white dark:text-neutral-800 mr-2" />}
               >
                  Search
               </MainButton>
            </div>
         )}

         {/* Fligh */}
         {type == 'fligh' && (
            <>
               <div className="flex gap-2 items-center mb-2">
                  <MainButton
                     variant="default"
                     className="bg-black text-white text-sm px-4 py-1 rounded-2xl"
                  >
                     Round-trip
                  </MainButton>
                  <MainButton
                     variant="default"
                     className="bg-black text-white text-sm px-4 py-1 rounded-2xl"
                  >
                     One-way
                  </MainButton>

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
                     <SelectContent>
                        <GroupPeopleInput />
                     </SelectContent>
                  </Select>
               </div>

               <div className="w-full h-[1px] bg-neutral-200 mt-2" />

               <div className="flex justify-between items-center gap-2 mt-3">
                  {/* Location */}
                  <div className="flex-[2]">
                     <InputSearchLocation title="Flying from" />
                  </div>

                  <div className="w-[1px] h-12 bg-neutral-200 mx-10 " />

                  {/* Location */}
                  <div className="flex-[2]">
                     <InputSearchLocation title="Flying to" />
                  </div>

                  <div className="w-[1px] h-12 bg-neutral-200 mx-10 " />

                  {/* Daterange */}
                  <div className="flex-[2]">
                     <InputSearchDateRange title="Pick up Date" />
                  </div>

                  {/* Button */}
                  <MainButton
                     variant="default"
                     className="flex-1 bg-black dark:bg-neutral-100 text-white dark:text-neutral-800 text-xl hover:bg-neutral-800 hover:text-white"
                     leftIcon={<Search className="w-6 h-6 text-white dark:text-neutral-800 mr-2" />}
                  >
                     Search
                  </MainButton>
               </div>
            </>
         )}
      </div>
   );

   return (
      <div className="relative -top-36 pb-16 z-30 w-full">
         <div className="bg-white dark:bg-neutral-900 shadow-md rounded-xl p-7">
            <Tabs defaultValue="hotel" className='w-full'>
               <TabsList className="w-full h-full flex justify-betweenitems-center bg-transparent">
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
                     {/* <TabsTrigger
                     value="rentals"
                     className="bg-white dark:bg-neutral-900 dark:text-neutral-100 text-black px-5 py-2 text-md font-normal rounded-[1.875rem] data-[state=active]:bg-black dark:data-[state=active]:bg-neutral-100 data-[state=active]:text-white dark:data-[state=active]:text-black data-[state=active]:shadow-md"
                  >
                     Rentals
                  </TabsTrigger> */}
                  </div>

                  <div className="font-normal text-neutral-500 flex items-center gap-1 flex-nowrap">
                     <User className="w-4 h-4" />
                     <span className="text-md text-nowrap">Need some help?</span>
                  </div>
               </TabsList>
               <TabsContent value="hotel">
                  <TabContent type="hotel" />
               </TabsContent>
               <TabsContent value="tour">
                  <TabContent type="hotel" />
               </TabsContent>
               <TabsContent value="flight">
                  <TabContent type="fligh" />
               </TabsContent>
               {/* <TabsContent value="rentals">
               <TabContent />
            </TabsContent> */}
            </Tabs>
         </div>
      </div>
   );
};

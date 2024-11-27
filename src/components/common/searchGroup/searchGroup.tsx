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
import { Search, User } from 'lucide-react';
import dynamic from 'next/dynamic';

const InputSearchLocation = dynamic(() =>
   import('../input/location/inputSearchLocation').then((mod) => mod.InputSearchLocation),
);
const InputSearchDateRange = dynamic(() =>
   import('../input/dateRange/inputSearchDateRange').then((mod) => mod.InputSearchDateRange),
);
const InputSearchGuest = dynamic(() =>
   import('../input/guest/inputSearchGuest').then((mod) => mod.InputSearchGuest),
);
const GroupInputQuantity = dynamic(() =>
   import('@/components/custom/input/group-input-quantity').then((mod) => mod.GroupInputQuantity),
);

interface SearchGroupType {
   typeProp?: 'hotel' | 'flight';
   className?: string;
}

export const SearchGroup = ({ typeProp = 'hotel', className }: SearchGroupType) => {
   const TabContent = ({ type = typeProp }: { type: 'hotel' | 'flight' }) => (
      <div className="border border-neutral-200 p-4 rounded-xl">
         {/* Hotels */}
         {type == 'hotel' && (
            <div className="flex justify-between items-center gap-x-3 gap-y-5 flex-wrap">
               {/* Location */}
               <div className="flex-1">
                  <InputSearchLocation />
               </div>

               <div className="w-full h-[1px] md:w-[1px] md:h-12 bg-neutral-200 mx-0 md:mx-5" />

               {/* Daterange */}
               <div className="flex-1">
                  <InputSearchDateRange />
               </div>

               <div className="w-full h-[1px] md:w-[1px] md:h-12 bg-neutral-200 mx-0 md:mx-5" />

               {/* Guest */}
               <div className="flex-1 mr-6">
                  <InputSearchGuest />
               </div>

               {/* Button */}
               <Button
                  variant="default"
                  className="flex-1 min-w-[12.5rem] w-full bg-black dark:bg-neutral-100 text-white dark:text-neutral-800 text-xl hover:bg-neutral-800 hover:text-white font-normal"
               >
                  <Search className="w-6 h-6 text-neutral-200 dark:text-neutral-800 mr-2" />
                  Search
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

                              <GroupInputQuantity quantity={1} />
                           </div>
                           <div className="flex justify-between items-center gap-3 mb-4">
                              <div className="flex flex-col items-start justify-start gap-0">
                                 <span className="font-medium text-md">Children</span>
                                 <span className="font-medium text-sm text-neutral-500">
                                    Ages 2 - 12
                                 </span>
                              </div>

                              <GroupInputQuantity quantity={1} />
                           </div>
                           <div className="flex justify-between items-center gap-3">
                              <div className="flex flex-col items-start justify-start gap-0">
                                 <span className="font-medium text-md">Infants</span>
                                 <span className="font-medium text-sm text-neutral-500">
                                    Ages 0-2
                                 </span>
                              </div>

                              <GroupInputQuantity quantity={1} />
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
                     className="flex-1 min-w-[12.5rem] w-full bg-black dark:bg-neutral-100 text-white dark:text-neutral-800 text-xl hover:bg-neutral-800 hover:text-white font-normal"
                  >
                     <Search className="w-6 h-6 text-neutral-200 dark:text-neutral-800 mr-2" />
                     Search
                  </Button>
               </div>
            </>
         )}
      </div>
   );

   return (
      <div className={cn('relative  z-30 w-full', className)}>
         <div className="bg-white dark:bg-neutral-900 shadow-md rounded-xl p-7">
            <Tabs value={typeProp} className="w-full">
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

                  <div className="font-normal text-neutral-500 flex items-center gap-1 flex-nowrap mt-3 md:mt-0">
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
                  <TabContent type="flight" />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
};

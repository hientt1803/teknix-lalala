import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Building2, ChevronDown, MapPin } from 'lucide-react';

export const InputSearchLocation = ({ title = 'Location' }: { title?: string }) => {
   const NoResult = () => {
      return (
         <div className="w-full max-w-lg mx-auto my-10">
            <div className="flex flex-col gap-5">
               <p className="text-sm font-medium text-center text-neutral-500">
                  Sorry, we cannot find this place {`:(`}
               </p>
               <p className="text-sm font-bold text-black cursor-pointer mx-auto">Reset</p>
            </div>
         </div>
      );
   };

   const SearchResult = () => {
      return (
         <>
            {/* Regions */}
            <div className="">
               <p className="text-sm font-normal text-neutral-500 mx-6 mt-3 mb-2">Regions</p>

               {Array(3)
                  .fill(1)
                  .map((_, index) => (
                     <DestinationItem key={index} />
                  ))}
            </div>

            {/* Hotel */}
            <div className="mt-5">
               <p className="text-sm font-normal text-neutral-500 mx-6 mt-3 mb-2">Hotels</p>

               {Array(3)
                  .fill(1)
                  .map((_, index) => (
                     <DestinationItem key={index} />
                  ))}
            </div>
         </>
      );
   };

   return (
      <div className="flex flex-col justify-start items-start gap-2">
         <div className="text-neutral-600 dark:text-neutral-300 text-sm font-medium">{title}</div>

         <Popover>
            <PopoverTrigger>
               <div className="flex justify-start items-center gap-1">
                  <MapPin className="text-neutral-400 w-5 h-5" />
                  <Input
                     type="text"
                     placeholder="New York, USA"
                     className="placeholder:text-neutral-800 dark:placeholder:dark:text-neutral-50 placeholder:font-medium min-w-[7.5rem] w-full shadow-none border-none outline-none focus:border-none focus:outline-none"
                  />
                  {/* <ChevronDown className="text-black w-5 h-5" /> */}
               </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 min-w-[17.5rem] w-fit">
               <SearchResult />
            </PopoverContent>
         </Popover>
      </div>
   );
};

const DestinationItem = () => {
   return (
      <div className="transition hover:bg-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-70 hover:text-black dark:hover:text-neutral-800 py-1.5 cursor-pointer">
         <div className="flex flex-col gap-1.5 px-6">
            <div className="w-full max-w-lg mx-auto">
               <div className="flex items-center gap-1.5">
                  <div>
                     <Building2 className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                     <p className="text-sm font-normal line-clamp-2">California, USA</p>
                     <p className="text-xs font-normal text-gray-500 line-clamp-1">
                        21, street, californias, USA
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

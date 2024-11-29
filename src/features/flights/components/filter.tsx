'use client';
import Image from '@/components/common/images/image';
import { SliderRange } from '@/components/custom/sliders/slider-range';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Flight_Filters } from '@/slices/FlightListing/mock';
import React, { useState } from 'react';

const FilterFlighting = () => {
   const { popular, price, onwardstop, layover, returnstops, airlines } = Flight_Filters;
   const [priceRange, setPriceRange] = useState([100, 500]);

   return (
      <div className="grid grid-cols-1 divide-y divide-neutral-200">
         {/* Popular Filter */}
         <div className="px-5 py-7">
            <div className="text-lg font-[600] mb-3">Popular Filter</div>
            <div className="flex flex-col gap-3">
               {popular.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                        <Checkbox id={item.value} className="bg-neutral-200 border-neutral-200" />
                        <label
                           htmlFor={item.value}
                           className="text-sm text-neutral-500 font-normal leading-none cursor-pointer"
                        >
                           {item.name}
                        </label>
                     </div>
                     <span className="text-xs text-neutral-500">({item.total})</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Price Filter */}
         <div className="px-5 py-7">
            <div className="text-lg font-[600] mb-2">Price</div>
            <div className="flex flex-col gap-3">
               <div className="flex justify-between">
                  <span className="text-sm text-neutral-500">${priceRange[0]}</span>
                  <span className="text-sm text-neutral-500">${priceRange[1]}</span>
               </div>
               <SliderRange
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={price[0]}
                  max={price[1]}
               />
            </div>
         </div>

         {/* Onward Stops */}
         <div className="px-5 py-7">
            <div className="text-lg font-[600] mb-2">Onward Stops</div>
            <div className="flex flex-wrap gap-2">
               {onwardstop.map((item, index) => (
                  <div
                     key={index}
                     className={cn(
                        'px-4 py-1 bg-neutral-100 cursor-pointer rounded-md hover:shadow',
                        // {
                        //    'border border-primary': onwardstopItems.includes(item.value),
                        // },
                     )}
                  >
                     <Checkbox id={item.value} className="peer sr-only" />
                     <Label
                        htmlFor={item.value}
                        className="text-sm text-neutral-500 font-normal leading-none"
                     >
                        {item.name}
                     </Label>
                  </div>
               ))}
            </div>
         </div>

         {/* Return Stop */}
         <div className="px-5 py-7">
            <div className="text-lg font-[600] mb-2">Return Stops</div>
            <div className="flex flex-wrap gap-2">
               {returnstops.map((item, index) => (
                  <div
                     key={index}
                     className={cn(
                        'px-4 py-1 bg-neutral-100 cursor-pointer rounded-md hover:shadow',
                        // {
                        //    'border border-primary': onwardstopItems.includes(item.value),
                        // },
                     )}
                  >
                     <Checkbox id={item.value} className="peer sr-only" />
                     <Label
                        htmlFor={item.value}
                        className="text-sm text-neutral-500 font-normal leading-none"
                     >
                        {item.name}
                     </Label>
                  </div>
               ))}
            </div>
         </div>

         {/* Preferrd Airlint */}
         <div className="px-5 py-7">
            <div className="text-lg font-[600] mb-3">Preferred Airline</div>
            <div className="flex flex-col gap-3">
               {airlines.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                        <Checkbox id={item.value} className="bg-neutral-200 border-neutral-200" />
                        <Label
                           htmlFor={item.value}
                           className="text-sm text-neutral-500 font-normal leading-none cursor-pointer flex items-center gap-2"
                        >
                           <Image
                              src={item.logo}
                              className="w-4 h-4"
                              classNameImage="object-contain"
                           />
                           {item.name}
                        </Label>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Layover Airlint */}
         <div className="px-5 py-7">
            <div className="text-lg font-[600] mb-3">Playover Airline</div>
            <div className="flex flex-col gap-3">
               {layover.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                        <Checkbox id={item.value} className="bg-neutral-200 border-neutral-200" />
                        <Label
                           htmlFor={item.value}
                           className="text-sm text-neutral-500 font-normal leading-none cursor-pointer"
                        >
                           {item.name}
                        </Label>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default FilterFlighting;

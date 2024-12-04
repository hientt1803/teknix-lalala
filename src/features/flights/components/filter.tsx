'use client';
import React, { useState } from 'react';

import Image from '@/components/common/images/image';
import { SliderRange } from '@/components/custom/sliders/slider-range';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Flight_Filters } from '@/slices/FlightListing/mock';

const FilterFlighting = () => {
  const { popular, price, onwardstop, layover, returnstops, airlines } =
    Flight_Filters;
  const [priceRange, setPriceRange] = useState([100, 500]);

  return (
    <div className="grid grid-cols-1 divide-y divide-neutral-200">
      {/* Popular Filter */}
      <div className="px-5 py-7">
        <div className="mb-3 text-lg font-[600]">Popular Filter</div>
        <div className="flex flex-col gap-3">
          {popular.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={item.value}
                  className="border-neutral-200 bg-neutral-200"
                />
                <label
                  htmlFor={item.value}
                  className="cursor-pointer text-sm font-normal leading-none text-neutral-500"
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
        <div className="mb-2 text-lg font-[600]">Price</div>
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
        <div className="mb-2 text-lg font-[600]">Onward Stops</div>
        <div className="flex flex-wrap gap-2">
          {onwardstop.map((item, index) => (
            <div
              key={index}
              className={cn(
                'cursor-pointer rounded-md bg-neutral-100 px-4 py-1 hover:shadow',
                // {
                //    'border border-primary': onwardstopItems.includes(item.value),
                // },
              )}
            >
              <Checkbox id={item.value} className="peer sr-only" />
              <Label
                htmlFor={item.value}
                className="text-sm font-normal leading-none text-neutral-500"
              >
                {item.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Return Stop */}
      <div className="px-5 py-7">
        <div className="mb-2 text-lg font-[600]">Return Stops</div>
        <div className="flex flex-wrap gap-2">
          {returnstops.map((item, index) => (
            <div
              key={index}
              className={cn(
                'cursor-pointer rounded-md bg-neutral-100 px-4 py-1 hover:shadow',
                // {
                //    'border border-primary': onwardstopItems.includes(item.value),
                // },
              )}
            >
              <Checkbox id={item.value} className="peer sr-only" />
              <Label
                htmlFor={item.value}
                className="text-sm font-normal leading-none text-neutral-500"
              >
                {item.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Preferrd Airlint */}
      <div className="px-5 py-7">
        <div className="mb-3 text-lg font-[600]">Preferred Airline</div>
        <div className="flex flex-col gap-3">
          {airlines.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={item.value}
                  className="border-neutral-200 bg-neutral-200"
                />
                <Label
                  htmlFor={item.value}
                  className="flex cursor-pointer items-center gap-2 text-sm font-normal leading-none text-neutral-500"
                >
                  <Image
                    src={item.logo}
                    className="h-4 w-4"
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
        <div className="mb-3 text-lg font-[600]">Playover Airline</div>
        <div className="flex flex-col gap-3">
          {layover.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={item.value}
                  className="border-neutral-200 bg-neutral-200"
                />
                <Label
                  htmlFor={item.value}
                  className="cursor-pointer text-sm font-normal leading-none text-neutral-500"
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

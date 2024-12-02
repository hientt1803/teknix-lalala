'use client';

import ComboboxDemo from '@/components/custom/combobox/combobox';
import { SliderRange } from '@/components/custom/sliders/slider-range';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FILTER_MOCK } from '@/slices/HotelListing/mock';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Trigger Component
export const FilterCollapseTrigger = ({
   isOpen,
   setIsOpen,
}: {
   isOpen: boolean;
   setIsOpen: (state: boolean) => void;
}) => {
   return (
      <Button
         color="gray"
         onClick={() => setIsOpen(!isOpen)}
         className="flex gap-2 px-3 py-2 rounded bg-primary/10 hover:bg-primary/20 hover:text-black text-primary cursor-pointer"
      >
         <SlidersHorizontal className="w-5 h-5" />
         <span>{isOpen ? 'Hide Filter' : 'Show Filter'}</span>
      </Button>
   );
};

// Content Component
export const FilterCollapseContent = ({ isOpen }: { isOpen: boolean }) => {
   const [priceRange, setPriceRange] = useState([100, 500]);

   if (!isOpen) return null;

   return (
      <motion.div
         initial={{ height: 0, opacity: 0 }}
         animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
         transition={{ duration: 0.5, ease: 'easeInOut' }}
         style={{ overflow: 'hidden' }}
      >
         <div className="bg-primary/10 w-full p-5 grid grid-cols-3 gap-5 rounded-xl">
            <div className="grid w-full  items-center gap-3">
               <Label htmlFor="name" className="font-light">
                  Enter Hotel Name
               </Label>
               <Input type="name" id="name" className="py-5 rounded-xl bg-white" />
            </div>
            <div className="grid w-full  items-center gap-3">
               <Label htmlFor="name" className="font-light">
                  Price
               </Label>
               <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                     <span className="text-sm text-neutral-500">${priceRange[0]}</span>
                     <span className="text-sm text-neutral-500">${priceRange[1]}</span>
                  </div>
                  <SliderRange
                     value={priceRange}
                     onValueChange={setPriceRange}
                     min={0}
                     max={2000}
                  />
               </div>
            </div>
            <div className="grid w-full  items-center gap-3">
               <Label htmlFor="name" className="font-light">
                  Popular Filter
               </Label>
               <ComboboxDemo />
            </div>
            <div className="grid w-full  items-center gap-3">
               <Label htmlFor="name" className="font-light">
                  Custome Rating
               </Label>
               <div className="flex items-center gap-3">
                  <Button variant="ghost" className="rounded-md px-4 bg-neutral-50">
                     <span className="flex gap-1 items-center cursor-pointer">3</span>
                  </Button>
                  <Button variant="ghost" className="rounded-md px-4 bg-neutral-50">
                     <span className="flex gap-1 items-center cursor-pointer">4</span>
                  </Button>
                  <Button variant="ghost" className="rounded-md px-4 bg-neutral-50">
                     <span className="flex gap-1 items-center cursor-pointer">4+</span>
                  </Button>
                  <Button variant="ghost" className="rounded-md px-4 bg-neutral-50">
                     <span className="flex gap-1 items-center cursor-pointer">4.5</span>
                  </Button>
                  <Button variant="ghost" className="rounded-md px-4 bg-neutral-50">
                     <span className="flex gap-1 items-center cursor-pointer">5</span>
                  </Button>
               </div>
            </div>
            <div className="grid w-full  items-center gap-3">
               <Label htmlFor="name" className="font-light">
                  Star Rating
               </Label>
               <div className="flex gap-2">
                  <Button variant="ghost" className="rounded-md px-4 bg-neutral-50">
                     <span className="flex gap-1 items-center cursor-pointer">3★</span>
                  </Button>
                  <Button variant="ghost" className="rounded-md px-4 bg-neutral-50">
                     <span className="flex gap-1 items-center cursor-pointer">4★</span>
                  </Button>
                  <Button variant="ghost" className="rounded-md px-4 bg-neutral-50">
                     <span className="flex gap-1 items-center cursor-pointer">4.5★</span>
                  </Button>
                  <Button variant="ghost" className="rounded-md px-4 bg-neutral-50">
                     <span className="flex gap-1 items-center cursor-pointer">5★</span>
                  </Button>
               </div>
            </div>
            <div className="grid w-full  items-center gap-3">
               <Label htmlFor="name" className="font-light">
                  Hotel Type
               </Label>
               <ComboboxDemo />
            </div>
            <div className="grid w-full col-span-3 items-center gap-3">
               <Label htmlFor="name" className="font-light">
                  Amenites
               </Label>
               <div className="grid grid-cols-6 gap-5">
                  {FILTER_MOCK[0].filters.map((item, index) => (
                     <div key={index} className="flex items-center gap-2">
                        <Checkbox id={item.id + ''} className="bg-neutral-200 border-neutral-200" />
                        <Label
                           htmlFor={item.id + ''}
                           className="text-sm text-neutral-700 font-normal leading-none"
                        >
                           {item.name}
                        </Label>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </motion.div>
   );
};

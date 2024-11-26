import React from 'react';
import FilterFlighting from './filter';
import { FlightListing } from './listing';
import { Button } from '@/components/ui/button';

const MainContent = () => {
   return (
      <div className="grid grid-cols-12 gap-6">
         <div className="col-span-3">
            <div className="rounded-xl shadow-xl shadow-neutral-200">
               <FilterFlighting />
            </div>
            <div className="py-8 flex items-center justify-between">
               <Button variant={'ghost'}>Clear all</Button>
               <Button>Filter Result</Button>
            </div>
         </div>
         <div className="col-span-9">
            <FlightListing />
         </div>
      </div>
   );
};

export default MainContent;

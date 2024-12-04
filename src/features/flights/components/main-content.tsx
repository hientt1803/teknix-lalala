import React from 'react';

import { Button } from '@/components/ui/button';

import FilterFlighting from './filter';
import { FlightListing } from './listing';

const MainContent = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3">
        <div className="rounded-xl shadow-xl shadow-neutral-200">
          <FilterFlighting />
        </div>
        <div className="flex items-center justify-between py-8">
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

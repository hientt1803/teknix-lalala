import React, { useState } from 'react';

import StayCard from '@/components/custom/cards/stay-card';
import { Button } from '@/components/ui/button';
import { propertyList } from '@/slices/StaySection/mock';
const data = [
  { label: 'Stays', value: 'stay' },
  { label: 'Experiences', value: 'exp' },
  { label: 'Cars', value: 'car' },
];
const TabSaved = () => {
  const [tabList, setTabList] = useState('stay');
  return (
    <div className="pb-24 pt-14 sm:pt-20 lg:pb-32">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Save lists</h2>
        <div className="w-14 border-b border-neutral-200" />
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            {data.map(tab => (
              <Button
                onClick={() => setTabList(tab.value)}
                className="rounded-full"
                size="lg"
                variant={tab.value === tabList ? 'default' : 'outline'}
                key={tab.value}
              >
                {tab.label}
              </Button>
            ))}
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
              {propertyList.map((pro: any) => (
                <StayCard key={pro.id} {...pro} />
              ))}
            </div>
            <div className="mt-11 flex items-center justify-center">
              <Button className="focus:ring-primary-600 relative inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 sm:px-6 sm:text-base">
                Show me more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSaved;

'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { AmenityGroup } from '@/stores/features/stay/type';

type Props = {
  amenites?: AmenityGroup[];
};

const AmenitiesSecion = ({ amenites }: Props) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="my-10 space-y-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
      <div>
        <h2 className="text-2xl font-semibold">Amenities </h2>
        <span className="mt-2 block text-neutral-500 dark:text-neutral-300">
          {' '}
          About the property&apos;s amenities and services
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200" />

      {(showAll && amenites ? amenites : amenites?.slice(0, 4))?.map(
        (amenity, index) => (
          <div key={index} className="space-y-3">
            <div className="flex flex-col">
              <h3 className="mb-5 font-medium">{amenity.group_name}</h3>
              <div
                key={amenity.group_name}
                className="grid grid-cols-1 gap-3 text-sm text-neutral-700 dark:text-neutral-400 sm:grid-cols-2 xl:grid-cols-3"
              >
                {amenity.amenities.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className=" ">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-b border-neutral-200 dark:border-neutral-700" />
          </div>
        ),
      )}
      <div>
        <Button
          onClick={() => setShowAll(o => !o)}
          className="focus:ring-primary-600 relative inline-flex h-auto items-center justify-center rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:px-6 sm:text-base"
        >
          {showAll ? 'Hide' : 'View more amenities'}
        </Button>
      </div>
    </div>
  );
};

export default AmenitiesSecion;

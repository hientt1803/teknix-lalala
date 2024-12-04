import { MapPin } from 'lucide-react';

import { Input } from '@/components/ui/input';

export const InputSearchLocationSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
        Location
      </div>
      <div className="flex w-full items-center justify-start gap-1">
        <MapPin className="h-5 w-5 text-neutral-400" />
        <Input
          type="text"
          placeholder="New York, USA"
          className="w-full border-none p-0 shadow-none outline-none placeholder:font-medium placeholder:text-neutral-800 focus:border-none focus:placeholder-neutral-400 focus:outline-none focus-visible:outline-none focus-visible:ring-0 dark:placeholder:dark:text-neutral-50 md:min-w-[7.5rem]"
        />
      </div>
    </div>
  );
};

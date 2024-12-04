import { CalendarIcon } from 'lucide-react';

export const InputSearchDateRangeSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
        Check-in — Check-out
      </div>
      <div className="flex w-full items-center justify-start gap-1">
        <CalendarIcon className="h-5 w-5 text-neutral-400" />
        <div className="text-sm font-medium text-neutral-600">
          Check-in — Check-out
        </div>
      </div>
    </div>
  );
};

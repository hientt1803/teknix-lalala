import { CalendarIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const DatePickerWithRange = dynamic(
   () => import('./dateRangeInput').then((mod) => mod.DatePickerWithRange),
   {
      loading: () => (
         <div className="w-full flex justify-start items-center gap-1">
            <CalendarIcon className="text-neutral-400 w-5 h-5" />
            <div className="text-neutral-600 text-sm font-medium">Check-in — Check-out</div>
         </div>
      ),
   },
);

export const InputSearchDateRange = ({ title = 'Check-in — Check-out' }: { title?: string }) => {
   return (
      <div className="flex flex-col justify-start items-start gap-2">
         <div className="text-neutral-600 dark:text-neutral-300 text-sm font-medium">{title}</div>

         <div className="flex justify-start items-center gap-2">
            <DatePickerWithRange />
         </div>
      </div>
   );
};

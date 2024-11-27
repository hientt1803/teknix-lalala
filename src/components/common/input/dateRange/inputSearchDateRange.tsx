import { ChevronDown } from 'lucide-react';
import { DatePickerWithRange } from './dateRangeInput';

export const InputSearchDateRange = ({ title = 'CheckIn - CheckOut' }: { title?: string }) => {
   return (
      <div className="flex flex-col justify-start items-start gap-2">
         <div className="text-neutral-600 dark:text-neutral-300 text-sm font-medium">{title}</div>

         <div className="flex justify-start items-center gap-2">
            <DatePickerWithRange />
            {/* <ChevronDown className="text-black w-5 h-5" /> */}
         </div>
      </div>
   );
};

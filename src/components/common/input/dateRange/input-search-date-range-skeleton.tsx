import { CalendarIcon } from "lucide-react";

export const InputSearchDateRangeSkeleton = () => {
   return (
      <div className="flex flex-col justify-start items-start gap-2">
         <div className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            Check-in — Check-out
         </div>
         <div className="w-full flex justify-start items-center gap-1">
            <CalendarIcon className="text-slate-400 w-5 h-5" />
            <div className="text-slate-600 text-sm font-medium">Check-in — Check-out</div>
         </div>
      </div>
   );
};

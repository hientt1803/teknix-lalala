import dynamic from 'next/dynamic';

const DatePickerWithRange = dynamic(() =>
   import('./dateRangeInput').then((mod) => mod.DatePickerWithRange),
);

export const InputSearchDateRange = ({ title = 'Check-in — Check-out' }: { title?: string }) => {
   return (
      <div className="flex flex-col justify-start items-start gap-2">
         <div className="text-slate-600 dark:text-slate-300 text-sm font-medium">{title}</div>

         <div className="flex justify-start items-center gap-2">
            <DatePickerWithRange />
         </div>
      </div>
   );
};

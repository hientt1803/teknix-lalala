import { CalendarIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const DatePickerWithRange = dynamic(
  () => import('./dateRangeInput').then(module_ => module_.DatePickerWithRange),
  {
    loading: () => (
      <div className="flex w-full items-center justify-start gap-1">
        <CalendarIcon className="h-5 w-5 text-neutral-400" />
        <div className="text-sm font-medium text-neutral-600">
          Check-in — Check-out
        </div>
      </div>
    ),
  },
);

export const InputSearchDateRange = ({
  title = 'Check-in — Check-out',
}: {
  title?: string;
}) => {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
        {title}
      </div>

      <div className="flex items-center justify-start gap-2">
        <DatePickerWithRange />
      </div>
    </div>
  );
};

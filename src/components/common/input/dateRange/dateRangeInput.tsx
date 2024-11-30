'use client';

import { addDays, format, isBefore } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/stores/hook';
import { setSearchGlobalDateRange } from '@/stores/features/global/global-slice';
import {
   checkIfDateIsGreaterThanToday,
   convertStringToDate,
   getAdjustedEndDate,
   getValidatedDate,
} from '@/utilities/datetime';
import { useDispatch } from 'react-redux';

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
   // Redux
   const searchGlobal = useAppSelector((state) => state.globalSlice.searchGlobal.dateRange);
   const dispatch = useDispatch();

   // State
   const [date, setDate] = React.useState<DateRange | undefined>({
      from: searchGlobal?.startDate
         ? checkIfDateIsGreaterThanToday(convertStringToDate(searchGlobal.startDate))
         : new Date(),
      to: getAdjustedEndDate(searchGlobal.startDate, searchGlobal.endDate),
   });

   // Hooks

   // Api

   // Logic
   React.useEffect(() => {
      const today = new Date();
      const initialFrom = getValidatedDate(searchGlobal?.startDate || today, today);
      const initialTo = getValidatedDate(searchGlobal?.endDate || today, addDays(today, 2));

      // Check if the dateRange doesn't exist or is in the past, and update if needed
      if (
         !searchGlobal?.startDate ||
         !searchGlobal?.endDate ||
         isBefore(new Date(searchGlobal.endDate), today)
      ) {
         dispatch(
            setSearchGlobalDateRange({
               startDate: format(initialFrom, 'yyyy-MM-dd'),
               endDate: format(initialTo, 'yyyy-MM-dd'),
            }),
         );
      }

      setDate({
         from: initialFrom,
         to: initialTo,
      });
   }, [dispatch, searchGlobal.endDate, searchGlobal?.startDate]);
   return (
      <div className={cn('grid gap-2', className)}>
         <Popover
            onOpenChange={(open) => {
               if (open == false) {
                  dispatch(
                     setSearchGlobalDateRange({
                        startDate: format(date?.from || new Date(), 'yyyy-MM-dd'),
                        endDate: format(date?.to || new Date(), 'yyyy-MM-dd'),
                     }),
                  );
               }
            }}
         >
            <PopoverTrigger asChild>
               <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                     'w-fit hover:bg-transparent justify-start items-center text-left font-normal bg-transparent text-slate-800 dark:text-slate-50 shadow-none border-none outline-none p-0 ml-0 pl-0',
                     !date && 'text-muted-foreground',
                  )}
               >
                  <CalendarIcon className="text-slate-400 w-5 h-5" />
                  {date?.from ? (
                     date.to ? (
                        <>
                           {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                        </>
                     ) : (
                        format(date.from, 'LLL dd, y')
                     )
                  ) : (
                     <span>Pick a date</span>
                  )}
               </Button>
            </PopoverTrigger>
            <PopoverContent
               onOpenAutoFocus={(e) => e.preventDefault()}
               className="w-auto p-0"
               align="start"
            >
               <Calendar
                  initialFocus
                  mode="range"
                  fromDate={new Date()}
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
               />
            </PopoverContent>
         </Popover>
      </div>
   );
}

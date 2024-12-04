import { format } from 'date-fns';
import { CalendarIcon, ImagePlusIcon } from 'lucide-react';
import { useState } from 'react';

import InputLabel from '@/components/custom/input/input-label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const TabInfo = () => {
  const [date, setDate] = useState<Date>();
  return (
    <div className="pb-24 pt-14 sm:pt-20 lg:pb-32">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Account infomation</h2>
        <div className="w-14 border-b border-neutral-200" />
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-shrink-0 items-start">
            <div className="relative flex overflow-hidden rounded-full">
              <div className="relative inline-flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full font-semibold uppercase text-neutral-100 shadow-inner ring-1 ring-white">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src="/testimonials/client2.png"
                    className="h-full w-full rounded-full object-cover"
                  />
                  <AvatarFallback className="h-full w-full">CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black bg-opacity-60 text-neutral-50">
                <ImagePlusIcon strokeWidth={1.5} />
                <span className="mt-1 text-xs">Change Image</span>
              </div>
            </div>
          </div>
          <div className="mt-10 max-w-3xl flex-grow space-y-6 md:mt-0 md:pl-16">
            <div>
              <InputLabel
                label="Name"
                defaultValue={'Mr. Minh'}
                className="focus:border-primary-300 focus:ring-primary-200 mt-1.5 block h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:ring focus:ring-opacity-50"
                sizes="small"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Gender</Label>
              <Select>
                <SelectTrigger className="focus:border-primary-300 focus:ring-primary-200 mt-1.5 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:ring focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-800">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Male</SelectItem>
                    <SelectItem value="banana">Female</SelectItem>
                    <SelectItem value="blueberry">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <InputLabel
                label="User name"
                defaultValue={'@eden_minh'}
                className="focus:border-primary-300 focus:ring-primary-200 mt-1.5 block h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:ring focus:ring-opacity-50"
                sizes="small"
              />
            </div>
            <div>
              <InputLabel
                label="Email"
                defaultValue={'example@email.com'}
                className="focus:border-primary-300 focus:ring-primary-200 mt-1.5 block h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:ring focus:ring-opacity-50"
                sizes="small"
              />
            </div>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <Label className="text-sm font-medium">Day of birth</Label>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'focus:border-primary-300 focus:ring-primary-200 mt-1.5 flex h-11 w-full items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:ring focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-800',
                        !date && 'text-muted-foreground',
                      )}
                    >
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <InputLabel
                label="Phone number"
                defaultValue={'0345678910'}
                className="focus:border-primary-300 focus:ring-primary-200 mt-1.5 block h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:ring focus:ring-opacity-50"
                sizes="small"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">About you</Label>
              <Textarea
                placeholder={'About you...'}
                className="focus:border-primary-300 focus:ring-primary-200 mt-1.5 block min-h-[100px] w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:ring focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-800"
                rows={5}
              />
            </div>
            <div className="pt-2">
              <Button className="focus:ring-primary-6000 relative inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-0 sm:px-6 sm:text-base">
                Update info
              </Button>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};

export default TabInfo;

'use client';

import { setCookie } from 'cookies-next';
import { Search, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { setTriggerRoomSearch, setTriggerSearch } from '@/stores/features/stay';
import { useAppSelector } from '@/stores/hook';
import {
  convertStringToDate,
  formatDateToYearMonthDay,
  formatDateUTC,
} from '@/utilities/datetime';

import { InputSearchDateRangeSkeleton } from '../input/dateRange/input-search-date-range-skeleton';
import { InputSearchGuestSkeleton } from '../input/guest/input-search-guest-skeleton';
import { InputSearchLocationSkeleton } from '../input/location/inputSearchLocationSkeleton';

const InputSearchLocation = dynamic(
  () =>
    import('../input/location/inputSearchLocation').then(
      module_ => module_.InputSearchLocation,
    ),
  {
    loading: () => <InputSearchLocationSkeleton />,
    ssr: false,
  },
);
const InputSearchDateRange = dynamic(
  () =>
    import('../input/dateRange/inputSearchDateRange').then(
      module_ => module_.InputSearchDateRange,
    ),
  {
    loading: () => <InputSearchDateRangeSkeleton />,
  },
);
const InputSearchGuest = dynamic(
  () =>
    import('../input/guest/inputSearchGuest').then(
      module_ => module_.InputSearchGuest,
    ),
  {
    loading: () => <InputSearchGuestSkeleton />,
  },
);

interface SearchGroupType {
  typeProp?: 'hotel' | 'flight';
  className?: string;
  tabWrapperClassname?: string;
  tabContentClassname?: string;
  buttonClassname?: string;
  isFromHotelDetail?: boolean;
  showTabs?: boolean;
  showBorder?: boolean;
  showLocation?: boolean;
  showLabel?: boolean;
}

export const SearchGroup = ({
  typeProp: typeProperty = 'hotel',
  className,
  tabWrapperClassname,
  tabContentClassname,
  buttonClassname,
  isFromHotelDetail = false,
  showTabs = false,
  showBorder = false,
  showLocation = true,
  showLabel = true,
}: SearchGroupType) => {
  // Next api
  const router = useRouter();
  const pathname = usePathname();

  // Redux
  const globalState = useAppSelector(state => state.globalSlice.searchGlobal);
  const hotelSearchLoadingState = useAppSelector(
    state => state.staySlice.isTriggerGlobal,
  );
  const roomSearchLoading = useAppSelector(
    state => state.staySlice.isTriggerRoomSearch,
  );
  const dispatch = useDispatch();

  // State
  const [locationPopoverOpen, setLocationPopoverOpen] = useState(false);

  // Logic
  useEffect(() => {
    dispatch(setTriggerSearch(false));
    dispatch(setTriggerRoomSearch(false));
  }, []);

  const handleSearchDirection = () => {
    if (globalState?.location.name === '') {
      setLocationPopoverOpen(true);
      return;
    }
    setLocationPopoverOpen(false);

    // convert data
    const startDate = formatDateToYearMonthDay(
      convertStringToDate(globalState.dateRange.startDate),
    );
    const endDate = formatDateToYearMonthDay(
      convertStringToDate(globalState.dateRange.endDate),
    );

    let adults = 0;
    globalState.people
      ? globalState.people.forEach(item => {
          adults += item.adults;
        })
      : [];

    // add data to params
    const params = new URLSearchParams({
      checkin: startDate,
      checkout: endDate,
      language: 'en',
      adults: adults.toString(),
      currency: 'VND',
    });

    let childrens = 0;
    globalState.people.map(item => {
      item.children.forEach((child, index) => {
        childrens++;
        params.append(`childrens[${index}]`, String(child));
      });
    });

    params.append(
      'latitude',
      String(globalState?.location?.lat) || '10.0364634',
    );
    params.append(
      'longtitude',
      String(globalState?.location?.lon) || '105.7875821',
    );
    params.append('region', String(globalState?.location.name) || '');

    if (isFromHotelDetail) {
      dispatch(setTriggerRoomSearch(true));
    } else {
      if (globalState.location.searchType === 'hotel') {
        params.append('id', globalState.location.hotelId!);
        router.push(
          `/hotel/${globalState.location.hotelId}?${params.toString()}`,
          {
            scroll: false,
          },
        );
      } else {
        if (pathname == '/hotel') {
          dispatch(setTriggerSearch(true));

          const searchUrl = new URLSearchParams(globalThis.location.search);
          if (searchUrl.toString().includes('msg=notfound')) {
            globalThis.history.pushState({}, '', `/hotel?${params.toString()}`);
          }

          // set cookie for Meta Data
          setCookie('locationSearch', globalState.location.name);
          setCookie(
            'dateRange',
            `${formatDateUTC(convertStringToDate(globalState.dateRange.startDate))} - ${formatDateUTC(convertStringToDate(globalState.dateRange.endDate))}`,
          );

          // direct to new route
          globalThis.history.pushState({}, '', `/hotel?${params.toString()}`);
          // router.replace(`/hotel?${params.toString()}`, {
          //   scroll: false,
          // });
        } else {
          // trigger search
          dispatch(setTriggerSearch(true));

          // set cookie for Meta Data
          setCookie('locationSearch', globalState.location.name);
          setCookie(
            'dateRange',
            `${formatDateUTC(convertStringToDate(globalState.dateRange.startDate))} - ${formatDateUTC(convertStringToDate(globalState.dateRange.endDate))}`,
          );

          // direct to new route
          router.push(`/hotel?${params.toString()}`);
        }
      }
    }
  };

  const TabContent = ({
    type = typeProperty,
  }: {
    type: 'hotel' | 'flight';
  }) => (
    <div
      className={cn(
        showBorder
          ? 'rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'
          : '',
      )}
    >
      {/* Hotels */}
      {type == 'hotel' && (
        <div
          className={cn(
            'flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-5',
            tabContentClassname,
          )}
        >
          {/* Location */}
          {showLocation && (
            <>
              <div className="">
                <InputSearchLocation
                  title={!showLabel ? '' : 'Location'}
                  locationPopoverState={locationPopoverOpen}
                  setLocationPopoverOpen={setLocationPopoverOpen}
                />
              </div>
              <div className="mx-0 h-[1px] w-full bg-neutral-200 dark:bg-neutral-700 md:mx-5 md:h-12 md:w-[1px]" />
            </>
          )}

          {/* Daterange */}
          <div className="">
            <InputSearchDateRange
              title={!showLabel ? '' : 'Check-in — Check-out'}
            />
          </div>

          <div className="mx-0 h-[1px] w-full bg-neutral-200 dark:bg-neutral-700 md:mx-5 md:h-12 md:w-[1px]" />

          {/* Guest */}
          <div className="mr-6">
            <InputSearchGuest title={!showLabel ? '' : 'Guest'} />
          </div>

          {/* Button */}
          <Button
            variant="default"
            className={cn(
              'w-fit min-w-[9.375rem] rounded-full bg-black px-7 py-7 text-lg font-normal text-white hover:bg-neutral-800 hover:text-white dark:bg-neutral-100 dark:text-neutral-800 xl:max-w-[9.375rem]',
              buttonClassname,
            )}
            onClick={() => handleSearchDirection()}
            disabled={hotelSearchLoadingState || roomSearchLoading}
          >
            {hotelSearchLoadingState || roomSearchLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-4 border-gray-200 border-t-neutral-800" />
            ) : (
              <>
                <Search className="h-5 w-5 text-neutral-200 dark:text-neutral-800" />
                Search
              </>
            )}
          </Button>
        </div>
      )}

      {/* Fligh */}
      {type == 'flight' && (
        <>
          {/* HEADER */}
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Button
                variant="default"
                className="rounded-2xl bg-black px-4 py-1 text-sm text-white"
              >
                Round-trip
              </Button>
              <Button
                variant="default"
                className="rounded-2xl bg-black px-4 py-1 text-sm text-white"
              >
                One-way
              </Button>

              <div className="mx-6 h-12 w-[1px] bg-neutral-200" />

              <Select>
                <SelectTrigger className="w-fit rounded-2xl">
                  <SelectValue
                    defaultValue={'business'}
                    placeholder={'business'}
                    defaultChecked
                    className="rounded-2xl"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="miltiple">Miltiple</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-fit rounded-2xl">
                  <SelectValue
                    defaultValue={'2 Guest'}
                    placeholder={'2 Guest'}
                    defaultChecked
                    className="rounded-2xl"
                  />
                </SelectTrigger>
                <SelectContent className="min-w-[21.875rem] rounded-lg p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex flex-col items-start justify-start gap-0">
                      <span className="text-md font-medium">Adults</span>
                      <span className="text-sm font-medium text-neutral-500">
                        Ages 13 or above
                      </span>
                    </div>

                    {/* <GroupInputQuantity quantity={1} /> */}
                  </div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex flex-col items-start justify-start gap-0">
                      <span className="text-md font-medium">Children</span>
                      <span className="text-sm font-medium text-neutral-500">
                        Ages 2 - 12
                      </span>
                    </div>

                    {/* <GroupInputQuantity quantity={1} /> */}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col items-start justify-start gap-0">
                      <span className="text-md font-medium">Infants</span>
                      <span className="text-sm font-medium text-neutral-500">
                        Ages 0-2
                      </span>
                    </div>

                    {/* <GroupInputQuantity quantity={1} /> */}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-2 h-[1px] w-full bg-neutral-200" />
          </div>

          {/* MAIN CONTENT */}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-5">
            {/* Location */}
            <div className="flex-[2]">
              <InputSearchLocation
                title="Flying from"
                locationPopoverState={locationPopoverOpen}
                setLocationPopoverOpen={setLocationPopoverOpen}
              />
            </div>

            <div className="mx-0 h-[1px] w-full bg-neutral-200 md:mx-5 md:h-12 md:w-[1px]" />

            {/* Location */}
            <div className="flex-[2]">
              <InputSearchLocation
                title="Flying to"
                locationPopoverState={locationPopoverOpen}
                setLocationPopoverOpen={setLocationPopoverOpen}
              />
            </div>

            <div className="mx-0 h-[1px] w-full bg-neutral-200 md:mx-5 md:h-12 md:w-[1px]" />

            {/* Daterange */}
            <div className="flex-[2] flex-grow">
              <InputSearchDateRange title="Pick up Date" />
            </div>

            {/* Button */}
            <Button
              variant="default"
              className={cn(
                'w-fit min-w-[9.375rem] rounded-full bg-black px-7 py-7 text-lg font-normal text-white hover:bg-neutral-800 hover:text-white dark:bg-neutral-100 dark:text-neutral-800 xl:max-w-[9.375rem]',
                buttonClassname,
              )}
            >
              <Search className="h-5 w-5 text-neutral-200 dark:text-neutral-800" />
              Search
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={cn('relative z-30 w-full', className)}>
      <div
        className={cn(
          'w-full rounded-xl bg-white p-7 shadow-md dark:bg-neutral-800',
          tabWrapperClassname,
        )}
      >
        <Tabs value={typeProperty} className="w-full">
          {showTabs && (
            <TabsList className="flex h-full w-full flex-wrap items-center justify-between bg-transparent md:flex-nowrap">
              <div className="w-full">
                <TabsTrigger
                  value="hotel"
                  className="text-md rounded-[1.875rem] bg-white px-5 py-2 font-normal text-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md dark:bg-neutral-900 dark:text-neutral-100 dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-black"
                >
                  Hotels
                </TabsTrigger>
                <TabsTrigger
                  value="tour"
                  className="text-md rounded-[1.875rem] bg-white px-5 py-2 font-normal text-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md dark:bg-neutral-900 dark:text-neutral-100 dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-black"
                >
                  Tour
                </TabsTrigger>
                <TabsTrigger
                  value="flight"
                  className="text-md rounded-[1.875rem] bg-white px-5 py-2 font-normal text-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md dark:bg-neutral-900 dark:text-neutral-100 dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-black"
                >
                  Flight
                </TabsTrigger>
              </div>

              <div className="mt-3 flex flex-nowrap items-center gap-1 font-normal text-neutral-500 dark:text-neutral-300 md:mt-0">
                <User className="h-4 w-4" />
                <span className="text-md text-nowrap">Need some help?</span>
              </div>
            </TabsList>
          )}

          <TabsContent value="hotel" className="w-full">
            <TabContent type="hotel" />
          </TabsContent>
          <TabsContent value="tour" className="w-full">
            <TabContent type="hotel" />
          </TabsContent>
          <TabsContent value="flight" className="w-full">
            <TabContent type="flight" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

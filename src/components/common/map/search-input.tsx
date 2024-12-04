'use client';

import { Portal } from '@radix-ui/react-portal';
import { MapPinIcon, XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import useDebouncedValue from '@/hooks/use-debounced';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/stores';
import { setSearchGlobalLocation } from '@/stores/features/global/global-slice';
import {
  IOpenStreetMapSearchResponse,
  useGetListLocaltionByOpenStreetMapAPIQuery,
} from '@/stores/features/openstreetmap';
import { setRegion } from '@/stores/features/region';
import { setTriggerSearch } from '@/stores/features/stay';
type Props = {
  className?: string;
};
export const SearchInput = ({ className }: Props) => {
  const dispatch = useDispatch();
  const searchGlobal = useAppSelector(state => state.globalSlice.searchGlobal);
  const [search, setSearch] = useState(searchGlobal.location.name || '');
  const [debounced] = useDebouncedValue(search, 300);
  const {
    data: dataList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetListLocaltionByOpenStreetMapAPIQuery({
    // language: "en",
    query: debounced || 'Viet Nam',
  });

  const [open, setOpen] = useState(false);

  const renderSearchResults = (
    items: IOpenStreetMapSearchResponse[],
    icon: React.ReactNode,
  ) => (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className="mb-1 flex w-full cursor-pointer items-center space-x-3 rounded-lg px-2 py-4 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800"
          onClick={() => {
            // if ("region_id" in item) {
            handleSelectedDestination(item);
            // }
          }}
        >
          {icon}
          <span className="w-full truncate">{item.display_name}</span>
        </div>
      ))}
    </>
  );

  const handleSelectedDestination = (region: IOpenStreetMapSearchResponse) => {
    setSearch(region.name);
    dispatch(
      setSearchGlobalLocation({
        name: region.name,
        searchType: 'region',
        regionId: region.place_id,
        lat: Number.parseFloat(region.lat),
        lon: Number.parseFloat(region.lon),
        radius: searchGlobal.location.radius || 15_000,
      }),
    );
    dispatch(
      setRegion({
        id: region.place_id,
        country_code: '',
        name: region.name,
        type: '',
      }),
    );
    dispatch(setTriggerSearch(true));
    setOpen(false);
    setSearch(region.name);
  };

  return (
    <div
      className={cn(
        'absolute left-5 top-5 flex items-center justify-center',
        className,
      )}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          onClick={open ? e => e.preventDefault() : () => setOpen(true)}
          className="z-[500]"
          asChild
        >
          <Card className="relative border-none shadow-2xl">
            <Input
              value={search}
              onChange={e => setSearch(e.currentTarget.value)}
              className="block h-12 w-full truncate rounded-xl bg-transparent px-4 py-3 pr-12 text-base leading-none placeholder-neutral-500 placeholder:truncate dark:placeholder-neutral-300"
              placeholder="Search destinations"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
              {search ? (
                <XCircleIcon
                  strokeWidth={1.5}
                  className="h-5 w-5 cursor-pointer text-neutral-700 dark:text-neutral-300"
                  onClick={() => setSearch('')}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="h-5 w-5 text-neutral-700 dark:text-neutral-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  ></path>
                </svg>
              )}
            </span>
          </Card>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            onOpenAutoFocus={e => e.preventDefault()}
            style={{
              position: 'fixed',
              zIndex: 99_999, // Ensure it's above other full-screen elements
              top: '50px', // Adjust based on placement needed
              left: '10px',
            }}
          >
            <div className="">
              <div className="p-5">
                <div className="">
                  <p className="block text-base font-semibold">
                    Popular destinations
                  </p>
                  <div>
                    <div className="mt-3">
                      {isLoading || isFetching ? (
                        // <CardSearchSkeleton length={5} />
                        <div>
                          <Skeleton />
                        </div>
                      ) : isSuccess && dataList?.length > 0 ? (
                        <ScrollArea className="h-[calc(500px-200px)]">
                          {renderSearchResults(
                            dataList,
                            <MapPinIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />,
                          )}
                        </ScrollArea>
                      ) : (
                        // <CardNotFound />
                        <div>
                          <Skeleton />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Portal>
      </Popover>
    </div>
  );
};

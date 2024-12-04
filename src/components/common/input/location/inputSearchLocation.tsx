'use client';

import {
  Building2,
  MapPin,
  PlaneIcon,
  TrainFrontIcon,
  TrainTrack,
  University,
  XIcon,
} from 'lucide-react';
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import useDebouncedValue from '@/hooks/use-debounced';
import { cn } from '@/lib/utils';
import { setSearchGlobalLocation } from '@/stores/features/global/global-slice';
import { useLazyGetListLocaltionByOpenStreetMapAPIQuery } from '@/stores/features/openstreetmap';
import { useLazyGetListHoteStayByLocationKeyWordQuery } from '@/stores/features/stay';
import { useAppSelector } from '@/stores/hook';

export const InputSearchLocation = ({
  title = 'Location',
  locationPopoverState,
  setLocationPopoverOpen,
}: {
  title?: string;
  locationPopoverState: boolean;
  setLocationPopoverOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // redux
  const searchGlobal = useAppSelector(state => state.globalSlice.searchGlobal);
  const dispatch = useDispatch();

  // state
  const [open, setOpen] = useState(false);

  const [inputSearch, setInputSearch] = useState(
    searchGlobal?.location?.name || '',
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // hooks
  const [debouncedSearchValue] = useDebouncedValue(inputSearch, 500);

  // Api
  const [
    fetchGeo,
    {
      isLoading: searchGeoLoading,
      data: searchGeoData,
      isFetching: searchGeoFetching,
    },
  ] = useLazyGetListLocaltionByOpenStreetMapAPIQuery();
  const [
    fetchLocation,
    {
      isLoading: searchLocationLoading,
      data: searchLocationData,
      isFetching: searchLocationFetching,
    },
  ] = useLazyGetListHoteStayByLocationKeyWordQuery();

  // logic
  useEffect(() => {
    // Open popover if location is not available
    setOpen(locationPopoverState);
    locationPopoverState && inputRef?.current?.focus();
  }, [locationPopoverState]);

  useEffect(() => {
    fetchGeo({
      query: debouncedSearchValue.replaceAll(' ', '+') || 'Can Tho',
    });

    fetchLocation({
      query: debouncedSearchValue || 'Can Tho',
      language: 'en',
    });
  }, [debouncedSearchValue, fetchGeo, fetchLocation]);

  const handleOpenSearch = () => {
    inputRef?.current?.focus();
    setOpen(true);
  };

  const handleChooseLocation = useCallback(
    ({
      name,
      type,
      hotelId = '',
      regionId = 0,
      lat,
      lon,
      placeId,
    }: {
      name: string;
      type: string;
      hotelId?: string;
      regionId?: number;
      lat?: number;
      lon?: number;
      placeId?: number;
    }) => {
      dispatch(
        setSearchGlobalLocation({
          name: name || inputSearch,
          searchType: type == 'hotel' ? 'hotel' : 'region',
          hotelId: hotelId,
          regionId: regionId,
          lat: lat || 0,
          lon: lon || 0,
          placeId: placeId || 0,
        }),
      );
      setOpen(false);
      setLocationPopoverOpen(false);

      if (searchGlobal.location.radius) {
        // dispatch(
        //    setSearchGlobalLocationRadius({
        //       radius: searchGlobal.location.radius || 30000,
        //    }),
        // );
      }
    },
    [dispatch, inputSearch, searchGlobal.location.radius],
  );

  // Render logic
  const regionTypeDisplay: (type: string) => React.JSX.Element = useCallback(
    (type: string) => {
      switch (type) {
        case 'City': {
          return <Building2 strokeWidth={1} className="h-4 w-4" />;
        }
        case 'Airport': {
          return <PlaneIcon strokeWidth={1} className="h-4 w-4" />;
        }
        case 'Subway (Entrace)': {
          return <TrainFrontIcon strokeWidth={1} className="h-4 w-4" />;
        }
        case 'Railway Station': {
          return <TrainTrack strokeWidth={1} className="h-4 w-4" />;
        }
        case 'school': {
          return <University strokeWidth={1} className="h-4 w-4" />;
        }
        case 'administrative': {
          return <Building2 strokeWidth={1} className="h-4 w-4" />;
        }
        default: {
          return <Building2 strokeWidth={1} className="h-4 w-4" />;
        }
      }
    },
    [],
  );

  const SearchRegionByGeo = () => {
    return (
      <React.Fragment>
        {/* Regions */}
        <div className="mt-2">
          <p
            className={cn(
              'mx-3 mb-1 mt-2 text-sm font-normal text-neutral-900 dark:text-neutral-300',
              searchGeoData?.length === 0 && 'hidden',
            )}
          >
            Regions
          </p>
        </div>

        {searchGeoLoading || searchGeoFetching ? (
          <div className="w-full min-w-full">
            <SkeletonLoading />
          </div>
        ) : (
          <React.Fragment>
            {searchGeoData?.length === 0 ? (
              <></>
            ) : (
              searchGeoData?.map(region => (
                <DestinationItem
                  key={region.place_id}
                  icon={regionTypeDisplay(region.type)}
                  name={`${region.name}, ${region.address.country}`}
                  address={region.display_name}
                  onClick={() => {
                    setInputSearch(region.name);
                    handleChooseLocation({
                      name: region.name,
                      type: 'region',
                      regionId: region.place_id,
                      lat: Number(region.lat),
                      lon: Number(region.lon),
                      placeId: Number(region.place_id),
                    });
                  }}
                />
              ))
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  const ListSearchByAutoComplete = () => {
    return (
      <React.Fragment>
        {/* Hotels */}
        <div className="mt-2">
          <p
            className={cn(
              'mx-3 mb-1 mt-2 text-xs font-normal text-neutral-900',
              searchLocationData?.hotels?.length === 0 && 'hidden',
            )}
          >
            Hotels
          </p>
        </div>

        {searchLocationLoading || searchLocationFetching ? (
          <SkeletonLoading />
        ) : (
          <React.Fragment>
            {searchLocationData?.hotels?.length === 0 ? (
              <></>
            ) : (
              searchLocationData?.hotels.map(hotel => (
                <DestinationItem
                  key={hotel.id}
                  icon={<Building2 className="h-5 w-5" />}
                  name={hotel.name}
                  onClick={() => {
                    setInputSearch(hotel.name);
                    handleChooseLocation({
                      name: hotel.name,
                      type: 'hotel',
                      hotelId: hotel.id,
                    });
                  }}
                />
              ))
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  const NoResult = () => {
    return (
      <div className="mx-auto my-4 w-full">
        <div className="flex flex-col gap-2">
          <p className="text-center text-sm font-medium text-neutral-500">
            Sorry, we cannot find this place {`:(`}
          </p>
          <p
            className="mx-auto cursor-pointer text-sm font-medium text-blue-900"
            onClick={() => {
              inputRef?.current?.focus();
              setInputSearch('');
            }}
          >
            Reset
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
        {title}
      </div>

      <Popover
        open={open}
        onOpenChange={open => {
          setOpen(open);
          !open && setLocationPopoverOpen(false);
        }}
      >
        <PopoverTrigger
          onClick={e => {
            if (open) {
              e.preventDefault();
            }
            handleOpenSearch();
          }}
          asChild
        >
          <div className="flex w-full items-center justify-start gap-1">
            <MapPin className="h-5 w-5 text-neutral-400" />
            <Input
              type="text"
              placeholder="New York, USA"
              className="w-full border-none p-0 shadow-none outline-none placeholder:font-medium placeholder:text-neutral-800 focus:border-none focus:placeholder-neutral-400 focus:outline-none focus-visible:outline-none focus-visible:ring-0 dark:placeholder:dark:text-neutral-50 md:min-w-[7.5rem]"
              ref={inputRef}
              value={inputSearch}
              onClick={e => {
                e.stopPropagation();
                handleOpenSearch();
              }}
              onChange={e => setInputSearch(e.currentTarget.value)}
            />
            {inputSearch && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setInputSearch('');
                  inputRef.current?.focus();
                }}
              >
                <XIcon className="h-5 w-5 cursor-pointer text-neutral-800 dark:text-neutral-200" />
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={e => {
            e.preventDefault();
          }}
          align="start"
          className="my-1 -ml-4 w-[25rem] rounded-lg p-4 shadow-lg"
        >
          {searchLocationData?.hotels?.length == 0 &&
          searchLocationData?.regions.length == 0 &&
          searchGeoData?.length == 0 ? (
            <div className="my-2 w-full">{NoResult()}</div>
          ) : (
            <>
              <div className="w-full">{SearchRegionByGeo()}</div>
              <div className="mt-2 w-full">{ListSearchByAutoComplete()}</div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const DestinationItem = React.memo(function DestinationItemComponent({
  icon,
  name,
  address,
  onClick,
}: {
  icon?: React.ReactNode;
  name?: string;
  address?: string;
  onClick: () => void;
}) {
  return (
    <div
      className="w-full cursor-pointer rounded px-3 py-1 transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
      onClick={onClick}
    >
      <div className="mx-3 flex w-full flex-col gap-1.5">
        <div className="w-full">
          <div className="flex items-center gap-1.5">
            <div>{icon}</div>
            <div className="flex flex-col gap-0.5">
              <p className="line-clamp-2 text-sm font-normal">{name}</p>
              <p className="line-clamp-1 text-xs font-normal text-neutral-500">
                {address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const SkeletonLoading = () => {
  return (
    <div className="w-full px-3">
      <div className="mb-2 flex w-full items-center justify-between gap-2">
        <Skeleton className="h-9 w-10" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="mb-2 flex w-full items-center justify-between gap-2">
        <Skeleton className="h-9 w-10" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="mb-2 flex w-full items-center justify-between gap-2">
        <Skeleton className="h-9 w-10" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
};

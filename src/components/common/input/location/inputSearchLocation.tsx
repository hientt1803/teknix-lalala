'use client';

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import useDebouncedValue from '@/hooks/use-debounced';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/stores';
import { setSearchGlobalLocation } from '@/stores/features/global/global-slice';
import { useLazyGetListLocaltionByOpenStreetMapAPIQuery } from '@/stores/features/openstreetmap';
import { useLazyGetListHoteStayByLocationKeyWordQuery } from '@/stores/features/stay';
import {
   Building2,
   MapPin,
   PlaneIcon,
   TrainFrontIcon,
   TrainTrack,
   University,
   XIcon,
} from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export const InputSearchLocation = ({ title = 'Location' }: { title?: string }) => {
   // redux
   const searchGlobal = useAppSelector((state) => state.globalSlice.searchGlobal);
   const dispatch = useDispatch();

   // state
   const [open, setOpen] = useState(false);

   const [inputSearch, setInputSearch] = useState(searchGlobal?.location?.name || '');
   const inputRef = useRef<HTMLInputElement>(null);

   // hooks
   const [debouncedSearchValue] = useDebouncedValue(inputSearch, 500);

   // Api
   const [
      fetchGeo,
      { isLoading: searchGeoLoading, data: searchGeoData, isFetching: searchGeoFetching },
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
   const regionTypeDisplay: (type: string) => React.JSX.Element = useCallback((type: string) => {
      switch (type) {
         case 'City':
            return <Building2 strokeWidth={1} className="w-4 h-4" />;
         case 'Airport':
            return <PlaneIcon strokeWidth={1} className="w-4 h-4" />;
         case 'Subway (Entrace)':
            return <TrainFrontIcon strokeWidth={1} className="w-4 h-4" />;
         case 'Railway Station':
            return <TrainTrack strokeWidth={1} className="w-4 h-4" />;
         case 'school':
            return <University strokeWidth={1} className="w-4 h-4" />;
         case 'administrative':
            return <Building2 strokeWidth={1} className="w-4 h-4" />;
         default:
            return <Building2 strokeWidth={1} className="w-4 h-4" />;
      }
   }, []);

   const SearchRegionByGeo = () => {
      return (
         <React.Fragment>
            {/* Regions */}
            <div className="mt-2">
               <p
                  className={cn(
                     'text-xs text-neutral-900 font-normal mt-2 mb-1 mx-3',
                     searchGeoData?.length === 0 && 'hidden',
                  )}
               >
                  Regions
               </p>
            </div>

            {searchGeoLoading || searchGeoFetching ? (
               <div className="min-w-full w-full">
                  <SkeletonLoading />
               </div>
            ) : (
               <React.Fragment>
                  {searchGeoData?.length === 0 ? (
                     <></>
                  ) : (
                     searchGeoData?.map((region) => (
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
                     'text-xs text-neutral-900 font-normal mt-2 mb-1 mx-3',
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
                     searchLocationData?.hotels.map((hotel) => (
                        <DestinationItem
                           key={hotel.id}
                           icon={
                              <Image
                                 src="https://st.worldota.net/master/b4c583f-ff08648/react_build/node_modules/components/Icon/Destination/img/hotel.svg"
                                 alt="Hotel image"
                                 width={20}
                                 height={20}
                                 loading="lazy"
                                 className="inline-block"
                              />
                           }
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
         <div className="w-full my-4 mx-auto">
            <div className="flex flex-col gap-2">
               <p className="text-sm font-medium text-neutral-500 text-center">
                  Sorry, we cannot find this place {`:(`}
               </p>
               <p
                  className="text-sm font-medium text-blue-700 cursor-pointer mx-auto"
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
      <div className="flex flex-col justify-start items-start gap-2">
         <div className="text-neutral-600 dark:text-neutral-300 text-sm font-medium">{title}</div>

         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
               onClick={(e) => {
                  if (open) {
                     e.preventDefault();
                  }
                  handleOpenSearch();
               }}
               asChild
            >
               <div className="w-full flex justify-start items-center gap-1">
                  <MapPin className="text-neutral-400 w-5 h-5" />
                  <Input
                     type="text"
                     placeholder="New York, USA"
                     className="placeholder:text-neutral-800 dark:placeholder:dark:text-neutral-50 placeholder:font-medium 
                        w-full md:min-w-[7.5rem] shadow-none border-none outline-none focus-visible:outline-none focus-visible:ring-0 
                        p-0 focus:placeholder-neutral-400 focus:border-none focus:outline-none"
                     ref={inputRef}
                     value={inputSearch}
                     onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSearch();
                     }}
                     onChange={(e) => setInputSearch(e.currentTarget.value)}
                  />
                  {inputSearch !== '' && (
                     <XIcon
                        className="text-neutral-800 cursor-pointer w-5 h-5"
                        onClick={() => {
                           setInputSearch('');
                           inputRef.current?.focus();
                        }}
                     />
                  )}
               </div>
            </PopoverTrigger>
            <PopoverContent
               onOpenAutoFocus={(e) => {
                  e.preventDefault();
               }}
               className="p-0 w-[20rem] my-1 md:ml-10 rounded-lg shadow-lg"
            >
               {searchLocationData?.hotels?.length == 0 &&
               searchLocationData?.regions.length == 0 &&
               searchGeoData?.length == 0 ? (
                  <div className="w-full my-2">{NoResult()}</div>
               ) : (
                  <>
                     <div className="w-full">{SearchRegionByGeo()}</div>
                     <div className="w-full mt-2">{ListSearchByAutoComplete()}</div>
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
         className="transition hover:bg-neutral-200 w-full py-1 px-3 cursor-pointer"
         onClick={onClick}
      >
         <div className="flex flex-col gap-1.5 mx-3 w-full">
            <div className="w-full">
               <div className="flex items-center gap-1.5">
                  <div>{icon}</div>
                  <div className="flex flex-col gap-0.5">
                     <p className="text-sm font-normal line-clamp-2">{name}</p>
                     <p className="text-xs font-normal text-neutral-500 line-clamp-1">{address}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
});

export const SkeletonLoading = () => {
   return (
      <div className="px-3 w-full">
         <div className="w-full mb-2 flex justify-between items-center gap-2">
            <Skeleton className="w-10 h-7" />
            <Skeleton className="w-full h-7" />
         </div>
         <div className="w-full mb-2 flex justify-between items-center gap-2">
            <Skeleton className="w-10 h-7" />
            <Skeleton className="w-full h-7" />
         </div>
         <div className="w-full mb-2 flex justify-between items-center gap-2">
            <Skeleton className="w-10 h-7" />
            <Skeleton className="w-full h-7" />
         </div>
      </div>
   );
};
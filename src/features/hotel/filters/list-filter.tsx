'use client';

import { MainButton } from '@/components/common/button/mainButton';
import Badge from '@/components/custom/badges/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { PlacesType } from '@/lib/Places';
import { cn } from '@/lib/utils';
import { FILTER_MOCK } from '@/slices/HotelListing/mock';
import { useAppSelector } from '@/stores/hook';
import { setSearchGlobalLocationRadius } from '@/stores/features/global/global-slice';
import { ISearchGlobal } from '@/stores/features/global/type';
import { setTriggerSearch } from '@/stores/features/stay/stay-slice';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const FilterMap = dynamic(() => import('../filters/filter-map').then((mod) => mod.FilterMap));

export type FilterType = {
   sectionName: string;
   filters: {
      id: number;
      name: string;
   }[];
};

type ListFilterType = {
   placeData: PlacesType;
   searchGlobal: ISearchGlobal;
};

export const ListFilter = ({ placeData, searchGlobal }: ListFilterType) => {
   // Redux
   const mapRadiusSearch = useAppSelector(
      (state) => state?.globalSlice?.searchGlobal?.location?.radius,
   );
   const dispatch = useDispatch();

   // State
   const [locationGeoRange, setLocationGeoRange] = useState(mapRadiusSearch || 30000);

   // Logic
   let triggerSearchTimeout: NodeJS.Timeout;

   const handleChangeLocationGeoRangeByInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(' km', '');
      let parseNumber = Number(value);

      if (isNaN(parseNumber)) {
         parseNumber = 1;
      }

      if (parseNumber > 30) {
         parseNumber = 30;
      }

      setLocationGeoRange(parseNumber * 1000);

      // Dispatch radius update immediately
      dispatch(
         setSearchGlobalLocationRadius({
            radius: parseNumber * 1000,
         }),
      );

      clearTimeout(triggerSearchTimeout);

      triggerSearchTimeout = setTimeout(() => {
         dispatch(setTriggerSearch(true));
      }, 1000);
   };

   const handleOnChangeSlider = (value: number) => {
      // Update local state immediately
      setLocationGeoRange(value);

      // Dispatch radius update immediately
      dispatch(
         setSearchGlobalLocationRadius({
            radius: value,
         }),
      );

      clearTimeout(triggerSearchTimeout);

      triggerSearchTimeout = setTimeout(() => {
         dispatch(setTriggerSearch(true));
      }, 1000);
   };

   return (
      <React.Fragment>
         <div>
            <div className="group mb-10 mx-6">
               {/* <div className="text-lg font-[600] mb-2">Show on map</div> */}
               <div className="flex items-center space-x-2">
                  <FilterMap
                     placeData={placeData}
                     searchGlobal={searchGlobal}
                     buttonClassName="min-w-full"
                     showMapPlaceHolder
                  />
               </div>
            </div>
            <div className="group mb-10 mx-6">
               <div className="text-lg font-[600]">Location</div>
               <div className="text-sm font-normal text-neutral-500 flex gap-2 items-center mb-2">
                  <svg width="16" height="18" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M4.4 17.6L0 3.4c0-.3 0-.6.4-.7.3-.1.6 0 .7.4l4.3 14.1c.1.3 0 .7-.3.8-.3 0-.6-.1-.7-.4zM12.7 5a.5.5 0 00.3.5c1.2.7 2.2 1.7 2.9 2.4.2.3 0 .8-.4.8-2.3.1-4 2.8-6.7 2.4a.5.5 0 01-.4-.3l-.1-.5a.5.5 0 00-.2-.2c-.6-.6-2.3.3-3.1.9a.5.5 0 01-.7-.3L1.7 2.9a.5.5 0 01.2-.5c.7-.5 2.6-1.7 3.4-1l.1.2.2.5.4.3c2.8.4 4.6-2.8 7.3-2.4.3 0 .5.4.4.6-.3 1-.9 3.1-1 4.5z"
                        fill="#008cb9"
                        fill-rule="evenodd"
                     />
                  </svg>{' '}
                  <span>from the city center</span>
               </div>
               <div className="flex justify-end items-center gap-2">
                  <Slider
                     value={[locationGeoRange]}
                     onValueChange={(value) => handleOnChangeSlider(value[0])}
                     defaultValue={[30000]}
                     min={1000}
                     max={30000}
                     className="flex-1"
                  />
                  <Input
                     value={`${(locationGeoRange / 1000).toFixed(0)} km`}
                     onChange={handleChangeLocationGeoRangeByInput}
                     className="max-w-[5rem] px-2 py-1 border border-gray-300 rounded-md"
                     placeholder="Enter range"
                  />
               </div>
            </div>
            {FILTER_MOCK?.map((filter: FilterType, index) => (
               <React.Fragment key={index}>
                  <div className="group mb-10 mx-6">
                     <div className="text-lg font-[600] mb-2">{filter?.sectionName}</div>
                     <div
                        className={cn(
                           'flex justify-start items-start gap-2 flex-wrap',
                           filter?.sectionName == 'Rating Star' ||
                              filter?.sectionName == 'Customer Rating'
                              ? 'flex-row'
                              : 'flex-col',
                        )}
                     >
                        {filter?.filters?.map((item) => (
                           <div className="flex items-center space-x-2" key={item.id}>
                              {filter?.sectionName == 'Rating Star' ||
                              filter?.sectionName == 'Customer Rating' ? (
                                 <Badge color="gray" className="rounded-md p-2">
                                    <span className="flex gap-1 items-center cursor-pointer">
                                       {item.name}
                                       {filter?.sectionName == 'Rating Star' && (
                                          <span className="text-lg">★</span>
                                       )}
                                    </span>
                                 </Badge>
                              ) : (
                                 <>
                                    <Checkbox
                                       id={item.name}
                                       className="bg-neutral-200 border-neutral-200 rounded-sm"
                                    />
                                    <label
                                       htmlFor={item.name}
                                       className="text-sm text-neutral-500 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                       {item.name}
                                    </label>
                                 </>
                              )}
                           </div>
                        ))}
                     </div>
                  </div>

                  {index !== FILTER_MOCK.length - 1 && (
                     <Separator orientation="horizontal" className="my-6" />
                  )}
               </React.Fragment>
            ))}
         </div>

         <div className="flex justify-between items-center mt-5 mx-6">
            <span className="text-neutral-800 text-sm cursor-pointer font-semibold">Clear all</span>
            <MainButton
               variant="default"
               color="#212121"
               className="bg-neutral-800 hover:bg-neutral-900 text-white hover:text-white text-sm px-4 py-2 rounded-md"
            >
               Filter Result
            </MainButton>
         </div>
      </React.Fragment>
   );
};

'use client';

import { MainButton } from '@/components/common/button/mainButton';
import Badge from '@/components/custom/badges/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { PlacesType } from '@/lib/Places';
import { cn } from '@/lib/utils';
import { FILTER_MOCK } from '@/slices/HotelListing/mock';
import { ISearchGlobal } from '@/stores/features/global/type';
import dynamic from 'next/dynamic';
import React from 'react';

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
   return (
      <React.Fragment>
         <div>
            <div className="group mb-10 mx-6">
               <div className="text-lg font-[600] mb-2">Show on map</div>
               <div className="flex items-center space-x-2">
                  <FilterMap placeData={placeData} searchGlobal={searchGlobal} buttonClassName='min-w-full' />
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

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category } from '@/lib/MarkerCategories';
import { PlaceValues } from '@/lib/Places';
import { useAppSelector } from '@/stores/hook';
import {
   setTriggerSearch,
   useLazyGetListHotelByGeoSearchEngineQuery,
} from '@/stores/features/stay';
import { IHotelDataMapHotels, IHotelSearchGeoEngineRequest } from '@/stores/features/stay/type';
import { formatDateToYearMonthDay } from '@/utilities/datetime';
import { getDistance } from 'geolib';
import { LayoutGrid, List } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const ListHotelWithoutMap = dynamic(() =>
   import('./list-hotel').then((mod) => mod.ListHotelWithoutMap),
);
const FilterDrawer = dynamic(() =>
   import('../filters/filter-drawer').then((mod) => mod.FilterDrawer),
);
const ListFilter = dynamic(() => import('../filters/list-filter').then((mod) => mod.ListFilter));
const FilterCollapse = dynamic(() =>
   import('../filters/filter-collapse').then((mod) => mod.FilterCollapse),
);
const FilterMap = dynamic(() => import('../filters/filter-map').then((mod) => mod.FilterMap));

export const WithoutMapContainer = () => {
   // redux
   const globalSearchState = useAppSelector((state) => state.globalSlice.searchGlobal);
   const isSearchGlobal = useAppSelector((state) => state.staySlice.isTriggerGlobal);
   const dispatch = useDispatch();

   // state
   const [displayType, setDisplayType] = useState<'grid' | 'list'>('list');

   // Api
   const [
      fetchHotelByGeo,
      {
         data: searchHotelGeo,
         isLoading: searchHotelGeoLoading,
         isFetching: searchHotelGeoFetching,
      },
   ] = useLazyGetListHotelByGeoSearchEngineQuery();

   // Logic
   const fetchDataFromApi = () => {
      const searchParams = {
         checkin: formatDateToYearMonthDay(new Date(globalSearchState.dateRange.startDate)),
         checkout: formatDateToYearMonthDay(new Date(globalSearchState.dateRange.endDate)),
         language: globalSearchState?.lang?.cca2 || 'US',
         guests: globalSearchState.people,
         currency: globalSearchState?.currency?.code || 'VND',
         latitude: globalSearchState?.location?.lat || 10.0364634,
         longitude: globalSearchState?.location?.lon || 105.7875821,
         radius: globalSearchState?.location?.radius || 30000,
         place_id: globalSearchState?.location?.placeId || 238946329,
      };

      fetchHotelByGeo(searchParams as IHotelSearchGeoEngineRequest);
   };

   useEffect(() => {
      if (isSearchGlobal) {
         fetchDataFromApi();
      }
   }, [isSearchGlobal]);

   useEffect(() => {
      dispatch(setTriggerSearch(true));
   }, []);

   const kilometDistanceFromOrigin = useCallback((selectedMap: IHotelDataMapHotels) => {
      const latitude = globalSearchState.location?.lat || 30;
      const longtitude = globalSearchState.location?.lon || 20;

      const result = getDistance(
         {
            latitude: latitude,
            longitude: longtitude,
         },
         {
            latitude: selectedMap?.latitude || 0,
            longitude: selectedMap?.longitude || 0,
         },
      );

      return result;
   }, []);

   const hotelsWithMapData = useMemo(() => {
      const hotels = searchHotelGeo?.hotels?.map((hotel) => {
         const selectedMap = searchHotelGeo?.map_hotels?.find((item) => item.id === hotel.hotel_id);

         let distance = 0;
         if (selectedMap) {
            distance = kilometDistanceFromOrigin(selectedMap);
         }

         return { hotel, selectedMap, distance };
      });

      return hotels?.sort((a, b) => a.distance - b.distance);
   }, [searchHotelGeo, kilometDistanceFromOrigin]);

   const placeData = useMemo(() => {
      return (
         hotelsWithMapData?.map((hotel) => {
            const place: PlaceValues = {
               id: hotel.hotel.hotel_id,
               address: hotel.selectedMap?.address || '',
               image:
                  hotel.selectedMap?.images.map((img) => img.replace('{size}', '640x400')) || [],
               category: Category.HOTEL,
               position: [hotel.selectedMap?.latitude || 0, hotel.selectedMap?.longitude || 0],
               title: hotel.selectedMap?.name || '',
               price: Number.parseFloat(hotel?.hotel?.rates[0]?.daily_prices[0] || '0'),
               star: hotel.selectedMap?.star_rating || 0,
            };
            return place; // Return place for each mapped hotel
         }) || []
      ); // Ensure an empty array if hotelsWithMapData is undefined
   }, [hotelsWithMapData]);

   return (
      <div className="w-full">
         <Tabs defaultValue="list" className="w-full overflow-hidden">
            {/* TOGGLE NAVIGATION */}
            <div className="flex justify-between items-center md:items-start gap-3 mb-6">
               <div className="block md:hidden">
                  <FilterDrawer placeData={placeData} searchGlobal={globalSearchState} />
               </div>

               {displayType == 'grid' && (
                  <div className="hidden md:flex items-center gap-4 w-full">
                     <FilterCollapse />
                     <FilterMap placeData={placeData} searchGlobal={globalSearchState} />
                  </div>
               )}

               <div className="hidden md:block" />

               <div className="flex items-center justify-end gap-3 md:mt-5">
                  {/* <div className="text-neutral-600 text-base text-nowrap">
                     1 - 10 of 18 hotel found
                  </div> */}
                  <TabsList>
                     <TabsTrigger
                        value="list"
                        className="bg-neutral-300 text-black rounded-none rounded-l-lg data-[state=active]:bg-black data-[state=active]:text-white py-2"
                        onClick={() => setDisplayType('list')}
                     >
                        <List className="w-5 h-5" />
                     </TabsTrigger>
                     <TabsTrigger
                        value="grid"
                        className="bg-neutral-300 text-black  rounded-none rounded-r-lg data-[state=active]:bg-black data-[state=active]:text-white py-2"
                        onClick={() => setDisplayType('grid')}
                     >
                        <LayoutGrid className="w-5 h-5" />
                     </TabsTrigger>
                  </TabsList>
               </div>
            </div>

            {/* DISPLAY CONTENT */}
            <TabsContent value="list" className="w-full">
               <div className="grid grid-cols-12 gap-6 w-full">
                  <div className="hidden md:block md:col-span-4 lg:col-span-3">
                     <div className="shadow-lg rounded-md py-3">
                        <ListFilter placeData={placeData} searchGlobal={globalSearchState} />
                     </div>
                  </div>
                  <div className="col-span-12 md:col-span-8 lg:col-span-9">
                     <ListHotelWithoutMap
                        type="list"
                        hotelsWithMapData={hotelsWithMapData}
                        searchHotelGeoFetching={searchHotelGeoFetching}
                        searchHotelGeoLoading={searchHotelGeoLoading}
                     />
                  </div>
               </div>
            </TabsContent>
            <TabsContent value="grid" className="w-full">
               <div className="w-full">
                  <ListHotelWithoutMap
                     type="grid"
                     hotelsWithMapData={hotelsWithMapData}
                     searchHotelGeoFetching={searchHotelGeoFetching}
                     searchHotelGeoLoading={searchHotelGeoLoading}
                  />
               </div>
            </TabsContent>
         </Tabs>
      </div>
   );
};

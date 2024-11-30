'use client';

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category } from '@/lib/MarkerCategories';
import { PlaceValues } from '@/lib/Places';
import {
   setTriggerSearch,
   useLazyGetListHotelByGeoSearchEngineQuery,
} from '@/stores/features/stay';
import { IHotelDataMapHotels, IHotelSearchGeoEngineRequest } from '@/stores/features/stay/type';
import { useAppSelector } from '@/stores/hook';
import { formatDateToYearMonthDay } from '@/utilities/datetime';
import { addDays, isAfter, isBefore, isEqual } from 'date-fns';
import { getDistance } from 'geolib';
import { LayoutGrid, LayoutList } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

const ListHotelWithoutMap = dynamic(() =>
   import('./list-hotel').then((mod) => mod.ListHotelWithoutMap),
);
const FilterDrawer = dynamic(() =>
   import('../filters/filter-drawer').then((mod) => mod.FilterDrawer),
);
const ListFilter = dynamic(() => import('../filters/list-filter').then((mod) => mod.ListFilter));

export const WithoutMapContainer = () => {
   // redux
   const globalSearchState = useAppSelector((state) => state.globalSlice.searchGlobal);
   const isSearchGlobal = useAppSelector((state) => state.staySlice.isTriggerGlobal);
   const dispatch = useDispatch();

   // state
   // const [displayType, setDisplayType] = useState<'grid' | 'list'>('list');
   // const [filterCollapse, setFilterCollapse] = useState(false);

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
      let checkin = new Date(globalSearchState.dateRange.startDate);
      let checkout = new Date(globalSearchState.dateRange.endDate);

      // Kiểm tra nếu checkout nhỏ hơn hoặc bằng checkin
      if (isBefore(checkout, checkin) || isEqual(checkout, checkin)) {
         checkout = addDays(checkin, 1); // Tăng checkout thêm 1 ngày
      }

      console.log(globalSearchState.dateRange);
      console.log(checkout);
      console.log(checkout ? checkout : addDays(new Date(), 1));

      const searchParams = {
         checkin: formatDateToYearMonthDay(checkin),
         checkout: formatDateToYearMonthDay(checkout ? checkout : addDays(new Date(), 1)),
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
         <div className="w-full grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-3">
               <div className="block w-full lg:hidden">
                  <div className="mx-auto">
                     <FilterDrawer placeData={placeData} searchGlobal={globalSearchState} />
                  </div>
               </div>
               <div className="hidden lg:block lg:col-span-3">
                  <ListFilter placeData={placeData} searchGlobal={globalSearchState} />
               </div>
            </div>
            <div className="w-full col-span-12 lg:col-span-9">
               <Tabs defaultValue="list" className="w-full overflow-hidden">
                  <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-3 mb-6">
                     <div className="w-full flex flex-col lg:flex-row justify-between items-center">
                        <div className="flex items-center justify-start gap-3">
                           <TabsList className="bg-transparent">
                              <TabsTrigger
                                 value="list"
                                 className="rounded-none rounded-l-lg py-2 data-[state=active]:shadow-none data-[state=active]:border-none text-neutral-400 data-[state=active]:text-black"
                              >
                                 <LayoutList className="w-5 h-5" />
                              </TabsTrigger>
                              <TabsTrigger
                                 value="grid"
                                 className=" rounded-none rounded-r-lg py-2 data-[state=active]:shadow-none data-[state=active]:border-none text-neutral-400 data-[state=active]:text-black"
                              >
                                 <LayoutGrid className="w-5 h-5" />
                              </TabsTrigger>
                           </TabsList>
                           1 - 10 of {hotelsWithMapData?.length || 0} hotels found
                        </div>

                        <div className="flex items-center gap-1">
                           <div className="flex gap-2 items-center mr-2 cursor-pointer hover:underline">
                              Clear Filters
                           </div>
                           <Select>
                              <div className="flex items-center border border-neutral-200 rounded-md px-1">
                                 <div className="text-sm text-neutral-500">Show</div>
                                 <SelectTrigger className="border-none outline-none shadow-none w-fit">
                                    <SelectValue placeholder="10" defaultValue={'10'} />
                                 </SelectTrigger>
                              </div>
                              <SelectContent>
                                 <SelectItem value="10">10</SelectItem>
                                 <SelectItem value="15">15</SelectItem>
                                 <SelectItem value="20">20</SelectItem>
                              </SelectContent>
                           </Select>
                           <Select>
                              <div className="flex items-center border border-neutral-200 rounded-md px-1">
                                 <div className="text-sm text-neutral-500">Sort by:</div>
                                 <SelectTrigger className="border-none outline-none shadow-none w-fit">
                                    <SelectValue placeholder="Name" defaultValue={'name'} />
                                 </SelectTrigger>
                              </div>
                              <SelectContent>
                                 <SelectItem value="name">Name</SelectItem>
                                 <SelectItem value="price">Price</SelectItem>
                                 <SelectItem value="rating">Rating</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                  </div>

                  <Separator className="w-full bg-neutral-200 mb-4" />

                  <TabsContent value="list" className="w-full">
                     <div className="grid grid-cols-12 gap-6 w-full">
                        <div className="col-span-12">
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
         </div>
      </div>
   );
};

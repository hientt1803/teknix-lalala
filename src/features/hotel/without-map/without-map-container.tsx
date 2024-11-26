import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, List } from 'lucide-react';
import dynamic from 'next/dynamic';
import { FilterDrawer } from '../filters/filter-drawer';

const ListHotelWithoutMap = dynamic(() =>
   import('./list-hotel').then((mod) => mod.ListHotelWithoutMap),
);
const ListFilter = dynamic(() => import('../filters/list-filter').then((mod) => mod.ListFilter));

export const WithoutMapContainer = () => {
   return (
      <div className="w-full">
         <Tabs defaultValue="list" className="w-full">
            {/* TOGGLE NAVIGATION */}
            <div className="flex items-center justify-between gap-3 mb-6">
               <div className="block md:hidden">
                  <FilterDrawer />
               </div>

               <div className="hidden md:block" />

               <div className="flex items-center justify-end gap-3">
                  <div className="text-neutral-600 font-[500]">1 - 10 of 18 hotel found</div>
                  <TabsList>
                     <TabsTrigger
                        value="list"
                        className="bg-neutral-300 text-black rounded-none rounded-l-lg data-[state=active]:bg-black data-[state=active]:text-white"
                     >
                        <List className="w-5 h-5" />
                     </TabsTrigger>
                     <TabsTrigger
                        value="grid"
                        className="bg-neutral-300 text-black  rounded-none rounded-r-lg data-[state=active]:bg-black data-[state=active]:text-white"
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
                        <ListFilter />
                     </div>
                  </div>
                  <div className="col-span-12 md:col-span-8 lg:col-span-9">
                     <ListHotelWithoutMap type="list" />
                  </div>
               </div>
            </TabsContent>
            <TabsContent value="grid" className="w-full">
               <div className="w-full">
                  <ListHotelWithoutMap type="grid" />
               </div>
            </TabsContent>
         </Tabs>
      </div>
   );
};

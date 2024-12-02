import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { PlacesType } from '@/lib/Places';
import { ISearchGlobal } from '@/stores/features/global/type';
import dynamic from 'next/dynamic';

const ListFilter = dynamic(() => import('../filters/list-filter').then((mod) => mod.ListFilter));

export const FilterDrawer = ({
   placeData,
   searchGlobal,
}: {
   placeData: PlacesType;
   searchGlobal: ISearchGlobal;
}) => {
   return (
      <Sheet>
         <SheetTrigger asChild className='w-full'>
            <Button variant={'default'} className="rounded-md dark:bg-neutral-100">
               Show Filter
            </Button>
         </SheetTrigger>
         <SheetContent className="w-[400px] sm:w-[540px] overflow-y-scroll">
            <SheetHeader>
               <ListFilter placeData={placeData} searchGlobal={searchGlobal} />
            </SheetHeader>
         </SheetContent>
      </Sheet>
   );
};

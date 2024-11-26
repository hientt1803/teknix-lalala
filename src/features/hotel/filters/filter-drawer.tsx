import { Button } from '@/components/ui/button';
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTrigger
} from '@/components/ui/sheet';
import dynamic from 'next/dynamic';

const ListFilter = dynamic(() => import('../filters/list-filter').then((mod) => mod.ListFilter));

export const FilterDrawer = () => {
   return (
      <Sheet>
         <SheetTrigger>
            <Button variant={'default'} className="rounded-md">
               Show Filter
            </Button>
         </SheetTrigger>
         <SheetContent className="w-[400px] sm:w-[540px] overflow-y-scroll">
            <SheetHeader>
               <ListFilter />
            </SheetHeader>
         </SheetContent>
      </Sheet>
   );
};

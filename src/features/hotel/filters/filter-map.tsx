import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { PlacesType } from '@/lib/Places';
import { cn } from '@/lib/utils';
import { ISearchGlobal } from '@/stores/features/global/type';
import { XIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/common/map/index').then((mod) => mod.default));

export const FilterMap = ({
   placeData,
   searchGlobal,
   buttonClassName,
}: {
   placeData: PlacesType;
   searchGlobal: ISearchGlobal;
   buttonClassName?: string;
}) => {
   return (
      <Dialog>
         <DialogTrigger>
            <Button className={cn(buttonClassName)}>
               <i className="text-lg las la-map"></i>
               <span>Show map</span>
            </Button>
         </DialogTrigger>
         <DialogContent className="min-w-full h-screen">
            <DialogClose className="z-[999] absolute left-5 top-5">
               <Button size="icon" className="rounded-2xl" variant={'ghost'}>
                  <XIcon />
               </Button>
            </DialogClose>
            {false ? (
               <Skeleton className="w-full h-full" />
            ) : (
               <>
                  {!placeData || placeData.length <= 0 ? (
                     <Skeleton className="w-full h-full" />
                  ) : (
                     <Map
                        data={placeData}
                        center={[searchGlobal.location.lat || 0, searchGlobal.location.lon || 0]}
                     />
                  )}
               </>
            )}
         </DialogContent>
      </Dialog>
   );
};

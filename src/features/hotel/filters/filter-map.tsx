import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { PlacesType } from '@/lib/Places';
import { cn } from '@/lib/utils';
import { ISearchGlobal } from '@/stores/features/global/type';
import { MapPin, XIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Map = dynamic(() => import('@/components/common/map/index').then((mod) => mod.default));

export const FilterMap = ({
   placeData,
   searchGlobal,
   buttonClassName,
   showMapPlaceHolder = false,
}: {
   placeData: PlacesType;
   searchGlobal: ISearchGlobal;
   buttonClassName?: string;
   showMapPlaceHolder?: boolean;
}) => {
   return (
      <Dialog>
         <DialogTrigger asChild>
            {showMapPlaceHolder ? (
               <div
                  className={cn(
                     'bg-cover bg-center flex flex-col justify-center rounded-md items-center gap-2 py-10 px-5 w-full',
                  )}
                  style={{
                     background: `url('/assets/images/maps/map-holder.jpg') center center`,
                  }}
               >
                  {/* <Image
                     src="/icons/marker-icon-map.png"
                     alt="Map Marker Icon"
                     width={35}
                     height={30}
                     className="object-contain"
                  /> */}
                  {/* <MapPin className="w-6 h-6 text-neutral-700" /> */}
                  <Button className={cn('bg-neutral-800', buttonClassName)}>
                     <span>Show on map</span>
                  </Button>
               </div>
            ) : (
               <Button className={cn('bg-black', buttonClassName)}>
                  <i className="text-lg las la-map"></i>
                  <span>Show on map</span>
               </Button>
            )}
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

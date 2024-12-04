import { XIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { PlacesType } from '@/lib/Places';
import { cn } from '@/lib/utils';
import { ISearchGlobal } from '@/stores/features/global/type';

const Map = dynamic(() =>
  import('@/components/common/map/index').then(module_ => module_.default),
);

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
              'flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-cover bg-center px-5 py-10',
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
            <Button
              className={cn(
                'bg-neutral-800 dark:bg-neutral-600 dark:text-neutral-200',
                buttonClassName,
              )}
            >
              <span>Show on map</span>
            </Button>
          </div>
        ) : (
          <Button className={cn('bg-black', buttonClassName)}>
            <i className="las la-map text-lg"></i>
            <span>Show on map</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="h-screen min-w-full">
        <DialogClose className="absolute left-5 top-5 z-[999]">
          <Button size="icon" className="rounded-2xl" variant={'ghost'}>
            <XIcon />
          </Button>
        </DialogClose>
        {false ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <>
            {!placeData || placeData.length <= 0 ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <Map
                data={placeData}
                center={[
                  searchGlobal.location.lat || 0,
                  searchGlobal.location.lon || 0,
                ]}
              />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

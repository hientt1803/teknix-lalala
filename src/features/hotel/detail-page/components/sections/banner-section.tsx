import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IHotelReservation } from '@/stores/features/stay/type';
import { Map, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';

const SearchGroup = dynamic(() =>
   import('@/components/common/searchGroup/searchGroup').then((mob) => mob.SearchGroup),
);

export const BannerSection = ({
   data,
   scrollIntoListRoomSection,
}: {
   data?: IHotelReservation;
   scrollIntoListRoomSection: () => void;
}) => {
   return (
      <>
         <div
            className="relative flex justify-center items-center rounded-lg overflow-hidden"
            style={{
               background: "url('/assets/images/checkout/banner-hotel.png') center center",
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               minHeight: '550px',
            }}
         >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-neutral-800 to-neutral-900 opacity-60 z-[1]" />
            <div className="w-full h-full flex justify-between items-start gap-2 z-10 px-10">
               <div className="flex flex-col justify-start items-start gap-5">
                  <div className="bg-neutral-100 w-fit rounded-full px-6 py-2">
                     <span className="flex items-center gap-1 text-sm">
                        {data?.star_rating !== 0
                           ? Array(data?.star_rating)
                                .fill(1)
                                .map((_, index) => <React.Fragment key={index}>⭐</React.Fragment>)
                           : '0 star'}
                     </span>
                  </div>
                  <div className="flex items-center gap-2 text-4xl md:text-6xl font-semibold leading-tight text-white max-w-[56.25rem]">
                     Welcome to {data?.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-neutral-100">
                     <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                           <MapPin className="size-4 text-neutral-300" />
                           <span className="text-neutral-100 font-medium">{data?.address}</span>
                        </li>
                        <li className="flex items-center gap-2 cursor-pointer">
                           <Map className="size-4 text-neutral-300" />
                           <span className="text-neutral-100 font-medium">Show on Map</span>
                        </li>
                        <li>
                           <Button
                              variant="default"
                              className={cn(
                                 'text-sm transition-all duration-300 ease-in-out min-w-44 mt-5 rounded-full font-medium bg-neutral-100 text-black hover:bg-neutral-800 hover:text-neutral-200',
                              )}
                              onClick={scrollIntoListRoomSection}
                           >
                              Book now
                           </Button>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>

         <div className="relative -top-24 mx-0 lg:mx-2">
            <SearchGroup showBorder showTabs />
         </div>
      </>
   );
};

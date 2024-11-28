"use client"

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useGetReviewByStayIdQuery } from '@/stores/features/review';
import { IHotelReservation } from '@/stores/features/stay/type';
import { HeartIcon, MapPin, MessageCircle, UploadIcon } from 'lucide-react';

type Props = {
   data?: IHotelReservation;
   id: string;
   scrollIntoReviewSection: () => void;
};

export const NewHeaderSection = ({ data, id, scrollIntoReviewSection }: Props) => {
   const { data: review } = useGetReviewByStayIdQuery({
      id: id,
   });

   return (
      <div>
         <div className="flex justify-between items-center">
            {/* <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs  text-blue-800 bg-blue-100  relative">
               {data?.hotel_chain ? data.hotel_chain : 'Loading...'}
            </span> */}
            <div
               className={cn(
                  'shadow-2xl border border-neutral-200 text-sm font-medium text-neutral-900 rounded-full py-2 px-3 mb-10',
               )}
            >
               ⭐ {data?.star_rating.toFixed(1) || 0}{' '}
               <span className="text-neutral-500">({review?.reviews?.length || 0} reviews)</span>
            </div>
         </div>
         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-7">
            {data?.name ? data.name : <Skeleton className="w-full h-10" />}
         </h2>
         <div className="flex justify-between items-center flex-wrap">
            <div className="flex justify-start items-center flex-wrap gap-3">
               <div className="flex items-center text-neutral-600 gap-2">
                  <MapPin className="w-4 h-4" />
                  {data?.address}
               </div>
               <div className="flex items-center text-black font-medium underline gap-2 cursor-pointer">
                  Show on map
               </div>
            </div>

            <div className="flow-root mt-4 md:mt-0">
               <div className="flex text-slate-700 dark:text-slate-50 text-sm gap-2">
                  <Button
                     variant="outline"
                     className="py-1.5 px-3 flex items-center gap-0 rounded-full cursor-pointer"
                     onClick={scrollIntoReviewSection}
                  >
                     <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                     <span className="hidden sm:block ml-2.5">Read Review</span>
                  </Button>
                  <Button
                     variant="secondary"
                     className="py-1.5 px-3 flex items-center gap-0 rounded-full cursor-pointer"
                  >
                     <UploadIcon className="w-5 h-5" strokeWidth={1.5} />
                     <span className="hidden sm:block ml-2.5">Share</span>
                  </Button>
                  <Button
                     variant="default"
                     className="py-1.5 px-3 flex items-center gap-0 rounded-full cursor-pointer"
                  >
                     <HeartIcon className="w-5 h-5" strokeWidth={1.5} />
                     <span className="hidden sm:block ml-2.5">Save</span>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

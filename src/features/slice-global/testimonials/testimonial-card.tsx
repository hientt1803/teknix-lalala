import Image from '@/components/common/images/image';
import { Rating } from '@/components/custom/rating/rating';
import React from 'react';

export const TestimonialCard = () => {
   return (
      <div className="p-10 rounded-[1.875rem] shadow-md overflow-hidden border border-neutral-200 dark:border-neutral-700">
         <div className="text-2xl font-medium dark:text-neutral-200">The Best Booking System</div>
         <div className="text-sm mt-3 mb-7 text-neutral-500">
            {` I've been using the hotel booking system for several years now, and it's become my go-to
            platform for planning my trips. The interface is user-friendly, and I appreciate the
            detailed information and real-time availability of hotels.`}
         </div>
         <div className="w-full flex justify-between items-end gap-3">
            <div className="flex items-center gap-2">
               <Image
                  src="/assets/images/testimonials/client1.png"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
               />
               <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Sara Mohamed</div>
                  <div className="text-xs text-neutral-600">Jakatar</div>
               </div>
            </div>
            <Rating rating={4} />
         </div>
      </div>
   );
};

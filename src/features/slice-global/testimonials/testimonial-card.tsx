import React from 'react';

import Image from '@/components/common/images/image';
import { Rating } from '@/components/custom/rating/rating';

export const TestimonialCard = () => {
  return (
    <div className="overflow-hidden rounded-[1.875rem] border border-neutral-200 p-10 shadow-md dark:border-neutral-700">
      <div className="text-2xl font-medium dark:text-neutral-200">
        The Best Booking System
      </div>
      <div className="mb-7 mt-3 text-sm text-neutral-500">
        {` I've been using the hotel booking system for several years now, and it's become my go-to
            platform for planning my trips. The interface is user-friendly, and I appreciate the
            detailed information and real-time availability of hotels.`}
      </div>
      <div className="flex w-full items-end justify-between gap-3">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/testimonials/client1.png"
            alt="User Avatar"
            className="h-12 w-12 rounded-full"
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

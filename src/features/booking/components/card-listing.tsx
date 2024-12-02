'use client';

import CardReview from './card-reviews';
import HistoryListing from './history-listing';

const CardListing = () => {
   return (
      <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
         <div className="flex flex-col p-6 border space-y-8 rounded-3xl">
            <div>
               <h2 className="text-2xl font-semibold">History Booking</h2>
               <span className="block mt-2 text-neutral-500 ">View your reservation history.</span>
            </div>
            <div className="w-14 border-b border-neutral-200" />
            {/* HISRORY */}
            <HistoryListing />
         </div>
         {/* REVIEW */}
         <CardReview />
      </div>
   );
};

export default CardListing;

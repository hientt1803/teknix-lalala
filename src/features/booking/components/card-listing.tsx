'use client';

import CardReview from './card-reviews';
import HistoryListing from './history-listing';

const CardListing = () => {
  return (
    <div className="w-full flex-shrink-0 space-y-8 lg:w-3/5 lg:space-y-10 lg:pl-10 xl:w-2/3">
      <div className="flex flex-col space-y-8 rounded-3xl border p-6">
        <div>
          <h2 className="text-2xl font-semibold">History Booking</h2>
          <span className="mt-2 block text-neutral-500">
            View your reservation history.
          </span>
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

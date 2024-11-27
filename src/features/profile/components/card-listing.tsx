"use client";

import CardReview from "./card-reviews";
import HistoryListing from "./history-listing";

const CardListing = () => {
    return (
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0 mt-12">
            <div className="flex flex-col p-4 border space-y-8 rounded-2xl">
                <div>
                    <h2 className="text-2xl font-semibold">Kevin Francis&apos;s listings</h2>
                    <span className="block mt-2 text-slate-500 ">
                        Kevin Francis&apos;s listings is very rich, 5 star reviews help him to
                        be more branded.
                    </span>
                </div>
                <div className="w-14 border-b border-slate-200" />
                {/* HISRORY */}
                <HistoryListing />
            </div>
            {/* REVIEW */}
            <CardReview />
        </div>
    );
};

export default CardListing;

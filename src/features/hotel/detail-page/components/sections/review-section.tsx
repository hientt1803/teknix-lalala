'use client';

import { ArrowRightIcon, EditIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { Rating } from '@/components/custom/rating/rating';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetReviewByStayIdQuery } from '@/stores/features/review';
import { convertStringToDate, formatDateUTC } from '@/utilities/datetime';

const ReviewSection = ({ id }: { id: string }) => {
  const [allReview, setAllReview] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = useGetReviewByStayIdQuery({
    id: id,
  });

  return (
    <div className="space-y-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      <div className="text-md font-semibold text-neutral-600">
        ({Number(data?.total.value) > 0 ? data?.data?.length : 'No'} Reviews)
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="space-y-5">
        <Rating rating={5} />
        <div className="relative h-16 text-sm">
          <Input
            ref={inputRef}
            placeholder="Share your thoughts..."
            className="focus:border-primary-300 focus:ring-primary-200 block h-16 w-full rounded-3xl border-neutral-200 bg-white px-4 py-3 focus:ring focus:ring-opacity-50 dark:border-neutral-800 dark:bg-neutral-800"
          />
          <Button
            size={'icon'}
            className="absolute right-2 top-1/2 h-12 w-12 -translate-y-1/2 transform rounded-2xl"
          >
            <ArrowRightIcon className="h-5 w-5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
        {data?.data
          .slice(0, allReview ? data?.data.length : 5)
          .map((review, index) => (
            <div key={index} className="flex space-x-4 py-8">
              <div className="pt-0.5">
                <Avatar>
                  <AvatarImage src={'/testimonials/client6.png'} />
                </Avatar>
              </div>
              <div className="flex-grow">
                <div className="flex flex-col items-start justify-start space-y-3">
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold">
                      <span>{review.author}</span>
                    </div>
                    <span className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-300">
                      Reviewed:{' '}
                      {formatDateUTC(convertStringToDate(review.created))}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 md:gap-8 xl:grid-cols-8">
                    {Object.keys(review.detailed)
                      .slice(0, 4)
                      .map((detail, index) => {
                        // Get the item value directly from the detailed object
                        const itemValue =
                          review.detailed[
                            detail as keyof typeof review.detailed
                          ];

                        // Calculate the corresponding rating value (scale itemValue from 0-10 to 0-5)
                        const ratingValue: number =
                          ((Number(itemValue) || 0) / 10) * 5; // Normalize to rating scale (0-5)

                        return (
                          <div className="flex flex-col gap-2" key={index}>
                            <span className="text-xs capitalize text-neutral-500 dark:text-neutral-400">
                              {detail}
                            </span>
                            <Rating size={15} rating={ratingValue} disabled />
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="mt-3 flex flex-col items-start justify-start gap-1">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="15px"
                      className="stroke-green-500 text-green-600"
                    >
                      <path d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12m1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12M5.634 13.5a1.5 1.5 0 0 0-1.414 2 8.25 8.25 0 0 0 15.56 0 1.5 1.5 0 0 0-1.414-2zm0 1.5h12.732a6.75 6.75 0 0 1-12.732 0M16.5 8.625a.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5 1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5m-9 0a.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5 1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5"></path>
                    </svg>
                    <span className="text-neutral-600 dark:text-white">
                      {review.review_plus}
                    </span>
                  </div>

                  {review.review_minus && (
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="15px"
                      >
                        <path d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12m1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12m-5.28 5.667a7.502 7.502 0 0 0-13.444 0 .75.75 0 1 0 1.344.666 6.002 6.002 0 0 1 10.756 0 .75.75 0 0 0 1.344-.666M8.25 9.375a.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5 1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5m7.5 0a.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5 1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5"></path>
                      </svg>
                      <span className="text-neutral-600 dark:text-white">
                        {review.review_minus}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        {!data?.data || data?.data?.length <= 0 ? (
          <>
            <div
              className="flex cursor-pointer items-center justify-center gap-2 text-neutral-500 dark:text-neutral-300"
              onClick={() => inputRef.current && inputRef.current.focus()}
            >
              <EditIcon strokeWidth={1.5} className="h-5 w-5" />
              <div className="text-sm">Be the first to comment on this.</div>
            </div>
          </>
        ) : (
          <>
            <div className="pt-8">
              <Button
                onClick={() => setAllReview(o => !o)}
                className="focus:ring-primary-6000 relative inline-flex h-auto items-center justify-center rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:px-6 sm:text-base"
              >
                {allReview ? 'Hide' : 'View more reviews'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;

{
  /* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {data?.detailed_ratings && (
          <>
            {Object.keys(data.detailed_ratings).map((rate, index) => {
              const ratingValue =
                data.detailed_ratings[
                  rate as keyof typeof data.detailed_ratings
                ]; // Get the rating value for the current key

              return (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">
                      {rate}
                    </span>
                    <span className="text-xs capitalize">
                      {ratingValue === null ? '0' : ratingValue} / 10
                    </span>
                  </div>
                  <Slider
                    value={[ratingValue || 0]} // Pass the value to Slider, default
                    step={0.1}
                    max={10}
                    hidden
                    color={
                      ratingValue
                        ? ratingValue > 9
                          ? 'green.8'
                          : ratingValue > 8
                            ? 'green.6'
                            : ratingValue > 6
                              ? 'green.5'
                              : ratingValue > 3
                                ? 'orange'
                                : 'red' // Less than or equal to 3
                        : 'gray' // Default for null or undefined ratingValue
                    }
                  />
                </div>
              );
            })}
          </>
        )}
      </div>  */
}

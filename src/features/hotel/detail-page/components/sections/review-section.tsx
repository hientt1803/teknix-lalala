'use client';

import { Rating } from '@/components/custom/rating/rating';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useGetReviewByStayIdQuery } from '@/stores/features/review';
import { ArrowRightIcon, EditIcon } from 'lucide-react';

import { useRef, useState } from 'react';

const ReviewSection = ({ id }: { id: string }) => {
   const [allReview, setAllReview] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);
   const { data, isLoading } = useGetReviewByStayIdQuery({
      id: id,
   });

   return (
      <div className="border border-neutral-200 dark:border-neutral-700 p-6 rounded-lg space-y-8">
         <h2 className="text-2xl font-semibold">Reviews</h2>
         <div className="text-md font-semibold text-neutral-600">
            ({data?.reviews && data?.reviews?.length > 0 ? data?.reviews?.length : 'No'} reviews)
         </div>
         <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {data?.detailed_ratings && (
               <>
                  {Object.keys(data.detailed_ratings).map((rate, index) => {
                     const ratingValue =
                        data.detailed_ratings[rate as keyof typeof data.detailed_ratings]; // Get the rating value for the current key

                     return (
                        <div key={index} className="flex flex-col">
                           <div className="flex justify-between items-center">
                              <span className="capitalize font-medium text-sm">{rate}</span>
                              {/* Display the key name */}
                              <span className="capitalize text-xs">
                                 {ratingValue !== null ? ratingValue : '0'} / 10
                              </span>
                              {/* Display the value or 'N/A' */}
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
         </div>

         <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
         <div className="space-y-5">
            <Rating rating={5} />
            <div className="relative h-16 text-sm">
               <Input
                  ref={inputRef}
                  placeholder="Share your thoughts..."
                  className="h-16 block w-full border-neutral-200 dark:border-neutral-800 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-800 rounded-3xl px-4 py-3"
               />
               <Button
                  size={'icon'}
                  className="w-12 h-12 rounded-2xl absolute right-2 top-1/2 transform -translate-y-1/2"
               >
                  <ArrowRightIcon className="w-5 h-5" strokeWidth={1.5} />
               </Button>
            </div>
         </div>
         <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
            {data?.reviews?.slice(0, allReview ? data.reviews.length : 5).map((review, index) => (
               <div key={index} className="flex space-x-4 py-8">
                  <div className="pt-0.5">
                     <Avatar>
                        <AvatarImage src={'/testimonials/client6.png'} />
                     </Avatar>
                  </div>
                  <div className="flex-grow">
                     <div className="flex flex-col justify-start items-start space-y-3">
                        <div className="flex flex-col">
                           <div className="text-sm font-semibold">
                              <span>{review.author}</span>
                           </div>
                           <span className="text-sm text-neutral-500 dark:text-neutral-300 mt-0.5">
                              Reviewed: {review.created}
                           </span>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-8 gap-6 md:gap-8">
                           {Object.keys(review.detailed)
                              .slice(0, 4)
                              .map((detail, index) => {
                                 // Get the item value directly from the detailed object
                                 const itemValue =
                                    review.detailed[detail as keyof typeof review.detailed];

                                 // Calculate the corresponding rating value (scale itemValue from 0-10 to 0-5)
                                 const ratingValue = ((itemValue || 0) / 10) * 5; // Normalize to rating scale (0-5)

                                 return (
                                    <div className="flex flex-col gap-2" key={index}>
                                       <span className="text-xs capitalize text-neutral-500 dark:text-neutral-400">
                                          {detail}
                                       </span>
                                       <Rating size={15} rating={ratingValue} disabled />
                                       {/* <Rating
                                                            color="orange.6"
                                                            fractions={2}
                                                            size={"xs"}
                                                            value={ratingValue} // Use the calculated rating value
                                                        /> */}
                                    </div>
                                 );
                              })}
                        </div>
                     </div>
                     <span className="block mt-3 text-neutral-600 dark:text-white">
                        {review.review_plus}
                     </span>
                  </div>
               </div>
            ))}

            {!data?.reviews || data.reviews.length <= 0 ? (
               <>
                  <div
                     className="flex justify-center items-center gap-2 text-neutral-500 dark:text-neutral-300 cursor-pointer"
                     onClick={() => inputRef.current && inputRef.current.focus()}
                  >
                     <EditIcon strokeWidth={1.5} className="w-5 h-5" />
                     <div className="text-sm">Be the first to comment on this.</div>
                  </div>
               </>
            ) : (
               <>
                  <div className="pt-8">
                     <Button
                        onClick={() => setAllReview((o) => !o)}
                        className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base px-4 py-3 sm:px-6  font-medium border bg-white border-neutral-200 text-neutral-700 hover:text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 "
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

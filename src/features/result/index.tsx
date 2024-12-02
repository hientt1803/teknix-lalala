'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useGetReservationByIdQuery } from '@/stores/features/reservation';
import { format, formatDate } from 'date-fns';
import { useLazyGetStaylDataByIdQuery } from '@/stores/features/stay';
import { countTotalDaysInRange } from '@/utilities/time';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { CalendarIcon, UserIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Bounded from '@/components/common/containers/bounded';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/custom/loaders/app-loading';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { replaceSize } from '@/utilities/string';

const CheckoutResultFeature = () => {
   const searchParam = useSearchParams();
   const [isSuccess, setIsSuccess] = useState(true);
   const [orderId, setOrderId] = useState('');

   useEffect(() => {
      const payDone = searchParam.get('status');
      const orderId = searchParam.get('order');

      setIsSuccess(payDone === 'completed');
      if (orderId) {
         setOrderId(orderId);
      }
   }, [searchParam]);
   const { data, isLoading } = useGetReservationByIdQuery({
      id: orderId,
   });
   const [getHotel, { data: dataHotel, isLoading: isLoadingHotel }] =
      useLazyGetStaylDataByIdQuery();

   useEffect(() => {
      if (data) {
         getHotel({
            id: data.hotel_id,
         });
      }
   }, [data]);
   const totalDay = useMemo(() => {
      let total = countTotalDaysInRange(
         formatDate((data && data.checkin_date) || new Date(), 'yyyy-MM-dd'),
         formatDate((data && data.checkout_date) || new Date(), 'yyyy-MM-dd'),
      );
      return total;
   }, [data]);

   if (isLoading) return <Loading />;

   return (
      <Bounded className="relative py-8">
         <main className="mb-24 lg:mb-32">
            <div className="max-w-4xl mx-auto">
               <div className="max-w-4xl mx-auto">
                  <div className="w-full flex flex-col sm:rounded-3xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
                     <h2 className="text-3xl lg:text-4xl font-semibold">
                        {isSuccess ? ' Congratulation 🎉' : 'Your booking has been canceled! 😣'}
                     </h2>
                     <div className="border-b border-neutral-200 dark:border-neutral-700" />
                     {/* {isSuccess ? ( */}
                     <>
                        <div className="space-y-6">
                           <h3 className="text-2xl font-semibold">Your booking</h3>
                           <div className="flex flex-col sm:flex-row sm:items-center">
                              <div className="flex-shrink-0 w-full sm:w-40">
                                 <div className="aspect-square relative rounded-2xl overflow-hidden">
                                    <img
                                       alt=""
                                       className="absolute inset-0 h-full object-cover"
                                       src={replaceSize(dataHotel?.images[0] || '')}
                                       loading="lazy"
                                    />
                                 </div>
                              </div>
                              <div className="py-5 sm:px-5 space-y-3">
                                 <div>
                                    <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                       Hotel room in {dataHotel?.address}
                                    </span>
                                    <span className="text-base font-medium mt-1 block">
                                       {dataHotel?.name}
                                    </span>
                                 </div>
                                 <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                                    {totalDay} days · {data?.num_guests} guests
                                 </span>
                                 <div className="w-10 border-b border-neutral-200 dark:border-neutral-700" />
                                 <div className="flex justify-start items-start gap-1">
                                    <StarFilledIcon className="w-5 h-5 text-orange-500" />

                                    <span className="font-medium text-sm">
                                       {dataHotel?.star_rating || 0}
                                    </span>
                                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                       (112)
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y divide-solid sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700  overflow-hidden z-10">
                              <div className="text-left flex-1 p-5 flex justify-start items-center space-x-5">
                                 <CalendarIcon
                                    className="text-neutral-300 w-8 h-8"
                                    strokeWidth={1.5}
                                 />
                                 <div className="flex flex-col">
                                    <span className="text-sm text-neutral-400">Date</span>
                                    <span className="mt-1.5 text-lg font-semibold">
                                       {`${format(
                                          data?.checkin_date || new Date(),
                                          'MMM dd',
                                       )} - ${format(data?.checkout_date || new Date(), 'MMM dd')}`}
                                    </span>
                                 </div>
                              </div>

                              <div className="text-left flex-1 p-5 flex justify-start items-center space-x-5">
                                 <UserIcon className="text-neutral-300 w-8 h-8" strokeWidth={1.5} />
                                 <div className="flex flex-col">
                                    <span className="text-sm text-neutral-400">Guests</span>
                                    <span className="mt-1.5 text-lg font-semibold">
                                       {data?.num_guests || 0} Guests
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-6">
                           <h3 className="text-2xl font-semibold">Booking detail</h3>
                           <div className="flex flex-col space-y-4">
                              <div className="flex text-neutral-600 dark:text-neutral-400">
                                 <span className="flex-1">Booking code</span>
                                 <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-50">
                                    #{data?.id?.slice(0, data?.id?.indexOf('-'))}
                                 </span>
                              </div>
                              <div className="flex text-neutral-600 dark:text-neutral-400">
                                 <span className="flex-1">Check in</span>
                                 <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-50">
                                    {format(data?.checkin_date || new Date(), 'PPpp')}
                                 </span>
                              </div>
                              <div className="flex text-neutral-600 dark:text-neutral-400">
                                 <span className="flex-1">Check out</span>
                                 <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-50">
                                    {format(data?.checkout_date || new Date(), 'PPpp')}
                                 </span>
                              </div>
                              <div className="flex text-neutral-600 dark:text-neutral-400">
                                 <span className="flex-1">Total</span>
                                 <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-50">
                                    {formatCurrencyWithCodeAsSuffix(
                                       data?.total_price || 0,
                                       data?.rate_meta_data?.payment_options?.payment_types[0]
                                          ?.show_currency_code,
                                    )}
                                 </span>
                              </div>
                              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                                 <span className="flex-1">Payment method</span>
                                 <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-50">
                                    {/* {data?.payment_method} */}
                                    Stripe
                                 </span>
                              </div>
                           </div>
                        </div>
                     </>
                     {/* //  ) : (
                        // <div className="w-full mx-auto lg:max-w-md relative">
                        //    <div className="flex flex-col gap-5">
                        //       <img src={'/icons/error_style1.svg'} loading="lazy" />
                        //       <h3 className="text-center text-neutral-400">
                        //          Some thing went wrong! <br /> Please contact to admin or try again
                        //       </h3>
                        //    </div>
                        // </div>
                    //  )} */}
                     <div>
                        {isSuccess ? (
                           <div className="flex items-center justify-end gap-5">
                              <Link
                                 href={`/profile`}
                                 className={buttonVariants({
                                    variant: 'outline',
                                    className:
                                       'relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  disabled:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600',
                                 })}
                              >
                                 View details
                              </Link>
                              <Link
                                 href={'/'}
                                 className={buttonVariants({
                                    variant: 'default',
                                    className:
                                       'relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  disabled:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600',
                                 })}
                              >
                                 Explore more stays
                              </Link>
                           </div>
                        ) : (
                           <div className="flex items-center justify-end gap-5">
                              <Button
                                 variant={'outline'}
                                 asChild
                                 className="relative h-auto  inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  disabled:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                              >
                                 <Link href={`/`}>Back to home</Link>
                              </Button>
                              <Button
                                 // color="red.9"
                                 asChild
                                 className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  disabled:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                              >
                                 <Link href={`/`}>Try again</Link>
                              </Button>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </Bounded>
   );
};

export default CheckoutResultFeature;

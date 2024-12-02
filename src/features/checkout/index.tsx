'use client';

import Bounded from '@/components/common/containers/bounded';
import { useScrollIntoView } from '@/hooks/use-scroll';
import { useAppSelector } from '@/stores/hook';
import { useGetStaylDataByIdQuery } from '@/stores/features/stay/stay-api';
import { countTotalDaysInRange } from '@/utilities/time';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import FormInfomation from './components/form';
import Payment from './components/payment';
import { AlarmClock, CircleHelpIcon, Clock, Clock10, MapPin } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import Image from '@/components/common/images/image';
import { convertStringToDate, daysBetweenDateRange, formatDateUTC } from '@/utilities/datetime';
import { getAmenityIcon } from '../hotel/detail-page/components/sections/most-facilities';
import { convertSnakeToTitleCase, replaceSize } from '@/utilities/string';
import { cn } from '@/lib/utils';
import { useGetReviewByStayIdQuery } from '@/stores/features/review';
import GoodToKnow from './components/good-to-know';
import AddYourStay from './components/add-your-stay';

const CheckoutFeatures = () => {
   // next api
   const searchParams = useSearchParams();

   // redux
   const hotel = useAppSelector((state) => state.staySlice.reserveForm);

   // hooks
   const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
      alignment: 'start',
      offset: 100,
   });

   // state
   const [isConfirm, setIsConfirm] = useState(false);

   // API
   const { data } = useGetStaylDataByIdQuery({
      id: hotel.hotel_id,
   });
   const { data: hotelReview } = useGetReviewByStayIdQuery({
      id: hotel.hotel_id,
   });

   // LOGIC
   const totalDay = useMemo(() => {
      let total = countTotalDaysInRange(
         format(hotel.checkin_date || new Date(), 'yyyy-MM-dd'),
         format(hotel.checkout_date || new Date(), 'yyyy-MM-dd'),
      );
      return total;
   }, [hotel]);

   const taxes = useMemo(() => {
      const taxes = hotel.rate?.payment_options.payment_types[0]?.tax_data?.taxes || [];

      const includedTaxes = taxes.filter((tax) => tax.included_by_supplier === true);
      const notIncludedTaxes = taxes.filter((tax) => tax.included_by_supplier === false);

      return {
         includedTaxes,
         notIncludedTaxes,
      };
   }, [hotel]);

   useEffect(() => {
      const reservation = searchParams.get('reservation');
      if (reservation) {
         setIsConfirm(true);
         scrollIntoView();
      }
   }, []);

   useEffect(() => {
      if (isConfirm) {
         scrollIntoView();
      }
   }, [isConfirm]);

   return (
      <>
         <Bounded>
            <Breadcrumb className="mt-10">
               <BreadcrumbList>
                  <BreadcrumbItem>
                     <Link href="/" className="text-neutral-600 text-base">
                        Home
                     </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <Link href="/hotel" className="text-neutral-600 text-base">
                        Hotels
                     </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbPage className="text-base font-medium">Booking</BreadcrumbPage>
                  </BreadcrumbItem>
               </BreadcrumbList>
            </Breadcrumb>

            <div className="w-full h-full mt-5">
               <Image
                  src={replaceSize(data?.images[0]) || '/assets/images/checkout/banner-hotel.png'}
                  alt=""
                  className="w-full h-[12.5rem] object-center rounded-lg"
               />
            </div>

            <h3 className="text-2xl font-medium my-10">Your booking</h3>

            <div className="relative mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
               {/* MAIN SECTION */}
               <div className="w-full lg:w-3/4 xl:w-10/12 lg:pr-10 flex-grow">
                  {/* INFO */}
                  <div className="w-full flex flex-col mb-3 rounded-lg border-0 lg:border border-neutral-200 dark:border-neutral-700 space-y-8 p-0 lg:p-5">
                     <div className="flex justify-between items-center gap-5">
                        {/* LINE */}
                        <div className="hidden lg:block h-full flex-shrink">
                           <div className="h-full flex flex-col justify-between items-center py-5">
                              {/* Top circle */}
                              <div className="w-3 h-3 rounded-full bg-neutral-900 dark:bg-neutral-600"></div>
                              {/* Dotted line */}
                              <div className="min-h-[18.75rem] h-full border-l border-neutral-200 dark:border-neutral-700"></div>
                              {/* Bottom circle */}
                              <div className="w-3 h-3 rounded-full bg-neutral-900 dark:bg-neutral-600"></div>
                           </div>
                        </div>
                        {/* INFO */}
                        <div className="flex-grow">
                           {/* CheckIn */}
                           <div className="flex justify-start items-center gap-6">
                              <div className="flex flex-col items-center justify-center gap-1">
                                 <div className="flex items-center gap-1 dark:text-neutral-100">
                                    <Clock10 className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                       {data?.check_in_time}
                                    </span>
                                 </div>
                                 <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    {formatDateUTC(convertStringToDate(hotel?.checkin_date || ''))}
                                 </span>
                              </div>
                              <div className="flex flex-col items-start justify-start gap-2">
                                 <span className="text-xl font-medium">{data?.name}</span>
                                 <div className="flex items-center">
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                       {data?.address}
                                    </span>
                                 </div>
                              </div>
                           </div>

                           {/* Main content */}
                           <div className="rounded-lg border border-neutral-300 dark:border-neutral-600 p-5 my-4">
                              <div className="flex flex-col">
                                 <div
                                    className={cn(
                                       'border w-fit cursor-pointer hover:shadow-lg border-neutral-200 dark:border-neutral-600 text-sm font-medium rounded-lg py-2 px-3 mb-3',
                                    )}
                                 >
                                    ⭐ {data?.star_rating.toFixed(1) || 0}{' '}
                                    <span className="text-neutral-500 dark:text-neutral-400 font-normal text-sm">
                                       ({hotelReview?.reviews?.length || 0} reviews)
                                    </span>
                                 </div>

                                 <span className="text-2xl font-medium">
                                    {hotel?.rate?.room_name}
                                 </span>

                                 <span className="text-sm mt-1 text-neutral-600 dark:text-neutral-400">
                                    Total length of stay:{' '}
                                    <strong>
                                       {daysBetweenDateRange(
                                          convertStringToDate(hotel?.checkin_date),
                                          convertStringToDate(hotel?.checkout_date),
                                       )}{' '}
                                       nights
                                    </strong>
                                 </span>
                              </div>

                              <div className="my-6">
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {data?.serp_filters?.map((item, index) => (
                                       <div
                                          className="text-sm text-neutral-700 dark:text-neutral-300 flex gap-2 items-center"
                                          key={index}
                                       >
                                          <span>
                                             {getAmenityIcon(
                                                item,
                                                'w-4 h-4 text-neutral-700 dark:text-neutral-300',
                                             )}
                                          </span>
                                          <span>{convertSnakeToTitleCase(item)}</span>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           {/* Checkout */}
                           <div className="flex justify-start items-center gap-6">
                              <div className="flex flex-col items-center justify-center gap-1">
                                 <div className="flex items-center gap-1 dark:text-neutral-100">
                                    <Clock10 className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                       {data?.check_out_time}
                                    </span>
                                 </div>
                                 <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    {formatDateUTC(convertStringToDate(hotel?.checkout_date || ''))}
                                 </span>
                              </div>
                              <div className="flex flex-col items-start justify-start gap-2">
                                 <span className="text-xl font-medium">{data?.name}</span>
                                 <div className="flex items-center">
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                       {data?.address}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* FORM */}
                  <div className="w-full flex flex-col sm:rounded-lg sm:border border-neutral-200 dark:border-neutral-700 px-0 sm:p-5 mb-3">
                     {/* <h2 className="text-3xl lg:text-4xl font-semibold">Confirm and payment</h2> */}
                     {/* <div className="border-b border-neutral-200 dark:border-neutral-700" /> */}

                     {/* DETAIL MOBILE */}
                     <div className="block rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 lg:hidden flex-grow">
                        <div className="bg-neutral-200 px-5 py-5">
                           <h3 className="text-2xl font-semibold">Price & Fee</h3>
                        </div>
                        <div className="flex flex-col space-y-4 px-5 pb-5">
                           <div className="flex justify-between text-neutral-600 dark:text-neutral-50">
                              <span>
                                 {formatCurrencyWithCodeAsSuffix(
                                    hotel.rate?.payment_options.payment_types[0].show_amount || 0,
                                    hotel?.rate?.payment_options?.payment_types[0]
                                       ?.show_currency_code,
                                 )}{' '}
                                 x {totalDay} day
                              </span>
                              <span>
                                 {formatCurrencyWithCodeAsSuffix(
                                    Number.parseFloat(
                                       hotel.rate?.payment_options.payment_types[0].show_amount ||
                                          '0',
                                    ) * totalDay,

                                    hotel?.rate?.payment_options?.payment_types[0]
                                       ?.show_currency_code,
                                 )}
                              </span>
                           </div>
                           <div className="flex justify-between text-neutral-600  dark:text-neutral-50">
                              <span>Service charge</span>
                              <span>
                                 {formatCurrencyWithCodeAsSuffix(
                                    0,
                                    hotel?.rate?.payment_options?.payment_types[0]
                                       ?.show_currency_code,
                                 )}
                              </span>
                           </div>
                           <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                           <div className="flex justify-between font-semibold text-xl">
                              <span>Total</span>
                              <span>
                                 {formatCurrencyWithCodeAsSuffix(
                                    Number.parseFloat(
                                       hotel.rate?.payment_options.payment_types[0].show_amount ||
                                          '0',
                                    ) * totalDay,
                                    hotel?.rate?.payment_options?.payment_types[0]
                                       ?.show_currency_code,
                                 )}
                              </span>
                           </div>
                           <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

                           <div className="flex justify-between items-start space-x-5">
                              <p className="text-sm text-neutral-800  dark:text-neutral-400">
                                 Approximate price in VND: the currency rate might change at the
                                 time of payment.
                              </p>

                              {/* Tooltip wrapper cho CircleHelpIcon */}
                              <TooltipProvider>
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                       <span className="cursor-pointer">
                                          <CircleHelpIcon className="w-4 h-4" />
                                       </span>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" align="center" className="max-w-xs">
                                       <p>
                                          This is an estimate and the final amount might vary
                                          depending on the currency exchange rate at the time of
                                          payment.
                                       </p>
                                    </TooltipContent>
                                 </Tooltip>
                              </TooltipProvider>
                           </div>
                           {taxes.includedTaxes.map((tax, index) => (
                              <div
                                 className="flex justify-between text-neutral-600  dark:text-neutral-50"
                                 key={index}
                              >
                                 <span className="capitalize text-sm">
                                    {tax.name.replaceAll('_', ' ')}
                                 </span>
                                 <span>
                                    {formatCurrencyWithCodeAsSuffix(
                                       Number.parseFloat(tax.amount),
                                       hotel?.rate?.payment_options?.payment_types[0]
                                          ?.show_currency_code,
                                    )}
                                 </span>
                              </div>
                           ))}
                           <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                           <p className="text-base font-medium text-neutral-800  dark:text-neutral-400">
                              To be paid upon arrival
                           </p>
                           {taxes.notIncludedTaxes.map((tax, index) => (
                              <div
                                 className="flex justify-between text-neutral-600  dark:text-neutral-50"
                                 key={index}
                              >
                                 <span className="capitalize text-sm">
                                    {tax.name.replaceAll('_', ' ')}
                                 </span>
                                 <span>
                                    {formatCurrencyWithCodeAsSuffix(
                                       Number.parseFloat(tax.amount),
                                       hotel?.rate?.payment_options?.payment_types[0]
                                          ?.show_currency_code,
                                    )}
                                 </span>
                              </div>
                           ))}
                           <div className="border-b border-neutral-200"></div>
                           <p className="text-sm text-neutral-500  dark:text-neutral-400">
                              Please note You&apos;ll have to pay taxes and fees in the local
                              currency VND.
                           </p>
                        </div>
                     </div>

                     {/* <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 p-5"> */}
                     <div>
                        <h3 className="text-xl font-semibold">Enter your details</h3>
                        <span className="text-sm text-neutral-400 mt-3">
                           Please enter your detail to continune pay
                        </span>
                        <FormInfomation
                           data={data}
                           isConfirm={isConfirm}
                           scrollIntoView={scrollIntoView}
                           setIsConfirm={setIsConfirm}
                        />
                     </div>
                     {/* </div> */}
                     {/* Trigger scroll */}
                  </div>

                  {/* THING TO KNOW */}
                  <div className="w-full flex flex-col sm:rounded-lg sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-5 xl:p-5 mb-3">
                     <GoodToKnow />
                  </div>
                  {/* ADD YOUR STAY */}
                  <div className="w-full flex flex-col sm:rounded-lg sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-5 xl:p-5 mb-3">
                     <AddYourStay />
                  </div>

                  {/* PAYMENT */}
                  {isConfirm && (
                     <div
                        ref={targetRef}
                        className="w-full flex flex-col sm:rounded-lg sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-5 xl:p-5"
                     >
                        <Payment isConfirm={isConfirm} hotel={hotel} />
                     </div>
                  )}
               </div>

               {/* DETAILS */}
               <div className="hidden lg:block flex-shrink">
                  <div className="sticky top-28 space-y-3">
                     <div className="w-full flex flex-col rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8">
                        {/* <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="flex-shrink-0 w-full sm:w-40">
                           <div className="aspect-square relative rounded-2xl overflow-hidden">
                              <Image
                                 alt=""
                                 className="absolute inset-0 h-full object-cover"
                                 src={data?.images[0]?.replace('{size}', '640x400')}
                                 loading="lazy"
                              />
                           </div>
                        </div>
                        <div className="py-5 sm:px-5 space-y-3">
                           <div>
                              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                 {data?.address}
                              </span>
                              <span className="text-base font-medium mt-1 block">{data?.name}</span>
                           </div>
                           <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                              {hotel.rate?.room_name}
                           </span>
                           <div className="w-10 border-b border-neutral-200 dark:border-neutral-700" />
                           <div className="flex items-start justify-start gap-1">
                              <StarFilledIcon className="text-orange-500 w-5 h-5" />

                              <span className="text-sm font-medium">{data?.star_rating}</span>
                              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                 (112)
                              </span>
                           </div>
                        </div>
                     </div> */}
                        {/* <div className="border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y divide-solid sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700  overflow-hidden z-10">
                        <div
                           className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                           
                        >
                           <div className="flex flex-col">
                              <span className="text-sm text-neutral-400">Check in - check out</span>
                              <span className="mt-1.5 text-lg font-semibold">
                                 {format(hotel.checkin_date, 'MMM dd')}
                                 {' - '}
                                 {format(hotel.checkout_date, 'MMM dd')}
                              </span>
                           </div>
                        </div>

                        <div
                           className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                            >
                           <div className="flex flex-col">
                              <span className="text-sm text-neutral-400">Guests</span>
                              <span className="mt-1.5 text-lg font-semibold">
                                 {hotel.num_guests} Guests
                              </span>
                           </div>
                         </div>
                     </div> */}
                        <div className="bg-neutral-200 dark:bg-neutral-800 px-5 py-5">
                           <h3 className="text-2xl font-semibold">Price & Fee</h3>
                        </div>
                        <div className="flex flex-col space-y-4 px-5 pb-5">
                           <div className="flex justify-between text-neutral-600 dark:text-neutral-50">
                              <span>
                                 {formatCurrencyWithCodeAsSuffix(
                                    hotel.rate?.payment_options.payment_types[0].show_amount || 0,
                                    hotel?.rate?.payment_options?.payment_types[0]
                                       ?.show_currency_code,
                                 )}{' '}
                                 x {totalDay} day
                              </span>
                              <span>
                                 {formatCurrencyWithCodeAsSuffix(
                                    Number.parseFloat(
                                       hotel.rate?.payment_options.payment_types[0].show_amount ||
                                          '0',
                                    ) * totalDay,

                                    hotel?.rate?.payment_options?.payment_types[0]
                                       ?.show_currency_code,
                                 )}
                              </span>
                           </div>
                           <div className="flex justify-between text-neutral-600  dark:text-neutral-50">
                              <span>Service charge</span>
                              <span>
                                 {formatCurrencyWithCodeAsSuffix(
                                    0,
                                    hotel?.rate?.payment_options?.payment_types[0]
                                       ?.show_currency_code,
                                 )}
                              </span>
                           </div>
                           <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                           <div className="flex justify-between font-semibold text-xl">
                              <span>Total</span>
                              <span>
                                 {formatCurrencyWithCodeAsSuffix(
                                    Number.parseFloat(
                                       hotel.rate?.payment_options.payment_types[0].show_amount ||
                                          '0',
                                    ) * totalDay,
                                    hotel?.rate?.payment_options?.payment_types[0]
                                       ?.show_currency_code,
                                 )}
                              </span>
                           </div>
                           <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

                           <div className="flex justify-between items-start space-x-5">
                              <p className="text-sm text-neutral-800  dark:text-neutral-400">
                                 Approximate price in VND: the currency rate might change at the
                                 time of payment.
                              </p>

                              {/* Tooltip wrapper cho CircleHelpIcon */}
                              <TooltipProvider>
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                       <span className="cursor-pointer">
                                          <CircleHelpIcon className="w-4 h-4" />
                                       </span>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" align="center" className="max-w-xs">
                                       <p>
                                          This is an estimate and the final amount might vary
                                          depending on the currency exchange rate at the time of
                                          payment.
                                       </p>
                                    </TooltipContent>
                                 </Tooltip>
                              </TooltipProvider>
                           </div>
                           {taxes.includedTaxes.map((tax, index) => (
                              <div
                                 className="flex justify-between text-neutral-600  dark:text-neutral-50"
                                 key={index}
                              >
                                 <span className="capitalize text-sm">
                                    {tax.name.replaceAll('_', ' ')}
                                 </span>
                                 <span>
                                    {formatCurrencyWithCodeAsSuffix(
                                       Number.parseFloat(tax.amount),
                                       tax.currency_code,
                                    )}
                                 </span>
                              </div>
                           ))}
                           <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                           <p className="text-base font-medium text-neutral-800  dark:text-neutral-400">
                              To be paid upon arrival
                           </p>
                           {taxes.notIncludedTaxes.map((tax, index) => (
                              <div
                                 className="flex justify-between text-neutral-600  dark:text-neutral-50"
                                 key={index}
                              >
                                 <span className="capitalize text-sm">
                                    {tax.name.replaceAll('_', ' ')}
                                 </span>
                                 <span>
                                    {formatCurrencyWithCodeAsSuffix(
                                       Number.parseFloat(tax.amount),
                                       tax.currency_code,
                                    )}
                                 </span>
                              </div>
                           ))}
                           <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

                           <p className="text-sm text-neutral-500  dark:text-neutral-400">
                              Please note You&apos;ll have to pay taxes and fees in the local
                              currency VND.
                           </p>
                        </div>
                     </div>
                     <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 p-5 flex flex-col h-full justify-between">
                        <h4 className="text-lg font-semibold">Your payment schedule</h4>
                        <span className="text-sm text-green-600 mt-3">
                           No payment today. You&apos;ll pay when you stay.
                        </span>
                     </div>
                     <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 p-5 flex flex-col h-full justify-between">
                        <h4 className="text-lg font-semibold">How much will it cost to cancel?</h4>
                        <span className="text-sm text-green-600 mt-3">
                           Free cancellation anytime
                        </span>
                     </div>
                     <div className="rounded-lg overflow-hidden border border-rose-700 bg-rose-50 dark:border-neutral-700 p-5 flex flex-col h-full justify-between">
                        <div className="flex items-start gap-4">
                           <div className="flex-shrink">
                              <AlarmClock className="text-rose-700 size-7" />
                           </div>
                           <div className="flex-grow">
                              <h4 className="text-lg text-neutral-900 font-semibold">Lucky find for your dates!</h4>
                              <span className="text-sm text-neutral-600 mt-3">
                                 176 four-star hotels like this are already unavailable on our site
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Bounded>
      </>
   );
};

export default CheckoutFeatures;

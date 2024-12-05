'use client';

import { StarFilledIcon } from '@radix-ui/react-icons';
import { format, formatDate } from 'date-fns';
import { CalendarIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import Bounded from '@/components/common/containers/bounded';
import Image from '@/components/common/images/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { useGetReservationByIdQuery } from '@/stores/features/reservation';
import { useLazyGetStaylDataByIdQuery } from '@/stores/features/stay';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { replaceSize } from '@/utilities/string';
import { countTotalDaysInRange } from '@/utilities/time';
import dynamic from 'next/dynamic';

const GlobalLoading = dynamic(
  () =>
    import('@/components/custom/loading/global').then(
      module_ => module_.default,
    ),
  {
    ssr: false,
  },
);

const CheckoutResultFeature = () => {
  const searchParameter = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(true);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const payDone = searchParameter.get('status');
    const orderId = searchParameter.get('order');

    setIsSuccess(payDone === 'completed');
    if (orderId) {
      setOrderId(orderId);
    }
  }, [searchParameter]);

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

  if (isLoading) return <GlobalLoading open />;

  return (
    <Bounded className="relative py-8">
      <main className="mb-24 lg:mb-32">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-4xl">
            <div className="flex w-full flex-col space-y-8 border-neutral-200 px-0 dark:border-neutral-700 sm:rounded-3xl sm:border sm:p-6 xl:p-8">
              <h2 className="text-3xl font-semibold lg:text-4xl">
                {isSuccess
                  ? ' Congratulation 🎉'
                  : 'Your booking has been canceled! 😣'}
              </h2>
              <div className="border-b border-neutral-200 dark:border-neutral-700" />
              {/* {isSuccess ? ( */}
              <>
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Your booking</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="w-full flex-shrink-0 sm:w-40">
                      <div className="relative aspect-square overflow-hidden rounded-2xl">
                        <Image
                          alt=""
                          className="absolute inset-0 h-full object-cover"
                          src={replaceSize(dataHotel?.images[0] || '')}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="space-y-3 py-5 sm:px-5">
                      <div>
                        <span className="line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">
                          Hotel room in {dataHotel?.address}
                        </span>
                        <span className="mt-1 block text-base font-medium">
                          {dataHotel?.name}
                        </span>
                      </div>
                      <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                        {totalDay} days · {data?.num_guests} guests
                      </span>
                      <div className="w-10 border-b border-neutral-200 dark:border-neutral-700" />
                      <div className="flex items-start justify-start gap-1">
                        <StarFilledIcon className="h-5 w-5 text-orange-500" />

                        <span className="text-sm font-medium">
                          {dataHotel?.star_rating || 0}
                        </span>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                          (112)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="z-10 mt-6 flex flex-col divide-y divide-solid divide-neutral-200 overflow-hidden rounded-3xl border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700 sm:flex-row sm:divide-x sm:divide-y-0">
                    <div className="flex flex-1 items-center justify-start space-x-5 p-5 text-left">
                      <CalendarIcon
                        className="h-8 w-8 text-neutral-300"
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

                    <div className="flex flex-1 items-center justify-start space-x-5 p-5 text-left">
                      <UserIcon
                        className="h-8 w-8 text-neutral-300"
                        strokeWidth={1.5}
                      />
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
                          data?.rate_meta_data?.payment_options
                            ?.payment_types[0]?.show_currency_code,
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
                      href={`/reservation/${data?.id}`}
                      className={buttonVariants({
                        variant: 'outline',
                        className:
                          'focus:ring-primary-600 relative inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-opacity-70 sm:px-6 sm:text-base',
                      })}
                    >
                      View details
                    </Link>
                    <Link
                      href={'/hotel'}
                      className={buttonVariants({
                        variant: 'default',
                        className:
                          'focus:ring-primary-600 relative inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-opacity-70 sm:px-6 sm:text-base',
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
                      className="focus:ring-primary-600 relative inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-opacity-70 sm:px-6 sm:text-base"
                    >
                      <Link href={`/`}>Back to home</Link>
                    </Button>
                    <Button
                      asChild
                      className="focus:ring-primary-600 relative inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-opacity-70 sm:px-6 sm:text-base"
                    >
                      <Link href={`/hotel/${data?.hotel_id}`}>Try again</Link>
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

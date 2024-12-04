'use client';

import { format } from 'date-fns';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { setReserveForm } from '@/stores/features/stay';
import { IReserveForm, Rate, RoomGroup } from '@/stores/features/stay/type';
import { useAppSelector } from '@/stores/hook';
import { formatCurrencyWithCodeAsSuffix } from '@/utilities/currency';
import { countTotalDaysInRange, formatDateMMM } from '@/utilities/datetime';

type Props = {
  data?: { roomGroup: RoomGroup; rates: Rate[] };
  active?: boolean;
  id?: string;
};

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
];

const RoomCard = ({ data, active, id }: Props) => {
  // console.log('🚀 ~ RoomCard ~ data:', data);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.userSlice.access_token);
  const searchGlobal = useAppSelector(state => state.globalSlice.searchGlobal);
  const hotel = useAppSelector(state => state.staySlice.reserveForm);
  const [showMore, setShowMore] = useState(false);

  const totalAdults = useMemo(() => {
    let total = 0;
    searchGlobal.people?.forEach(room => {
      total += room.adults;
    });
    return total;
  }, [searchGlobal.people]);

  const totalChildren = useMemo(() => {
    let total = 0;
    searchGlobal.people?.forEach(room => {
      total += room.children.length;
    });
    return total;
  }, [searchGlobal.people]);

  const totalDay = useMemo(
    () =>
      countTotalDaysInRange(
        searchGlobal.dateRange.startDate,
        searchGlobal.dateRange.endDate,
      ),
    [searchGlobal.dateRange],
  );

  const totalFee = useMemo(() => {
    let total = 0;
    data?.rates?.forEach(room => {
      room?.payment_options?.payment_types[0]?.tax_data.taxes?.map(
        taxe => (total += Number.parseFloat(taxe.amount)),
      );
    });
    return total;
  }, [searchGlobal.people]);

  const items = data?.roomGroup?.images.slice(0, 4).map((item, index) => (
    <CarouselItem key={index}>
      <div>
        <Card className="border p-0 shadow-none">
          <CardContent className="flex aspect-video items-center justify-center p-0">
            <Image
              alt={item}
              src={
                item.replace('{size}', '640x400') ||
                '/assets/images/place-holder-image.svg'
              }
              className="h-full w-full rounded object-cover"
              loading="lazy"
            />
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  ));
  const handleReservation = (rate: Rate) => {
    if (user && user !== '') {
      const dataReserve: IReserveForm = {
        ...hotel,
        hotel_id: id || '',
        room_id: rate.room_name,
        book_hash: rate.book_hash,
        match_hash: rate.match_hash,
        checkin_date: format(
          searchGlobal.dateRange.startDate,
          "yyyy-MM-dd'T'HH:mm:ss",
        ),
        checkout_date: format(
          searchGlobal.dateRange.endDate,
          "yyyy-MM-dd'T'HH:mm:ss",
        ),
        num_guests: totalAdults + totalChildren,
        rate: rate,
      };

      dispatch(setReserveForm(dataReserve));

      router.push('/checkout');
    } else {
      router.push(`/auth?redirect=/stay/${id}`);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-2">
      {data?.roomGroup ? (
        <>
          <Card className="flex flex-col space-y-2 p-3">
            {items && items.length > 0 ? (
              <Carousel className="w-full md:max-w-64">
                <CarouselContent>{items}</CarouselContent>
                <CarouselDots className="absolute inset-x-0 bottom-5" />
              </Carousel>
            ) : (
              <Image
                alt={'placeholder images'}
                src={'/assets/images/hotel/placeholder-card.png'}
                className="h-48 w-fit rounded object-cover"
                loading="lazy"
              />
            )}
            <h3 className="text-xl font-semibold">
              {searchGlobal?.people?.length > 1
                ? `${searchGlobal?.people?.length}x`
                : ''}{' '}
              {data?.roomGroup?.name}
            </h3>
            <div className="w-14 border-b-4 border-orange-500 dark:border-orange-700" />
            <div className="grid grid-cols-1 space-y-2 divide-y">
              {data.rates && data.rates.length > 0 && (
                <>
                  {data.rates
                    .slice(0, showMore ? data.rates.length : 1)
                    .map((rate, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex flex-col justify-between space-y-1 xl:flex-row">
                          <div className="flex-1 space-y-1 xl:p-3">
                            <div className="flex items-center space-x-2">
                              <i className="las la-bed text-xl"></i>
                              {rate.room_data_trans.bedding_type ? (
                                <p className="text-sm capitalize">
                                  {rate.room_data_trans.bedding_type.replaceAll(
                                    '-',
                                    ' ',
                                  )}
                                </p>
                              ) : (
                                <p className="text-sm">Various bed types</p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <i className="las la-utensils text-xl"></i>
                              {rate.meal === 'nomeal' ? (
                                <p className="text-sm">
                                  Meals are not included
                                </p>
                              ) : (
                                <p className="text-sm capitalize">
                                  {rate.meal.replaceAll('-', ' ')}
                                </p>
                              )}
                            </div>
                            {rate.amenities_data.map((amenities, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                {amenities === 'non-smoking' && (
                                  <i className="las la-smoking-ban text-xl"></i>
                                )}
                                {amenities.includes('bed') && (
                                  <i className="las la-bed text-xl"></i>
                                )}
                                {amenities.includes('breakfast') && (
                                  <i className="las la-utensils text-xl"></i>
                                )}
                                {amenities.includes('jacuzzi') && (
                                  <i className="las la-hot-tub text-xl"></i>
                                )}
                                <p className="text-sm capitalize">
                                  {amenities.replaceAll('-', ' ')}
                                </p>
                              </div>
                            ))}
                          </div>
                          {/* <div className="border-b xl:border-b-0 xl:border-r xl:h-16 border-neutral-100 dark:border-neutral-700" /> */}
                          <div className="flex-1 space-y-1 xl:p-3">
                            {rate.payment_options.payment_types[0]
                              .cancellation_penalties
                              .free_cancellation_before ? (
                              <div className="flex items-center space-x-2">
                                <i className="las la-money-check text-xl"></i>
                                <p className="text-sm">
                                  Free cancellation before{' '}
                                  {formatDateMMM(
                                    rate.payment_options.payment_types[0]
                                      .cancellation_penalties
                                      .free_cancellation_before,
                                  )}
                                </p>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <i className="las la-money-check text-xl"></i>
                                <p className="text-sm">Non return</p>
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <i className="las la-wallet text-xl"></i>
                              <p className="text-sm">Pay now</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between xl:flex-row xl:p-3">
                          <span className="flex flex-col text-center text-lg font-semibold text-yellow-700 xl:text-left">
                            <span className="px-1 text-xs font-light text-neutral-500 line-through">
                              {formatCurrencyWithCodeAsSuffix(
                                rate.payment_options.payment_types[0]
                                  ?.show_amount,
                                rate.payment_options.payment_types[0]
                                  ?.show_currency_code,
                              )}
                            </span>
                            <span className="flex items-center justify-center gap-1">
                              {formatCurrencyWithCodeAsSuffix(
                                rate.payment_options.payment_types[0]
                                  ?.show_amount,
                                rate.payment_options.payment_types[0]
                                  ?.show_currency_code,
                              )}
                              <span className="text-xs font-light">
                                for 1 night
                              </span>
                            </span>
                          </span>
                          <Button
                            className="rounded-full bg-yellow-400 py-6 uppercase text-black transition-all duration-200 ease-in-out hover:bg-neutral-800 hover:text-neutral-200 dark:text-white"
                            onClick={() => handleReservation(rate)}
                          >
                            Book Now
                            <MoveRight className="ml-1 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  {data.rates.length > 1 && (
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="mt-2 text-sm text-blue-500 underline"
                    >
                      {showMore
                        ? 'Show Less'
                        : `Show more ${data.rates.length - 1} items`}
                    </button>
                  )}
                </>
              )}
            </div>
          </Card>
        </>
      ) : (
        <>
          <Card className="flex flex-col space-y-2 p-3">
            <img
              alt={'placeholder images'}
              src={'/placeholder-card.png'}
              className="h-48 w-full rounded object-cover"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold">{data?.roomGroup?.name}</h3>
            <h3 className="text-xl font-semibold">{data?.roomGroup?.name}</h3>
            <div className="w-14 border-b-4 border-orange-500 dark:border-orange-700" />
            <div className="grid grid-cols-1 space-y-2 divide-y">
              {data?.rates && data.rates.length > 0 && (
                <>
                  {data.rates
                    .slice(0, showMore ? data.rates.length : 1)
                    .map((rate, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex flex-col justify-between space-y-1 xl:flex-row">
                          <div className="flex-1 space-y-1 xl:p-3">
                            <div className="flex items-center space-x-2">
                              <i className="las la-bed text-xl"></i>
                              {rate.room_data_trans.bedding_type ? (
                                <p className="text-sm capitalize">
                                  {rate.room_data_trans.bedding_type.replaceAll(
                                    '-',
                                    ' ',
                                  )}
                                </p>
                              ) : (
                                <p className="text-sm">Various bed types</p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <i className="las la-utensils text-xl"></i>
                              {rate.meal === 'nomeal' ? (
                                <p className="text-sm">
                                  Meals are not included
                                </p>
                              ) : (
                                <p className="text-sm capitalize">
                                  {rate.meal.replaceAll('-', ' ')}
                                </p>
                              )}
                            </div>
                            {rate.amenities_data.map((amenities, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                {amenities === 'non-smoking' && (
                                  <i className="las la-smoking-ban text-xl"></i>
                                )}
                                {amenities.includes('bed') && (
                                  <i className="las la-bed text-xl"></i>
                                )}
                                {amenities.includes('breakfast') && (
                                  <i className="las la-utensils text-xl"></i>
                                )}
                                {amenities.includes('jacuzzi') && (
                                  <i className="las la-hot-tub text-xl"></i>
                                )}
                                <p className="text-sm capitalize">
                                  {amenities.replaceAll('-', ' ')}
                                </p>
                              </div>
                            ))}
                          </div>
                          {/* <div className="border-b xl:border-b-0 xl:border-r xl:h-16 border-neutral-100 dark:border-neutral-700" /> */}
                          <div className="flex-1 space-y-1 xl:p-3">
                            {rate.payment_options.payment_types[0]
                              .cancellation_penalties
                              .free_cancellation_before ? (
                              <div className="flex items-center space-x-2">
                                <i className="las la-money-check text-xl"></i>
                                <p className="text-sm">
                                  Free cancellation before{' '}
                                  {formatDateMMM(
                                    rate.payment_options.payment_types[0]
                                      .cancellation_penalties
                                      .free_cancellation_before,
                                  )}
                                </p>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <i className="las la-money-check text-xl"></i>
                                <p className="text-sm">Non return</p>
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <i className="las la-wallet text-xl"></i>
                              <p className="text-sm">Pay now</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between xl:flex-row xl:p-3">
                          <span className="flex flex-col text-center text-lg font-semibold text-orange-500 xl:text-left">
                            <span className="px-1 text-xs font-light text-neutral-500 line-through">
                              {formatCurrencyWithCodeAsSuffix(
                                rate.payment_options.payment_types[0]
                                  ?.show_amount,
                                rate.payment_options.payment_types[0]
                                  ?.show_currency_code,
                              )}
                            </span>
                            <span className="flex items-center justify-center gap-1">
                              {formatCurrencyWithCodeAsSuffix(
                                rate.payment_options.payment_types[0]
                                  ?.show_amount,
                                rate.payment_options.payment_types[0]
                                  ?.show_currency_code,
                              )}
                              <span className="text-xs font-light">
                                for 1 night
                              </span>
                            </span>
                          </span>
                          <Button
                            className="rounded-full bg-yellow-400 py-6 uppercase text-black transition-all duration-200 ease-in-out hover:bg-neutral-800 hover:text-neutral-200 dark:text-white"
                            onClick={() => handleReservation(rate)}
                          >
                            Book Now
                            <MoveRight className="ml-1 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  {data.rates.length > 1 && (
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="mt-2 text-sm text-blue-500 underline"
                    >
                      {showMore
                        ? 'Show Less'
                        : `Show more ${data.rates.length - 1} items`}
                    </button>
                  )}
                </>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default RoomCard;

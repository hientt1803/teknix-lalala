import { StarFilledIcon } from '@radix-ui/react-icons';
import { format, formatDate } from 'date-fns';
import {
  BookmarkCheck,
  CircleDollarSign,
  Clock,
  Eye,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MapHotel, Record } from '@/stores/features/reservation';
import { setReserveForm } from '@/stores/features/stay';
import { IReserveForm } from '@/stores/features/stay/type';
import {
  formatCurrency,
  formatCurrencyWithCodeAsSuffix,
} from '@/utilities/currency';

type Props = {
  data: {
    record: Record;
    hotel: MapHotel;
  };
};

const CardHistory = ({ data }: Props) => {
  const { record, hotel } = data;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleContinunePay = (record: Record, hotel: MapHotel) => {
    const dataReserve: IReserveForm = {
      book_hash: record.book_hash,
      match_hash: record.match_hash,
      checkin_date: record.checkin_date,
      checkout_date: record.checkout_date,
      hotel_id: record.hotel_id,
      num_guests: record.num_guests,
      room_id: record.room_id,
      coupon_code: record.coupon_code,
      meta_data: record.meta_data,
      rate: record.rate_meta_data,
    };

    dispatch(setReserveForm(dataReserve));
    router.push(`/checkout?reservation=${record.id}`);
  };
  return (
    <Card className="relative grid cursor-pointer grid-cols-1 overflow-hidden rounded-3xl hover:shadow-xl lg:flex lg:flex-row">
      <div className="absolute right-4 top-4 z-10">
        <div
          className={`rounded-md px-3 py-1 text-xs capitalize ${
            record?.status === 'pending'
              ? 'bg-red-100 text-red-900'
              : record?.status === 'completed'
                ? 'bg-green-100 text-green-900'
                : 'bg-neutral-400 text-neutral-900'
          } `}
        >
          {record.status}
        </div>
      </div>
      <div className="relative w-full flex-shrink-0 lg:w-72">
        <div className="block aspect-square">
          <Image
            src={hotel?.images[0]?.replace('{size}', '640x400')}
            className="h-full w-full object-cover"
            alt="nc-imgs"
          />
        </div>
      </div>
      <div className="flex flex-grow flex-col p-3 sm:p-5">
        <div className="space-y-2">
          <div className="max-w-80 truncate text-sm text-neutral-500">
            <span>{record?.rate_meta_data?.room_name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">{hotel?.name}</span>
            </h2>
          </div>
          <div className="text-sm text-neutral-500">
            <div className="flex w-full flex-col justify-between lg:flex-row">
              <div className="flex">
                <div className="flex flex-shrink-0 flex-col items-center py-2">
                  <span className="block h-4 w-4 rounded-full border border-neutral-400"></span>
                  <span className="my-1 block flex-grow border-l border-dashed border-neutral-400"></span>
                  <span className="block h-4 w-4 rounded-full border border-neutral-400"></span>
                </div>
                <div className="ml-4 space-y-5 text-sm">
                  <div className="flex flex-col space-y-1">
                    <span className="text-neutral-500">
                      {format(record?.checkin_date, 'EEEE, MMMM d · HH:mm')}
                    </span>
                    <span className="font-semibold">Check in</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-neutral-500">
                      {format(record?.checkout_date, 'EEEE, MMMM d · HH:mm')}
                    </span>
                    <span className="font-semibold">Check out</span>
                  </div>
                </div>
              </div>
              <div className="border-r border-dashed border-neutral-300" />
              <div className="block lg:hidden xl:block">
                <div className="item-end flex flex-col space-y-2">
                  <div className="flex items-center space-x-3 text-neutral-500">
                    <i className="las la-user text-xl"></i>
                    <span className="text-sm">{record?.num_guests} guests</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-500">
                    <span className="text-sm">Total:</span>
                    <span className="font-semibold text-neutral-900">
                      {formatCurrency(record?.total_price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 w-14 border-b border-neutral-100" />

        <div className="flex items-end justify-between">
          <div
            className="flex items-center space-x-1 text-sm"
            data-nc-id="StartRating"
          >
            <div className="pb-[2px]">
              <StarFilledIcon color="orange" className="h-5 w-5" />
            </div>
            <span className="font-medium">4.8</span>
            <span className="text-neutral-500">(28)</span>
          </div>
          {data.record?.status === 'pending' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  //    onClick={() => handleContinunePay(record, hotel)}
                  className="rounded-full px-6 py-5"
                >
                  Cancel Order
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete this card?
                  </DialogTitle>
                  <DialogDescription>
                    This booking will be deleted!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-3 rounded-lg bg-neutral-100 p-5">
                  <div className="flex items-center gap-2 text-sm">
                    <BookmarkCheck className="size-5" />
                    Booking
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="size-5" />
                    Status: {data.record.status.toLocaleUpperCase()}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="size-5" />
                    Guests: {data.record.num_guests}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="size-5" />
                    Created: {formatDate(data.record.date_created, 'PPPP')}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CircleDollarSign className="size-5" />
                    Price: {formatCurrency(data.record.total_price)}
                  </div>
                </div>
                <div className="flex items-end justify-end gap-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="px-6 py-5">
                      Close
                    </Button>
                  </DialogClose>
                  <Button className="px-6 py-5" variant="destructive">
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          {data.record?.status !== 'pending' && (
            <Button
              variant={'outline'}
              asChild
              className="rounded-full px-6 py-5"
            >
              <Link href={`/reservation/${data?.record?.id}`}>
                Details Booking
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CardHistory;

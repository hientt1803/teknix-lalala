import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapHotel, Record } from '@/stores/features/reservation';
import { setReserveForm } from '@/stores/features/stay';
import { IReserveForm } from '@/stores/features/stay/type';
import { formatCurrency } from '@/utilities/currency';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

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
      <Card className="grid grid-cols-1 lg:flex lg:flex-row rounded-3xl overflow-hidden  relative  hover:shadow-xl cursor-pointer">
         <div className="absolute right-4 top-4 z-10">
            <div
               className={`
        px-3 py-1 rounded-md text-xs capitalize 
        ${
           record?.status === 'pending'
              ? 'bg-red-100 text-red-900'
              : record?.status === 'completed'
                ? 'bg-green-100 text-green-900'
                : 'bg-slate-400 text-slate-900'
        }
    `}
            >
               {record.status}
            </div>
         </div>
         <div className="relative flex-shrink-0 w-full lg:w-72 ">
            <div className="block aspect-square">
               <Image
                  src={hotel?.images[0]?.replace('{size}', '640x400')}
                  className="object-cover w-full h-full"
                  alt="nc-imgs"
               />
            </div>
         </div>
         <div className="flex-grow p-3 sm:p-5 flex flex-col">
            <div className="space-y-2">
               <div className="text-sm text-slate-500 truncate max-w-80">
                  <span>{record?.rate_meta_data?.room_name}</span>
               </div>
               <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-medium capitalize">
                     <span className="line-clamp-1">{hotel?.name}</span>
                  </h2>
               </div>
               <div className="text-sm text-slate-500">
                  <div className="flex flex-col lg:flex-row justify-between w-full">
                     <div className="flex">
                        <div className="flex-shrink-0 flex flex-col items-center py-2">
                           <span className="block w-4 h-4 rounded-full border border-slate-400"></span>
                           <span className="block flex-grow border-l border-slate-400 border-dashed my-1"></span>
                           <span className="block w-4 h-4 rounded-full border border-slate-400"></span>
                        </div>
                        <div className="ml-4 space-y-5 text-sm">
                           <div className="flex flex-col space-y-1">
                              <span className=" text-slate-500">
                                 {format(record?.checkin_date, 'EEEE, MMMM d · HH:mm')}
                              </span>
                              <span className="font-semibold">Check in</span>
                           </div>
                           <div className="flex flex-col space-y-1">
                              <span className="text-slate-500">
                                 {format(record?.checkout_date, 'EEEE, MMMM d · HH:mm')}
                              </span>
                              <span className="font-semibold">Check out</span>
                           </div>
                        </div>
                     </div>
                     <div className="border-r border-dashed border-slate-300" />
                     <div className="block lg:hidden xl:block">
                        <div className="flex flex-col item-end space-y-2">
                           <div className="flex items-center space-x-3 text-slate-500">
                              <i className="las la-user text-xl"></i>
                              <span className="text-sm">{record?.num_guests} guests</span>
                           </div>
                           <div className="flex items-center space-x-2 text-slate-500">
                              <span className="text-sm">Total:</span>
                              <span className="font-semibold text-slate-900">
                                 {formatCurrency(record?.total_price)}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="w-14 border-b border-slate-100 my-4" />

            <div className="flex justify-between items-end">
               <div className="flex items-center space-x-1 text-sm  " data-nc-id="StartRating">
                  <div className="pb-[2px]">
                     <StarFilledIcon color="orange" className="w-5 h-5" />
                  </div>
                  <span className="font-medium ">4.8</span>
                  <span className="text-slate-500 ">(28)</span>
               </div>
               {data.record?.status === 'pending' && (
                  <Button
                     onClick={() => handleContinunePay(record, hotel)}
                     className="px-6 py-5 rounded-full"
                  >
                     Continue pay
                  </Button>
               )}
               {data.record?.status !== 'pending' && (
                  <Button variant={'outline'} asChild className="px-6 py-5 rounded-full">
                     <Link href={`/reservation/${data?.record?.id}`}>Details Booking</Link>
                  </Button>
               )}
            </div>
         </div>
      </Card>
   );
};

export default CardHistory;

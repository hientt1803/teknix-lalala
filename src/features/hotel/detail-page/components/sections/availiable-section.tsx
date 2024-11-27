import { useAppSelector } from '@/stores';
import { useGetRoomActiveByHotelIdQuery } from '@/stores/features/stay';
import ListRooms from '../list-rooms';
import { Skeleton } from '@/components/ui/skeleton';
import SearchRoomComnponent from '../search-room/search';
import { addDays, formatDate } from 'date-fns';

type Props = {
   id: string;
};
const AvailiableSection = ({ id }: Props) => {
   const searchGlobal = useAppSelector((state) => state.globalSlice.searchGlobal);

   const { data, isLoading, isFetching } = useGetRoomActiveByHotelIdQuery({
      checkin: searchGlobal?.dateRange?.startDate || formatDate(new Date(), 'yyyy-MM-dd'),
      checkout: formatDate(addDays(new Date(), 2), 'yyyy-MM-dd'),
      // checkout:
      //    searchGlobal?.dateRange?.endDate || formatDate(addDays(new Date(), 2), 'yyyy-MM-dd'),
      // checkout: '2024-11-29',
      currency: 'VND',
      language: 'en',
      guests: searchGlobal.people || [
         {
            adults: 1,
            children: [],
         },
      ],
      id: id,
      residency: 'VN',
   });

   return (
      <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-2xl space-y-8">
         <div>
            <h2 className="text-2xl font-semibold">Availability</h2>
            <span className="block mt-2 text-slate-500 ">
               Prices may increase on weekends or holidays
            </span>
         </div>
         <div className="w-14 border-b border-neutral-200"></div>
         <div className="block lg:hidden">
            <SearchRoomComnponent isLoading={isLoading} isFetching={isFetching} />
         </div>
         <div className="w-14 border-b border-neutral-200 block lg:hidden"></div>
         {isLoading || isFetching ? <ListRoomSkeleton /> : <ListRooms data={data} />}
      </div>
   );
};

export default AvailiableSection;

const ListRoomSkeleton = () => {
   return (
      <div className="flex flex-col gap-3">
         <Skeleton className="h-80 rounded-3xl" />
         <Skeleton className="h-80 rounded-3xl" />
         <Skeleton className="h-80 rounded-3xl" />
         <Skeleton className="h-80 rounded-3xl" />
         <Skeleton className="h-80 rounded-3xl" />
      </div>
   );
};

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
      checkout:
         searchGlobal?.dateRange?.endDate || formatDate(addDays(new Date(), 1), 'yyyy-MM-dd'),
      currency: searchGlobal?.currency?.code || 'USD',
      language: searchGlobal?.lang?.cca2 || 'en',
      guests: searchGlobal.people || [
         {
            adults: 1,
            children: [],
         },
      ],
      id: id,
      residency: searchGlobal?.lang?.cca2 || 'en',
   });

   return (
      <div className="border border-neutral-200 dark:border-neutral-700 p-6 rounded-lg space-y-8">
         <div>
            <h2 className="text-2xl font-semibold">Availability</h2>
            <span className="block mt-2 text-neutral-500 ">
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

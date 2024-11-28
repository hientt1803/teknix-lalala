import { IHotelReservation } from '@/stores/features/stay/type';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/common/map').then((mob) => mob.default), {
   loading: () => <div className="text-center">Loading...</div>,
});

const LocationSection = ({ hotelData }: { hotelData: IHotelReservation }) => {
   return (
      <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-2xl space-y-8">
         <div>
            <h2 className="text-2xl font-semibold">Location</h2>
            <span className="block mt-2 text-slate-500 dark:text-slate-300">
               {hotelData?.address}
            </span>
         </div>
         <div className="w-14 border-b border-slate-200 dark:border-slate-700"></div>
         <div className="aspect-video w-full h-[37.5rem] ring-1 relative overflow-hidden rounded-xl z-0">
            {hotelData?.latitude && hotelData.longitude ? (
               <Map
                  center={[hotelData?.latitude, hotelData?.longitude]}
                  data={[]}
                  wrapperClassname="inset-0"
               />
            ) : (
               <h2>Hotel does not provide location</h2>
            )}
         </div>
      </div>
   );
};

export default LocationSection;

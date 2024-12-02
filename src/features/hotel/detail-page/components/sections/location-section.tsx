import { Category } from '@/lib/MarkerCategories';
import { IHotelReservation } from '@/stores/features/stay/type';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Map = dynamic(() => import('@/components/common/map').then((mob) => mob.default), {
   loading: () => <div className="text-center">Loading...</div>,
   ssr: false,
});

const LocationSection = ({ hotelData }: { hotelData: IHotelReservation }) => {
   return (
      <div className="rounded-lg space-y-8 my-10">
         <div>
            <h2 className="text-2xl font-semibold">Location</h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-300">
               {hotelData?.address}
            </span>
         </div>
         {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
         <div className="aspect-video w-full h-[37.5rem] ring-1 relative overflow-hidden rounded-xl z-0">
            {hotelData?.latitude && hotelData.longitude ? (
               <Map
                  center={[hotelData?.latitude, hotelData?.longitude]}
                  data={[]}
                  wrapperClassname="inset-0"
                  hotelPosition={{
                     address: hotelData?.address,
                     category: Category.HOTEL,
                     id: hotelData?.id,
                     image: hotelData?.images,
                     position: [hotelData?.latitude || 0, hotelData?.longitude || 0],
                     price: 0,
                     star: hotelData?.star_rating,
                     title: hotelData?.name,
                  }}
               />
            ) : (
               <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl font-semibold text-center mx-center">
                  <div className="flex flex-col justify-center items-center gap-3">
                     <Image
                        src="/assets/images/maps/map-notfound.png"
                        width={200}
                        height={200}
                        className="w-full h-full"
                        alt="Hotel Location Not Available"
                     />
                     <span>Hotel Location Not Available!</span>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default LocationSection;

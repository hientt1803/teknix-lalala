import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Category } from '@/lib/MarkerCategories';
import { IHotelReservation } from '@/stores/features/stay/type';

const Map = dynamic(
  () => import('@/components/common/map').then(mob => mob.default),
  {
    loading: () => <div className="text-center">Loading...</div>,
    ssr: false,
  },
);

const LocationSection = ({ hotelData }: { hotelData: IHotelReservation }) => {
  return (
    <div className="my-10 space-y-8 rounded-lg">
      <div>
        <h2 className="text-2xl font-semibold">Location</h2>
        <span className="mt-2 block text-neutral-500 dark:text-neutral-300">
          {hotelData?.address}
        </span>
      </div>
      {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
      <div className="relative z-0 aspect-video h-[37.5rem] w-full overflow-hidden rounded-xl ring-1">
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
          <div className="mx-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-2xl font-semibold">
            <div className="flex flex-col items-center justify-center gap-3">
              <Image
                src="/assets/images/maps/map-notfound.png"
                width={200}
                height={200}
                className="h-full w-full"
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

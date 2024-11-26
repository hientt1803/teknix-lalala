import { mockTours } from '@/slices/TourSection/mock';
import HotelCard from '../cards/hotel-card';

export const ListHotel = () => {
   return (
      <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
         {mockTours?.map((property, index) => <HotelCard {...property} key={index} />)}
      </div>
   );
};

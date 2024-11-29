import { Button } from '@/components/ui/button';
import FlightCard from './flight-card';
import { flightsData } from './fligt-data';
import Image from '@/components/common/images/image';

export const FlightListing = () => {
   return (
      <div className="grid grid-cols-1 gap-6">
         <div className="flex w-full justify-between items-center px-5 py-3 bg-teal-100/60 rounded-lg">
            <div className="flex items-center gap-2">
               <div className="relative aspect-square w-10 h-10">
                  <Image src="/assets/images/flight/tag-neww.svg" />
                  <span className="absolute inset-0 text-xs flex items-center justify-center text-white font-bold">
                     New
                  </span>
               </div>
               <span className="text-sm">
                  Get <span className="font-bold text-green-600">12% Off</span> On Your First Flight
               </span>
            </div>
            <Button className="bg-green-500">Login/Signup</Button>
         </div>
         {flightsData.map((flight, index) => (
            <FlightCard {...flight} key={index} />
         ))}
      </div>
   );
};

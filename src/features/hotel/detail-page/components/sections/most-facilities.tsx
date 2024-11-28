import { convertSnakeToTitleCase } from '@/utilities/string';
import { Baby, Car, Cigarette, Dumbbell, ParkingCircle, Utensils, Wifi } from 'lucide-react';
import React from 'react';

type Amenities = {
   [key: string]: React.ReactNode;
};

export const MostFacilities = ({ facilities }: { facilities?: string[] }) => {
   const getAmenityIcon = (key: string): React.ReactNode => {
      // Map each key to a specific Lucide icon
      const icons: Amenities = {
         has_internet: <Wifi className="w-6 h-6 text-gray-700" />,
         has_airport_transfer: <Car className="w-6 h-6 text-gray-700" />,
         has_parking: <ParkingCircle className="w-6 h-6 text-gray-700" />,
         has_kids: <Baby className="w-6 h-6 text-gray-700" />,
         has_fitness: <Dumbbell className="w-6 h-6 text-gray-700" />,
         has_meal: <Utensils className="w-6 h-6 text-gray-700" />,
         has_smoking: <Cigarette className="w-6 h-6 text-gray-700" />,
      };

      return icons[key] || null; // Return null if the key doesn't match any icon
   };

   return (
      <div className="grid grid-cols-2 md:flex justify-center items-center gap-4 flex-wrap my-12">
         {facilities?.map((fac, index) => (
            <div
               className="border border-neutral-200 rounded-lg cursor-pointer hover:shadow-md text-base font-medium shadow-sm px-6 py-4 flex gap-2 items-center"
               key={index}
            >
               <span>{getAmenityIcon(fac)}</span>
               <span>{convertSnakeToTitleCase(fac)}</span>
            </div>
         ))}
      </div>
   );
};

import { cn } from '@/lib/utils';
import { convertSnakeToTitleCase } from '@/utilities/string';
import {
   Accessibility,
   AirVent,
   Baby,
   Cable,
   Car,
   Cigarette,
   CookingPot,
   Dumbbell,
   ParkingCircle,
   PawPrint,
   Utensils,
   Wifi,
} from 'lucide-react';
import React from 'react';

type Amenities = {
   [key: string]: React.ReactNode;
};

export const getAmenityIcon = (key: string, className?: string): React.ReactNode => {
   // Map each key to a specific Lucide icon
   const icons: Amenities = {
      has_internet: <Wifi className={cn('w-6 h-6 text-neutral-600', className)} />,
      has_airport_transfer: <Car className={cn('w-6 h-6 text-neutral-600', className)} />,
      has_parking: <ParkingCircle className={cn('w-6 h-6 text-neutral-600', className)} />,
      has_kids: <Baby className={cn('w-6 h-6 text-neutral-600', className)} />,
      has_fitness: <Dumbbell className={cn('w-6 h-6 text-neutral-600', className)} />,
      has_meal: <Utensils className={cn('w-6 h-6 text-neutral-600', className)} />,
      has_smoking: <Cigarette className={cn('w-6 h-6 text-neutral-600', className)} />,
      has_disabled_support: <Accessibility className={cn('w-6 h-6 text-neutral-600', className)} />,
      air_conditioning: <AirVent className={cn('w-6 h-6 text-neutral-600', className)} />,
      kitchen: <CookingPot className={cn('w-6 h-6 text-neutral-600', className)} />,
      has_pets: <PawPrint className={cn('w-6 h-6 text-neutral-600', className)} />,
      has_ecar_charger: <Cable className={cn('w-6 h-6 text-neutral-600', className)} />,
   };

   return icons[key] || null; // Return null if the key doesn't match any icon
};

export const MostFacilities = ({ facilities }: { facilities?: string[] }) => {
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

import {
  Accessibility,
  AirVent,
  Baby,
  Bath,
  BriefcaseBusiness,
  Cable,
  Car,
  Cigarette,
  CookingPot,
  Dumbbell,
  ParkingCircle,
  PawPrint,
  Utensils,
  Videotape,
  Waves,
  Wifi,
} from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';
import { convertSnakeToTitleCase } from '@/utilities/string';

type Amenities = {
  [key: string]: React.ReactNode;
};

export const getAmenityIcon = (
  key: string,
  className?: string,
): React.ReactNode => {
  // Map each key to a specific Lucide icon
  const icons: Amenities = {
    has_internet: (
      <Wifi className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    has_airport_transfer: (
      <Car className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    has_parking: (
      <ParkingCircle className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    has_kids: <Baby className={cn('h-6 w-6 text-neutral-600', className)} />,
    has_fitness: (
      <Dumbbell className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    has_meal: (
      <Utensils className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    has_smoking: (
      <Cigarette className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    has_disabled_support: (
      <Accessibility className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    air_conditioning: (
      <AirVent className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    kitchen: (
      <CookingPot className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    has_pets: (
      <PawPrint className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    has_ecar_charger: (
      <Cable className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    has_business: (
      <BriefcaseBusiness
        className={cn('h-6 w-6 text-neutral-600', className)}
      />
    ),
    has_spa: (
      <Videotape className={cn('h-6 w-6 text-neutral-600', className)} />
    ),
    has_jacuzzi: <Bath className={cn('h-6 w-6 text-neutral-600', className)} />,
    has_pool: <Waves className={cn('h-6 w-6 text-neutral-600', className)} />,
  };

  return icons[key] || null; // Return null if the key doesn't match any icon
};

export const MostFacilities = ({ facilities }: { facilities?: string[] }) => {
  return (
    <div className="my-12 grid grid-cols-2 flex-wrap items-center justify-center gap-4 md:flex">
      {facilities?.map((fac, index) => (
        <div
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 px-6 py-4 text-base font-medium shadow-sm hover:shadow-md"
          key={index}
        >
          <span>{getAmenityIcon(fac)}</span>
          <span>{convertSnakeToTitleCase(fac)}</span>
        </div>
      ))}
    </div>
  );
};

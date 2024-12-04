'use client';
import { title } from 'node:process';

import { KeyTextField, LinkField, SelectField } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import {
  CalendarIcon,
  CarFrontIcon,
  ChevronDownIcon,
  HotelIcon,
  PlaneTakeoffIcon,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
const categoriesList = [
  {
    link: '/category/car',
    name: 'Car',
    description: 'Discover the world of luxury cars',
    icon: 'car',
  },
  {
    link: '/category/hotel',
    name: 'Hotel',
    description: 'Discover the world of luxury hotels',
    icon: 'stay',
  },
  {
    link: '/category/plane',
    name: 'Flight',
    description: 'Discover the world of luxury flights',
    icon: 'flight',
  },
  {
    link: '/category/calendar',
    name: 'Calendar',
    description: 'Discover the world of luxury events',
    icon: 'tour',
  },
];

interface NavigationType {
  navigation: {
    title: KeyTextField;
    link: LinkField;
    description: KeyTextField;
    icon: SelectField<'flight' | 'hotel' | 'tour' | 'car'>;
  }[];
}
const SwitchType = ({ navigation }: NavigationType) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="group h-10 self-center rounded-md py-2 text-sm font-medium text-opacity-90 hover:text-opacity-100 focus:outline-none sm:h-12 sm:text-base">
        <span className="inline-flex items-center space-x-2">
          Travel
          <ChevronDownIcon className="h-5 w-5 mix-blend-difference" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] overflow-hidden rounded-2xl px-4 py-0 shadow-lg ring-1 ring-black ring-opacity-5 sm:px-0">
        <nav>
          <ul className="relative grid grid-cols-1 gap-7 p-6">
            {navigation?.map(({ title, link, description, icon }) => (
              <PrismicNextLink key={title} field={link} onClick={handleClose}>
                <li className="-m-3 flex items-center rounded-lg p-2 text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-100 sm:h-12 sm:w-12">
                    {icon === 'car' && <CarFrontIcon className="h-7 w-7" />}
                    {icon === 'flight' && (
                      <PlaneTakeoffIcon className="h-7 w-7" />
                    )}
                    {icon === 'hotel' && <HotelIcon className="h-7 w-7" />}
                    {icon === 'tour' && <CalendarIcon className="h-7 w-7" />}
                  </div>
                  <div className="ml-4 space-y-0.5">
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs">{description}</p>
                  </div>
                </li>
              </PrismicNextLink>
            ))}
          </ul>
        </nav>
        <div className="bg-neutral-50 dark:bg-neutral-700">
          <Link
            href="#"
            className="flow-root rounded-md px-7 py-5 text-neutral-800 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:text-neutral-300"
          >
            <span className="flex items-center">
              <span className="text-sm font-medium">Documentation</span>
            </span>
            <span className="block text-sm text-gray-500 dark:text-neutral-400">
              Start integrating products and tools
            </span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SwitchType;

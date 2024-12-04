import { Plus } from 'lucide-react';
import React from 'react';

import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';

import { getAmenityIcon } from './most-facilities';
interface FacilityProps {
  facilities: string[];
}
const FacilitiesSection = ({ facilities }: FacilityProps) => {
  return (
    <div className="grid grid-cols-1 justify-between gap-8 py-5 lg:grid-cols-5 lg:py-16">
      <div className="col-span-2">
        <div className="flex items-center gap-5 rounded-2xl border border-neutral-200 bg-yellow-50 p-4">
          <div className="flex -space-x-4 rtl:space-x-reverse">
            <Image
              className="h-16 w-16 rounded-full border-2 border-white dark:border-neutral-800"
              src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage5/author.png"
              alt=""
            />
            <Image
              className="h-16 w-16 rounded-full border-2 border-white dark:border-neutral-800"
              src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage5/author2.png"
              alt=""
            />
            <Image
              className="h-16 w-16 rounded-full border-2 border-white dark:border-neutral-800"
              src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage5/author3.png"
              alt=""
            />
            <Button className="z-[1] h-16 w-16 rounded-full border-2 border-white bg-yellow-300 text-xs font-medium text-neutral-950 hover:bg-yellow-400 dark:border-neutral-800">
              <Plus className="h-6 w-6" />
            </Button>
          </div>
          <div className="text-sm">
            1684 people used <b>Lalala</b> <br />
            in the last <b>24 hours</b>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="grid grid-cols-4 items-start gap-5">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2"
            >
              {getAmenityIcon(
                facility,
                'size-8 stroke-[1.5] text-neutral-800 dark:text-neutral-400',
              )}
              <span className="text-center text-sm capitalize">
                {facility.replaceAll('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;

import Image from '@/components/common/images/image';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
import { getAmenityIcon } from './most-facilities';
interface FacilityProps {
   facilities: string[];
}
const FacilitiesSection = ({ facilities }: FacilityProps) => {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-5 justify-between gap-8 py-5 lg:py-16">
         <div className="col-span-2">
            <div className="p-4 flex items-center gap-5 bg-yellow-50 border border-slate-200 rounded-2xl">
               <div className="flex -space-x-4 rtl:space-x-reverse">
                  <Image
                     className="w-16 h-16 border-2 border-white rounded-full dark:border-slate-800"
                     src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage5/author.png"
                     alt=""
                  />
                  <Image
                     className="w-16 h-16 border-2 border-white rounded-full dark:border-slate-800"
                     src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage5/author2.png"
                     alt=""
                  />
                  <Image
                     className="w-16 h-16 border-2 border-white rounded-full dark:border-slate-800"
                     src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage5/author3.png"
                     alt=""
                  />
                  <Button className="w-16 h-16 text-xs font-medium bg-yellow-300 border-2 border-white rounded-full hover:bg-yellow-400 text-slate-950 dark:border-slate-800 z-[1]">
                     <Plus className="w-6 h-6" />
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
                  <div key={index} className="flex flex-col gap-2 justify-center items-center">
                     {getAmenityIcon(facility, 'size-8 stroke-[1.5] text-slate-800 dark:text-slate-400')}
                     <span className="capitalize text-sm text-center">
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
